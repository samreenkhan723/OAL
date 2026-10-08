import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FolderOpen, FileText, CheckCircle2, AlertCircle, Search, Download, Eye, X, ShieldCheck } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

export const AdminDocumentsPage = () => {
  const { documents, addToast } = useApp();
  const [search, setSearch] = useState('');
  const [selectedDoc, setSelectedDoc] = useState(null);

  const filteredDocs = documents.filter(d =>
    d.title.toLowerCase().includes(search.toLowerCase()) ||
    d.category.toLowerCase().includes(search.toLowerCase()) ||
    d.applicationId.toLowerCase().includes(search.toLowerCase())
  );

  const handleDownloadDoc = (doc) => {
    if (!doc) return;
    const fileContent = `=====================================================
OAL NETWORK SECURE REPOSITORY - VERIFIED DOCUMENT
=====================================================
Document ID      : ${doc.id}
Document Title   : ${doc.title}
File Name        : ${doc.fileName}
Category         : ${doc.category}
Application ID   : ${doc.applicationId || 'APP-2026-1082'}
Calculated Size  : ${doc.fileSize || 'N/A'}
Status           : ${doc.status}
Verification     : AES-256 Protected & Compliance Audited
Reviewer         : ${doc.reviewedBy || 'Victoria Sterling (Compliance Admin)'}
Audit Notes      : ${doc.reviewerNotes || 'Verified healthy record with zero non-sufficient fund charges.'}
Export Timestamp : ${new Date().toLocaleString()}
=====================================================
CONFIDENTIAL - OAL FINANCIAL NETWORK REPOSITORY
`;

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = doc.fileName || `${doc.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    addToast('Download Started', `Downloaded ${doc.fileName}`, 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
            Centralized Document Repository
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Master electronic file vault of all uploaded commercial bank statements, tax returns, and collateral invoices.
          </p>
        </div>

        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>{filteredDocs.length} Encrypted Files Stored</span>
          <span className="text-emerald-700 font-bold flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" /> AES-256 Storage Active
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredDocs.map((doc) => (
            <div key={doc.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-bold text-slate-400">{doc.id}</span>
                  <StatusBadge status={doc.status} />
                  <span className="text-xs text-slate-400">Application: {doc.applicationId}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 break-words">{doc.title}</h3>
                <div className="text-xs text-slate-500 break-words">
                  <span className="break-all">{doc.fileName}</span> • {doc.fileSize} • Category: {doc.category}
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <button
                  onClick={() => setSelectedDoc(doc)}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:border-blue-600 hover:text-blue-600 text-xs font-bold text-slate-700 transition-colors flex items-center justify-center gap-1.5 w-full sm:w-auto cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Document</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inspect Document Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-4 my-auto max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold text-slate-400">{selectedDoc.id}</span>
                <StatusBadge status={selectedDoc.status} />
              </div>
              <button onClick={() => setSelectedDoc(null)} className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 break-words">{selectedDoc.title}</h3>
              <p className="text-xs text-slate-500 mt-0.5 break-words">Linked Application: {selectedDoc.applicationId}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-3 overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                <span className="text-slate-500 shrink-0">File Name:</span>
                <span className="font-mono text-slate-900 font-semibold break-all sm:text-right">{selectedDoc.fileName}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                <span className="text-slate-500 shrink-0">Classification Category:</span>
                <span className="font-semibold text-slate-800 break-words sm:text-right">{selectedDoc.category}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                <span className="text-slate-500 shrink-0">Calculated Size:</span>
                <span className="font-semibold text-slate-800 sm:text-right">{selectedDoc.fileSize}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                <span className="text-slate-500 shrink-0">Verification Reviewer:</span>
                <span className="font-semibold text-blue-600 break-words sm:text-right">{selectedDoc.reviewedBy || 'Victoria Sterling (Compliance Admin)'}</span>
              </div>
              {selectedDoc.reviewerNotes && (
                <div className="pt-2 border-t border-slate-200 text-slate-600 break-words">
                  <span className="font-bold block text-slate-700">Audit Notes:</span>
                  <p className="mt-0.5 leading-relaxed text-slate-600">{selectedDoc.reviewerNotes}</p>
                </div>
              )}
            </div>

            <div className="pt-2 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-2">
              <button
                type="button"
                onClick={() => handleDownloadDoc(selectedDoc)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors flex items-center justify-center gap-1.5 w-full sm:w-auto cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-blue-600" />
                <span>Simulate Download</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedDoc(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition-colors w-full sm:w-auto text-center cursor-pointer"
              >
                Close File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

