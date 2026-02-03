import type { Request, Response } from "express";
export declare const lockNote: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const unlockNote: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const verifyPassword: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getNoteStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const renameNote: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=noteController.d.ts.map