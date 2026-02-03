import type { NextFunction, Request, Response } from "express";
declare const catchAsync: (fn: Function) => (req: Request, res: Response, next: NextFunction) => void;
export default catchAsync;
//# sourceMappingURL=catchAsync.d.ts.map