import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Document from "@/lib/models/Document";
import Business from "@/lib/models/Business";
import Assessment from "@/lib/models/Assessment";
import {
  generateAMLCTFProgram,
  generateRiskAssessmentReport,
} from "@/lib/utils/document-templates";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { businessId, assessmentId, documentType } = await req.json();

    if (!businessId || !documentType) {
      return NextResponse.json(
        { error: "Please provide businessId and documentType" },
        { status: 400 }
      );
    }

    await dbConnect();

    const business = await Business.findById(businessId);

    if (!business || business.userId.toString() !== session.user.id) {
      return NextResponse.json(
        { error: "Business not found" },
        { status: 404 }
      );
    }

    let documentData;

    if (documentType === "AML_CTF_PROGRAM") {
      documentData = generateAMLCTFProgram(business);
    } else if (documentType === "RISK_ASSESSMENT") {
      if (!assessmentId) {
        return NextResponse.json(
          { error: "Assessment ID required for risk assessment document" },
          { status: 400 }
        );
      }

      const assessment = await Assessment.findById(assessmentId);

      if (!assessment || assessment.userId.toString() !== session.user.id) {
        return NextResponse.json(
          { error: "Assessment not found" },
          { status: 404 }
        );
      }

      documentData = generateRiskAssessmentReport(business, assessment);
    } else {
      return NextResponse.json(
        { error: "Invalid document type" },
        { status: 400 }
      );
    }

    const document = await Document.create({
      userId: session.user.id,
      businessId,
      assessmentId: assessmentId || undefined,
      documentType,
      documentData,
    });

    return NextResponse.json(
      {
        message: "Document generated successfully",
        document,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Document generation error:", error);
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

    const documents = await Document.find({ userId: session.user.id })
      .populate("businessId")
      .populate("assessmentId")
      .sort({ createdAt: -1 });

    return NextResponse.json({ documents }, { status: 200 });
  } catch (error: any) {
    console.error("Document fetch error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
