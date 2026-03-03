import { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  BarChart3,
  History
} from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { motion } from 'motion/react';

export const ResumeAnalysisPage = () => {
  const [resumeText, setResumeText] = useState('');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!resumeText.trim() || isLoading) return;
    setIsLoading(true);
    try {
      const result = await geminiService.analyzeResume(resumeText);
      setAnalysis(result || "I couldn't analyze the resume. Please try again.");
    } catch (error) {
      setAnalysis("An error occurred during analysis. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Resume Analysis</h1>
        <p className="text-slate-500">Get instant AI-powered feedback on your resume and improve your chances of getting hired.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <Card title="Upload or Paste Resume" description="Paste your resume text below or upload a file (coming soon).">
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors cursor-pointer bg-slate-50/50 group">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                  <Upload size={24} className="text-indigo-600" />
                </div>
                <p className="text-sm font-bold text-slate-900">Click to upload or drag and drop</p>
                <p className="text-xs text-slate-500 mt-1">PDF, DOCX up to 10MB</p>
              </div>

              <div className="relative">
                <div className="absolute top-3 left-3 text-slate-400">
                  <FileText size={18} />
                </div>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Or paste your resume text here..."
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-h-[300px] resize-none"
                />
              </div>

              <Button 
                onClick={handleAnalyze} 
                className="w-full gap-2" 
                isLoading={isLoading}
                disabled={!resumeText.trim()}
              >
                <Sparkles size={18} /> Analyze Resume
              </Button>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                <BarChart3 size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">ATS Score</p>
                <p className="text-lg font-bold text-slate-900">--</p>
              </div>
            </Card>
            <Card className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                <History size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Analyses</p>
                <p className="text-lg font-bold text-slate-900">12</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {analysis ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card title="Analysis Results" className="h-full">
                <div className="prose prose-slate prose-sm max-w-none">
                  <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                    {analysis}
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-100 flex gap-4">
                  <Button variant="outline" className="flex-1">Download PDF</Button>
                  <Button className="flex-1">Apply Improvements</Button>
                </div>
              </Card>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-300 mb-6 shadow-sm">
                <Sparkles size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">No Analysis Yet</h3>
              <p className="text-sm text-slate-500 max-w-xs">
                Upload or paste your resume and click "Analyze Resume" to get detailed AI feedback.
              </p>
            </div>
          )}

          <Card title="Quick Tips">
            <ul className="space-y-3">
              {[
                'Use action verbs like "Managed", "Developed", "Led".',
                'Quantify your achievements with numbers and percentages.',
                'Tailor your resume for each specific job description.',
                'Keep it clean, professional, and easy to read.'
              ].map((tip, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-600">
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};
