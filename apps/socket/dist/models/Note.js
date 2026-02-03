import mongoose from "mongoose";
const { Schema, model, models } = mongoose;
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
}, { timestamps: true });
NoteSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 3 });
const Note = models.Note || model("Note", NoteSchema);
export default Note;
//# sourceMappingURL=Note.js.map