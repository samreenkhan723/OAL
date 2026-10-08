import React from 'react';

const STATUS_CONFIGS = {
  // Application statuses
  DRAFT: { label: 'Draft', bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-300' },
  SUBMITTED: { label: 'Submitted', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  KYC_REVIEW: { label: 'KYC / Doc Review', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-300' },
  SCORED: { label: 'IQ Scored', bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
  QUALIFIED: { label: 'Qualified Marketplace', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  WORKING_DEAL: { label: 'Working Deal Active', bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  OFFER_RECEIVED: { label: 'Offers Received', bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-300' },
  OFFER_ACCEPTED: { label: 'Offer Accepted', bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-300' },
  PROCESSING: { label: 'In Processing', bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-300' },
  APPROVED: { label: 'Credit Approved', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-300' },
  FUNDING: { label: 'Funding Stage', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-300' },
  FUNDED: { label: 'Fully Funded', bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-400' },
  DECLINED: { label: 'Declined', bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
  NEEDS_INFORMATION: { label: 'Needs Information', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-300' },

  // Document statuses
  REQUIRED: { label: 'Required', bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
  UPLOADED: { label: 'Uploaded', bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200' },
  IN_REVIEW: { label: 'Under Review', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-300' },
  VERIFIED: { label: 'Verified', bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-300' },
  REJECTED: { label: 'Rejected', bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-300' },
  NEEDS_REPLACEMENT: { label: 'Needs Replacement', bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-300' },

  // Offer statuses
  PENDING_BORROWER_REVIEW: { label: 'Pending Review', bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-300' },
  ACCEPTED: { label: 'Accepted', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-300' },
  EXPIRED: { label: 'Expired', bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-300' },

  // Ticket statuses
  OPEN: { label: 'Open', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  IN_PROGRESS: { label: 'In Progress', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  RESOLVED: { label: 'Resolved', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  CLOSED: { label: 'Closed', bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-300' }
};

export const StatusBadge = ({ status, className = '' }) => {
  const config = STATUS_CONFIGS[status] || {
    label: status ? status.replace(/_/g, ' ') : 'Unknown',
    bg: 'bg-slate-100',
    text: 'text-slate-700',
    border: 'border-slate-300'
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border whitespace-nowrap shrink-0 ${config.bg} ${config.text} ${config.border} ${className}`}
    >
      <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-current opacity-70 shrink-0"></span>
      {config.label}
    </span>
  );
};
