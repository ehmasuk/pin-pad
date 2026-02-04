import type { Request, Response } from "express";
import successResponse from "../utils/successResponse.js";

export const healthCheck = (_req: Request, res: Response) => {
  return successResponse({
    res,
    message: "Server is healthy",
    data: {
      uptime: process.uptime(),
      status: "ok",
      date: new Date().toISOString(),
    },
  });
};
