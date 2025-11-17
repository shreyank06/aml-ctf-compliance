import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Assessment from "@/lib/models/Assessment";
import { calculateRiskLevel } from "@/lib/utils/risk-questions";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { businessId, answers } = await req.json();

    if (!businessId || !answers || !Array.isArray(answers)) {
      return NextResponse.json(
        { error: "Please provide business ID and answers" },
        { status: 400 }
      );
    }

    // Calculate total score
    const totalScore = answers.reduce((acc, answer) => acc + answer.score, 0);
    const riskLevel = calculateRiskLevel(totalScore);

    await dbConnect();

    const assessment = await Assessment.create({
      userId: session.user.id,
      businessId,
      answers,
      totalScore,
      riskLevel,
    });

    return NextResponse.json(
      {
        message: "Assessment completed successfully",
        assessment,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Assessment creation error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const assessments = await Assessment.find({ userId: session.user.id })
      .populate("businessId")
      .sort({ createdAt: -1 });

    return NextResponse.json({ assessments }, { status: 200 });
  } catch (error: any) {
    console.error("Assessment fetch error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
