import mongoose, { Schema, model, models } from "mongoose";

export interface IAssessment {
  _id: string;
  userId: mongoose.Types.ObjectId;
  businessId: mongoose.Types.ObjectId;
  answers: {
    questionId: string;
    question: string;
    answer: string;
    score: number;
  }[];
  totalScore: number;
  riskLevel: "Low" | "Medium" | "High" | "Very High";
  completedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AssessmentSchema = new Schema<IAssessment>(
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
    answers: [
      {
        questionId: String,
        question: String,
        answer: String,
        score: Number,
      },
    ],
    totalScore: {
      type: Number,
      required: true,
      default: 0,
    },
    riskLevel: {
      type: String,
      enum: ["Low", "Medium", "High", "Very High"],
      required: true,
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Assessment = models.Assessment || model<IAssessment>("Assessment", AssessmentSchema);

export default Assessment;
