import React from 'react';
import { HelpCircle } from 'lucide-react';

export const VerifyBadge = ({ note = 'Client confirmation pending against original source documents', className = '' }) => {
  return (
    <span
      title={note}
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-amber-500/10 text-amber-700 border border-amber-500/30 cursor-help ${className}`}
    >
      <HelpCircle className="w-3 h-3 text-amber-600 flex-shrink-0" />
      <span>[VERIFY: Pending]</span>
    </span>
  );
};
