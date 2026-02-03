import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import { z } from "zod";
import Document from "../models/Document.js";
import newError from "../utils/newError.js";
import successResponse from "../utils/successResponse.js";

const passwordSchema = z.string().min(4, "Password must be at least 4 characters long");

export const lockDocument = async (req: Request, res: Response) => {
  const { documentName } = req.params;
  const { password } = req.body;

  if (!documentName) {
    throw newError({ message: "Document name is required", statusCode: 400 });
  }

  const validatedPassword = passwordSchema.parse(password);

  const document = await Document.findOne({ documentName });

  if (!document) {
    throw newError({ message: "Document not found", statusCode: 404 });
  }

  const hashedPassword = await bcrypt.hash(validatedPassword, 10);

  document.password = hashedPassword;
  document.isLocked = true;
  await document.save();

  return successResponse({
    res,
    message: "Document locked successfully",
    data: { isLocked: true },
  });
};

export const unlockDocument = async (req: Request, res: Response) => {
  const { documentName } = req.params;
  const { password } = req.body;

  if (!documentName) {
    throw newError({ message: "Document name is required", statusCode: 400 });
  }

  const document = await Document.findOne({ documentName });

  if (!document) {
    throw newError({ message: "Document not found", statusCode: 404 });
  }

  if (!document.isLocked) {
    return successResponse({ res, message: "Document is already unlocked" });
  }

  const isMatch = await bcrypt.compare(password, document.password || "");

  if (!isMatch) {
    throw newError({ message: "Invalid password", statusCode: 401 });
  }

  document.password = null;
  document.isLocked = false;
  await document.save();

  return successResponse({
    res,
    message: "Document unlocked successfully",
    data: { isLocked: false },
  });
};

export const verifyPassword = async (req: Request, res: Response) => {
  const { documentName } = req.params;
  const { password } = req.body;

  if (!documentName) {
    throw newError({ message: "Document name is required", statusCode: 400 });
  }

  const document = await Document.findOne({ documentName });

  if (!document) {
    throw newError({ message: "Document not found", statusCode: 404 });
  }

  if (!document.isLocked) {
    return successResponse({ res, message: "Document is not locked", data: { verified: true } });
  }

  const isMatch = await bcrypt.compare(password, document.password || "");

  if (!isMatch) {
    throw newError({ message: "Invalid password", statusCode: 401 });
  }

  return successResponse({
    res,
    message: "Password verified",
    data: { verified: true },
  });
};

export const getDocumentStatus = async (req: Request, res: Response) => {
  const { documentName } = req.params;

  if (!documentName) {
    throw newError({ message: "Document name is required", statusCode: 400 });
  }

  const document = await Document.findOne({ documentName });

  if (!document) {
    return successResponse({
      res,
      message: "Document status",
      data: { isLocked: false, exists: false },
    });
  }

  return successResponse({
    res,
    message: "Document status",
    data: { isLocked: document.isLocked, exists: true },
  });
};

export const renameDocument = async (req: Request, res: Response) => {
  const { documentName } = req.params;
  const { newName } = req.body;

  if (!newName || newName.length < 8) {
    throw newError({ message: "New document name must be at least 8 characters long", statusCode: 400 });
  }

  const existingDocument = await Document.findOne({ documentName: newName });
  if (existingDocument) {
    throw newError({ message: "Document name not available", statusCode: 409 });
  }

  const document = await Document.findOne({ documentName });
  if (!document) {
    throw newError({ message: "Document not found", statusCode: 404 });
  }

  document.documentName = newName;
  await document.save();

  return successResponse({
    res,
    message: "Document renamed successfully",
    data: { newName },
  });
};
