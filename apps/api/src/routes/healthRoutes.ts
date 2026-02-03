import express from "express";
import { healthCheck } from "../controllers/healthController.js";
import catchAsync from "../utils/catchAsync.js";

const router: express.Router = express.Router();

router.get("/", catchAsync(healthCheck));

export default router;
