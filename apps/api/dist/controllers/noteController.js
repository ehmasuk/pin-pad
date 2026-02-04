import { Note } from "@workspace/db";
import bcrypt from "bcryptjs";
import { z } from "zod";
import newError from "../utils/newError.js";
import successResponse from "../utils/successResponse.js";
const passwordSchema = z.string().min(4, "Password must be at least 4 characters long");
export const lockNote = async (req, res) => {
    const { noteName } = req.params;
    const { password } = req.body;
    if (!noteName) {
        throw newError({ message: "Note name is required", statusCode: 400 });
    }
    const validatedPassword = passwordSchema.parse(password);
    const note = (await Note.findOne({ noteName: noteName }));
    if (!note) {
        throw newError({ message: "Note not found", statusCode: 404 });
    }
    const hashedPassword = await bcrypt.hash(validatedPassword, 10);
    note.password = hashedPassword;
    note.isLocked = true;
    await note.save();
    return successResponse({
        res,
        message: "Note locked successfully",
        data: { isLocked: true },
    });
};
export const unlockNote = async (req, res) => {
    const { noteName } = req.params;
    const { password } = req.body;
    if (!noteName) {
        throw newError({ message: "Note name is required", statusCode: 400 });
    }
    const note = (await Note.findOne({ noteName: noteName }));
    if (!note) {
        throw newError({ message: "Note not found", statusCode: 404 });
    }
    if (!note.isLocked) {
        return successResponse({ res, message: "Note is already unlocked" });
    }
    const isMatch = await bcrypt.compare(password, note.password || "");
    if (!isMatch) {
        throw newError({ message: "Invalid password", statusCode: 401 });
    }
    note.password = null;
    note.isLocked = false;
    await note.save();
    return successResponse({
        res,
        message: "Note unlocked successfully",
        data: { isLocked: false },
    });
};
export const verifyPassword = async (req, res) => {
    const { noteName } = req.params;
    const { password } = req.body;
    if (!noteName) {
        throw newError({ message: "Note name is required", statusCode: 400 });
    }
    const note = (await Note.findOne({ noteName: noteName }));
    if (!note) {
        throw newError({ message: "Note not found", statusCode: 404 });
    }
    if (!note.isLocked) {
        return successResponse({ res, message: "Note is not locked", data: { verified: true } });
    }
    const isMatch = await bcrypt.compare(password, note.password || "");
    if (!isMatch) {
        throw newError({ message: "Invalid password", statusCode: 401 });
    }
    return successResponse({
        res,
        message: "Password verified",
        data: { verified: true },
    });
};
export const getNoteStatus = async (req, res) => {
    const { noteName } = req.params;
    if (!noteName) {
        throw newError({ message: "Note name is required", statusCode: 400 });
    }
    const note = (await Note.findOne({ noteName: noteName }));
    if (!note) {
        return successResponse({
            res,
            message: "Note status",
            data: { isLocked: false, exists: false },
        });
    }
    return successResponse({
        res,
        message: "Note status",
        data: { isLocked: note.isLocked, exists: true },
    });
};
export const renameNote = async (req, res) => {
    const { noteName } = req.params;
    const { newName } = req.body;
    if (!newName || newName.length < 8) {
        throw newError({ message: "New note name must be at least 8 characters long", statusCode: 400 });
    }
    const existingNote = await Note.findOne({ noteName: newName });
    if (existingNote) {
        throw newError({ message: "Note name not available", statusCode: 409 });
    }
    const note = (await Note.findOne({ noteName: noteName }));
    if (!note) {
        throw newError({ message: "Note not found", statusCode: 404 });
    }
    note.noteName = newName;
    await note.save();
    return successResponse({
        res,
        message: "Note renamed successfully",
        data: { newName },
    });
};
//# sourceMappingURL=noteController.js.map