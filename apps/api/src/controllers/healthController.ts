import { getDbState } from "@workspace/database";
import type { Request, Response } from "express";
import successResponse from "../utils/successResponse.js";

export const healthCheck = async (_req: Request, res: Response) => {
  const dbState = getDbState();
  const dbStatus =
    (
      {
        0: "disconnected",
        1: "connected",
        2: "connecting",
        3: "disconnecting",
      } as Record<number, string>
    )[dbState] || "unknown";

  return successResponse({
    res,
    message: "Server is healthy",
    data: {
      uptime: process.uptime(),
      dbState: dbStatus,
      date: new Date(),
    },
  });
};
