import express, {} from "express";
import { getNoteStatus, lockNote, renameNote, unlockNote, verifyPassword } from "../controllers/noteController.js";
import catchAsync from "../utils/catchAsync.js";
const router = express.Router();
router.get("/:noteName/status", catchAsync(getNoteStatus));
router.post("/:noteName/lock", catchAsync(lockNote));
router.post("/:noteName/unlock", catchAsync(unlockNote));
router.post("/:noteName/verify", catchAsync(verifyPassword));
router.post("/:noteName/rename", catchAsync(renameNote));
export default router;
//# sourceMappingURL=noteRoutes.js.map