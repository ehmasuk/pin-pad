import type { Request } from "express";
export interface CustomRequest extends Request {
    user?: {
        id: string;
    };
}
export interface ErrorWithStatus extends Error {
    statusCode?: number;
}
//# sourceMappingURL=index.d.ts.map