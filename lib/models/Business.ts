import mongoose, { Schema, model, models } from "mongoose";

export interface IBusiness {
  _id: string;
  userId: mongoose.Types.ObjectId;
  companyName: string;
  abn: string;
  industry: string;
  address: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  numberOfEmployees: number;
  annualRevenue: string;
  documents: {
    fileName: string;
    fileUrl: string;
    fileType: string;
    uploadedAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const BusinessSchema = new Schema<IBusiness>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyName: {
      type: String,
      required: [true, "Please provide company name"],
      trim: true,
    },
    abn: {
      type: String,
      required: [true, "Please provide ABN"],
      trim: true,
    },
    industry: {
      type: String,
      required: [true, "Please provide industry"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Please provide address"],
      trim: true,
    },
    contactPerson: {
      type: String,
      required: [true, "Please provide contact person"],
      trim: true,
    },
    contactEmail: {
      type: String,
      required: [true, "Please provide contact email"],
      lowercase: true,
      trim: true,
    },
    contactPhone: {
      type: String,
      required: [true, "Please provide contact phone"],
      trim: true,
    },
    numberOfEmployees: {
      type: Number,
      required: [true, "Please provide number of employees"],
    },
    annualRevenue: {
      type: String,
      required: [true, "Please provide annual revenue range"],
    },
    documents: [
      {
        fileName: String,
        fileUrl: String,
        fileType: String,
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Business = models.Business || model<IBusiness>("Business", BusinessSchema);

export default Business;
