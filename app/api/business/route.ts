import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Business from "@/lib/models/Business";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();

    const companyName = formData.get("companyName") as string;
    const abn = formData.get("abn") as string;
    const industry = formData.get("industry") as string;
    const address = formData.get("address") as string;
    const contactPerson = formData.get("contactPerson") as string;
    const contactEmail = formData.get("contactEmail") as string;
    const contactPhone = formData.get("contactPhone") as string;
    const numberOfEmployees = parseInt(formData.get("numberOfEmployees") as string);
    const annualRevenue = formData.get("annualRevenue") as string;

    if (!companyName || !abn || !industry || !address || !contactPerson || !contactEmail || !contactPhone || !numberOfEmployees || !annualRevenue) {
      return NextResponse.json(
        { error: "Please provide all required fields" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Handle file uploads
    const documents = [];
    const files = formData.getAll("documents") as File[];

    for (const file of files) {
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const filename = `${Date.now()}-${file.name}`;
        const filepath = join(process.cwd(), "public", "uploads", filename);

        await writeFile(filepath, buffer);

        documents.push({
          fileName: file.name,
          fileUrl: `/uploads/${filename}`,
          fileType: file.type,
        });
      }
    }

    const business = await Business.create({
      userId: session.user.id,
      companyName,
      abn,
      industry,
      address,
      contactPerson,
      contactEmail,
      contactPhone,
      numberOfEmployees,
      annualRevenue,
      documents,
    });

    return NextResponse.json(
      {
        message: "Business information saved successfully",
        business,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Business creation error:", error);
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

    const businesses = await Business.find({ userId: session.user.id }).sort({
      createdAt: -1,
    });

    return NextResponse.json({ businesses }, { status: 200 });
  } catch (error: any) {
    console.error("Business fetch error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
