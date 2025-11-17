import mongoose, { Schema, model, models } from "mongoose";

export interface IDocument {
  _id: string;
  userId: mongoose.Types.ObjectId;
  businessId: mongoose.Types.ObjectId;
  assessmentId?: mongoose.Types.ObjectId;
  documentType: "AML_CTF_PROGRAM" | "RISK_ASSESSMENT";
  documentData: any;
  generatedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const DocumentSchema = new Schema<IDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    businessId: {
      type: Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    assessmentId: {
      type: Schema.Types.ObjectId,
      ref: "Assessment",
    },
    documentType: {
      type: String,
      enum: ["AML_CTF_PROGRAM", "RISK_ASSESSMENT"],
      required: true,
    },
    documentData: {
      type: Schema.Types.Mixed,
      required: true,
    },
    generatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Document = models.Document || model<IDocument>("Document", DocumentSchema);

export default Document;
