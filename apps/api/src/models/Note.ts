import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

export interface INote {
  noteName: string;
  content: Buffer;
  password?: string | null;
  isLocked: boolean;
  updatedAt: Date;
  createdAt: Date;
}

export type NoteDocument = mongoose.HydratedDocument<INote>;

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

NoteSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 3 });

const Note = (models.Note as mongoose.Model<INote>) || model<INote>("Note", NoteSchema);
export default Note;
