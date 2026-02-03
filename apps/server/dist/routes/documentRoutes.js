import express, {} from "express";
import { getDocumentStatus, lockDocument, renameDocument, unlockDocument, verifyPassword } from "../controllers/documentController.js";
import catchAsync from "../utils/catchAsync.js";
const router = express.Router();
router.get("/:documentName/status", catchAsync(getDocumentStatus));
router.post("/:documentName/lock", catchAsync(lockDocument));
router.post("/:documentName/unlock", catchAsync(unlockDocument));
router.post("/:documentName/verify", catchAsync(verifyPassword));
router.post("/:documentName/rename", catchAsync(renameDocument));
export default router;
//# sourceMappingURL=documentRoutes.js.map