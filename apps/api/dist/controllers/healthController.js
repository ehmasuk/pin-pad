import { getDbState } from "@workspace/database";
import successResponse from "../utils/successResponse.js";
export const healthCheck = async (_req, res) => {
    const dbState = getDbState();
    const dbStatus = {
        0: "disconnected",
        1: "connected",
        2: "connecting",
        3: "disconnecting",
    }[dbState] || "unknown";
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
//# sourceMappingURL=healthController.js.map