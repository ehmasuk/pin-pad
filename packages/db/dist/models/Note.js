import mongoose, { Schema } from "mongoose";
const NoteSchema = new Schema({
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
}, { timestamps: true });
NoteSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 3 });
export const Note = mongoose.models.Note || mongoose.model("Note", NoteSchema);
