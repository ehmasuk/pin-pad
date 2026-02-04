import mongoose, { Schema, type HydratedDocument, type Model } from "mongoose";

export interface INote {
  noteName: string;
  content: Buffer;
  password?: string | null;
  isLocked: boolean;
  updatedAt: Date;
  createdAt: Date;
}

export type NoteDocument = HydratedDocument<INote>;

const NoteSchema = new Schema<INote>(
  {
    noteName: {
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

NoteSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 3 });

export const Note = (mongoose.models.Note as Model<INote>) || mongoose.model<INote>("Note", NoteSchema);
