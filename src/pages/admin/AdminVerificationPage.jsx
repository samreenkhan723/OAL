import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle, XCircle, AlertCircle, FileText, ShieldCheck, Check } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { VerifyBadge } from '../../components/common/VerifyBadge';

export const AdminVerificationPage = () => {
  const { documents, updateDocumentStatus } = useApp();
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [actionNotes, setActionNotes] = useState('');

  const handleDecision = (docId, newStatus) => {
    updateDocumentStatus(docId, newStatus, actionNotes || 'Verified compliance with commercial underwriting standards.');
    setSelectedDoc(null);
    setActionNotes('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
              KYC & Document Verification Center
            </h1>
            <VerifyBadge note="Client confirmation pending for mandatory third-party KYC automation providers and retention periods" />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Review submitted bank statements, corporate tax filings, and licenses before releasing leads to the marketplace.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>Verification Queue ({documents.length} Files)</span>
          <span className="text-amber-700 font-bold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            Compliance Active
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {documents.map((doc) => {
            const isVerified = doc.status === 'VERIFIED';
            const isPending = doc.status === 'IN_REVIEW' || doc.status === 'UPLOADED';

            return (
              <div key={doc.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">{doc.id}</span>
                    <StatusBadge status={doc.status} />
                    <span className="text-xs text-slate-400">Target: {doc.applicationId}</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900">{doc.title}</h3>
                  <div className="text-xs text-slate-500">
                    File: <span className="font-mono text-slate-600">{doc.fileName}</span> • {doc.fileSize} • Category: {doc.category}
                  </div>

                  {doc.reviewerNotes && (
                    <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200/70 mt-2">
                      <strong>Audit Log Note ({doc.reviewedBy}):</strong> {doc.reviewerNotes}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 self-end md:self-center">
                  {!isVerified && (
                    <button
                      onClick={() => handleDecision(doc.id, 'VERIFIED')}
                      className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1"
                    >
                      <Check className="w-4 h-4" />
                      <span>Approve (Verify)</span>
                    </button>
                  )}

                  {doc.status !== 'NEEDS_REPLACEMENT' && (
                    <button
                      onClick={() => handleDecision(doc.id, 'NEEDS_REPLACEMENT')}
                      className="px-3.5 py-2 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Request Replace</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
