import express from "express";
import { analyzeJobMatch } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/analyze", protect, analyzeJobMatch);

export default router;