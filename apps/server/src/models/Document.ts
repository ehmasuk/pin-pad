import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema(
  {
    documentName: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    content: {
      type: Buffer,
      required: true,
    },

    updatedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    password: {
      type: String,
      required: false,
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

DocumentSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 3 });

export default mongoose.model("Document", DocumentSchema);
