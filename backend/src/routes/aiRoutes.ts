import { Router } from "express";
import { aiController } from "../controllers/aiController";
import { authenticate } from "../middleware/auth";

const router = Router();

// Protect AI routes with authentication
router.use(authenticate);

router.post("/skill-gap", aiController.getSkillGapAnalysis);
router.post("/roadmap", aiController.getRoadmap);
router.post("/resume", aiController.analyzeResume);
router.post("/interview", aiController.getInterviewQuestions);
router.post("/chat", aiController.chat);

export default router;
