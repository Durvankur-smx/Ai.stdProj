import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../components/ChatMessage';
import { Button } from '../components/Button';
import { Send, Trash2, Sparkles } from 'lucide-react';
import { geminiService } from '../services/geminiService';

export const ChatPage = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: "Hello! I'm your Skill Nexus AI career coach. How can I help you today? You can ask me about career paths, interview tips, or skills you should learn." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Prepare history for Gemini
      const history = messages.map(m => ({
        role: m.role === 'user' ? 'user' as const : 'model' as const,
        parts: [{ text: m.content }]
      }));

      const response = await geminiService.chat(userMessage, history);
      setMessages(prev => [...prev, { role: 'assistant', content: response || "I'm sorry, I couldn't process that." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I encountered an error. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <Sparkles size={18} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">AI Career Coach</h2>
            <p className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Online
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setMessages([messages[0]])} className="text-slate-400 hover:text-red-600">
          <Trash2 size={16} />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {messages.map((msg, i) => (
          <ChatMessage key={i} role={msg.role} content={msg.content} />
        ))}
        {isLoading && (
          <div className="p-6 bg-slate-50 flex gap-4">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <Sparkles size={18} className="animate-spin" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-200 rounded w-1/4 animate-pulse" />
              <div className="h-4 bg-slate-200 rounded w-3/4 animate-pulse" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask me anything about your career..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none min-h-[52px] max-h-32"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-400 mt-2">
          Skill Nexus AI can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  );
};
