import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/User";
import nodemailer from "nodemailer";

// Request password reset
export async function POST(req: NextRequest) {
  try {
    const { email, token, newPassword } = await req.json();

    await dbConnect();

    // If token and newPassword are provided, reset the password
    if (token && newPassword) {
      const user = await User.findOne({
        resetToken: token,
        resetTokenExpiry: { $gt: Date.now() },
      });

      if (!user) {
        return NextResponse.json(
          { error: "Invalid or expired reset token" },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(newPassword, 12);

      user.password = hashedPassword;
      user.resetToken = undefined;
      user.resetTokenExpiry = undefined;
      await user.save();

      return NextResponse.json(
        { message: "Password reset successfully" },
        { status: 200 }
      );
    }

    // Otherwise, send reset email
    if (!email) {
      return NextResponse.json(
        { error: "Please provide email" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      // Don't reveal if user exists
      return NextResponse.json(
        { message: "If an account exists, a reset link has been sent" },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    // Send email (configure your SMTP settings)
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;

    // Note: Configure nodemailer with your SMTP settings
    // For production, use a service like SendGrid, AWS SES, etc.
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || "noreply@amlctf.com",
        to: user.email,
        subject: "Password Reset Request",
        html: `
          <h1>Password Reset Request</h1>
          <p>You requested a password reset. Click the link below to reset your password:</p>
          <a href="${resetUrl}">${resetUrl}</a>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, please ignore this email.</p>
        `,
      });
    } catch (emailError) {
      console.error("Email error:", emailError);
      // Continue anyway - don't reveal email sending failed
    }

    return NextResponse.json(
      { message: "If an account exists, a reset link has been sent" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
