import { Request, Response } from "express";
import { geminiService } from "../services/geminiService";

export const aiController = {
  /**
   * POST /api/ai/skill-gap
   */
  async getSkillGapAnalysis(req: Request, res: Response) {
    try {
      const { currentSkills, targetRole } = req.body;
      if (!currentSkills || !targetRole) {
        return res.status(400).json({ message: "currentSkills and targetRole are required" });
      }

      const analysis = await geminiService.generateSkillGapAnalysis(currentSkills, targetRole);
      res.json(analysis);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  /**
   * POST /api/ai/roadmap
   */
  async getRoadmap(req: Request, res: Response) {
    try {
      const { targetRole, durationWeeks } = req.body;
      if (!targetRole) {
        return res.status(400).json({ message: "targetRole is required" });
      }

      const roadmap = await geminiService.generateRoadmap(targetRole, durationWeeks);
      res.json(roadmap);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  /**
   * POST /api/ai/resume
   */
  async analyzeResume(req: Request, res: Response) {
    try {
      const { resumeText, targetJobDescription } = req.body;
      if (!resumeText) {
        return res.status(400).json({ message: "resumeText is required" });
      }

      const analysis = await geminiService.analyzeResume(resumeText, targetJobDescription);
      res.json(analysis);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  /**
   * POST /api/ai/interview
   */
  async getInterviewQuestions(req: Request, res: Response) {
    try {
      const { role, level } = req.body;
      if (!role) {
        return res.status(400).json({ message: "role is required" });
      }

      const questions = await geminiService.generateInterviewQuestions(role, level);
      res.json(questions);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  /**
   * POST /api/ai/chat
   */
  async chat(req: Request, res: Response) {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ message: "message is required" });
      }

      const response = await geminiService.chatWithAI(message, history || []);
      res.json({ response });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
};
