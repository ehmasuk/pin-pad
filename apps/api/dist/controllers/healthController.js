import successResponse from "../utils/successResponse.js";
export const healthCheck = (_req, res) => {
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
//# sourceMappingURL=healthController.js.map