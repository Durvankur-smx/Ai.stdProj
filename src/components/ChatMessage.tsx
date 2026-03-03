import React from 'react';
import { cn } from '../lib/utils';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  key?: React.Key;
}

export const ChatMessage = ({ role, content }: ChatMessageProps) => {
  const isAssistant = role === 'assistant';

  return (
    <div className={cn('flex gap-4 p-6 transition-colors', isAssistant ? 'bg-slate-50' : 'bg-white')}>
      <div className={cn(
        'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
        isAssistant ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'
      )}>
        {isAssistant ? <Bot size={18} /> : <User size={18} />}
      </div>
      <div className="flex-1 space-y-2">
        <p className="text-sm font-semibold text-slate-900">
          {isAssistant ? 'Skill Nexus AI' : 'You'}
        </p>
        <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
          {content}
        </div>
      </div>
    </div>
  );
};
