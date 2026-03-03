import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("GEMINI_API_KEY is not set in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export const geminiService = {
  /**
   * Generates a skill gap analysis based on current skills and target role.
   */
  async generateSkillGapAnalysis(currentSkills: string[], targetRole: string) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze the skill gap for a ${targetRole} role. Current skills: ${currentSkills.join(", ")}.`,
        config: {
          systemInstruction: "You are a career expert. Compare the user's current skills with the requirements of the target role. Identify missing skills, recommend specific courses or topics, and provide an estimated timeline to bridge the gap. Return ONLY JSON.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              missingSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
              recommendedCourses: { type: Type.ARRAY, items: { type: Type.STRING } },
              estimatedTimeline: { type: Type.STRING },
              summary: { type: Type.STRING }
            },
            required: ["missingSkills", "recommendedCourses", "estimatedTimeline", "summary"]
          }
        }
      });
      return JSON.parse(response.text || "{}");
    } catch (error) {
      console.error("Gemini Skill Gap Error:", error);
      throw new Error("Failed to generate skill gap analysis");
    }
  },

  /**
   * Generates a personalized learning roadmap.
   */
  async generateRoadmap(targetRole: string, durationWeeks: number = 12) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Create a ${durationWeeks}-week roadmap to become a ${targetRole}.`,
        config: {
          systemInstruction: "You are a curriculum designer. Create a week-by-week learning roadmap. For each week, specify the core topic, key learning objectives, and a small project or exercise. Return ONLY JSON.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              role: { type: Type.STRING },
              weeks: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    week: { type: Type.INTEGER },
                    topic: { type: Type.STRING },
                    objectives: { type: Type.ARRAY, items: { type: Type.STRING } },
                    project: { type: Type.STRING }
                  },
                  required: ["week", "topic", "objectives", "project"]
                }
              }
            },
            required: ["role", "weeks"]
          }
        }
      });
      return JSON.parse(response.text || "{}");
    } catch (error) {
      console.error("Gemini Roadmap Error:", error);
      throw new Error("Failed to generate learning roadmap");
    }
  },

  /**
   * Analyzes a resume against a job description or general industry standards.
   */
  async analyzeResume(resumeText: string, targetJobDescription?: string) {
    try {
      const prompt = targetJobDescription 
        ? `Analyze this resume against the following job description: ${targetJobDescription}. Resume: ${resumeText}`
        : `Analyze this resume for general industry standards. Resume: ${resumeText}`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          systemInstruction: "You are an expert HR manager. Provide a detailed analysis of the resume. Score it out of 100 for ATS compatibility, identify key strengths, list areas for improvement, and suggest specific keywords to add. Return ONLY JSON.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              atsScore: { type: Type.INTEGER },
              strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
              improvements: { type: Type.ARRAY, items: { type: Type.STRING } },
              suggestedKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
              feedback: { type: Type.STRING }
            },
            required: ["atsScore", "strengths", "improvements", "suggestedKeywords", "feedback"]
          }
        }
      });
      return JSON.parse(response.text || "{}");
    } catch (error) {
      console.error("Gemini Resume Analysis Error:", error);
      throw new Error("Failed to analyze resume");
    }
  },

  /**
   * Generates interview questions for a specific role and level.
   */
  async generateInterviewQuestions(role: string, level: string = "Junior") {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate interview questions for a ${level} ${role} position.`,
        config: {
          systemInstruction: "You are a technical interviewer. Generate a mix of behavioral and technical questions. For each question, provide a brief 'ideal answer' guideline. Return ONLY JSON.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                type: { type: Type.STRING, description: "Technical or Behavioral" },
                idealAnswer: { type: Type.STRING }
              },
              required: ["question", "type", "idealAnswer"]
            }
          }
        }
      });
      return JSON.parse(response.text || "[]");
    } catch (error) {
      console.error("Gemini Interview Questions Error:", error);
      throw new Error("Failed to generate interview questions");
    }
  },

  /**
   * AI Career Chat Assistant with context.
   */
  async chatWithAI(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) {
    try {
      // Keep only last 5 messages for context as requested
      const contextHistory = history.slice(-5);

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...contextHistory, { role: 'user', parts: [{ text: message }] }],
        config: {
          systemInstruction: "You are Skill Nexus AI, a professional career coach. Provide helpful, encouraging, and concise advice. If the user asks about skills, roadmaps, or resumes, guide them towards using the specific tools on our platform. Keep responses friendly and professional.",
        }
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Chat Error:", error);
      throw new Error("Failed to process chat message");
    }
  }
};
