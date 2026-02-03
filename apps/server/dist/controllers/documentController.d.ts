import type { Request, Response } from "express";
export declare const lockDocument: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const unlockDocument: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const verifyPassword: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getDocumentStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const renameDocument: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=documentController.d.ts.map