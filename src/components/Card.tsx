import React from 'react';
import { cn } from '../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  key?: React.Key;
}

export const Card = ({ children, className, title, description }: CardProps) => {
  return (
    <div className={cn('bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden', className)}>
      {(title || description) && (
        <div className="px-6 py-4 border-bottom border-slate-50">
          {title && <h3 className="text-lg font-semibold text-slate-900">{title}</h3>}
          {description && <p className="text-sm text-slate-500">{description}</p>}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};
