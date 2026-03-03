import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const geminiService = {
  async chat(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) {
    try {
      const model = ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [...history, { role: 'user', parts: [{ text: message }] }],
        config: {
          systemInstruction: "You are Skill Nexus AI, a professional career coach and skill development expert. Your goal is to help students and young professionals navigate their career paths, suggest skills to learn, provide interview tips, and analyze career trends. Be encouraging, professional, and practical.",
        }
      });
      const response = await model;
      return response.text;
    } catch (error) {
      console.error("Gemini Chat Error:", error);
      throw error;
    }
  },

  async analyzeResume(resumeText: string) {
    try {
      const model = ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [{ role: 'user', parts: [{ text: `Analyze this resume and provide feedback on: 1. Overall impression, 2. Key strengths, 3. Areas for improvement, 4. Suggested skills to add, 5. ATS compatibility. Resume Text: ${resumeText}` }] }],
        config: {
          systemInstruction: "You are an expert HR manager and resume reviewer. Provide constructive, detailed, and professional feedback.",
        }
      });
      const response = await model;
      return response.text;
    } catch (error) {
      console.error("Gemini Resume Analysis Error:", error);
      throw error;
    }
  }
};
