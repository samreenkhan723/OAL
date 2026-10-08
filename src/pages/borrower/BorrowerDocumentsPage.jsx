import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FolderOpen,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  RotateCcw,
  ShieldCheck,
  Plus,
  X
} from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

export const BorrowerDocumentsPage = () => {
  const { documents, uploadDocument, currentUser } = useApp();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedDocToReplace, setSelectedDocToReplace] = useState(null);

  const [uploadForm, setUploadForm] = useState({
    title: '',
    category: 'Financial Statements',
    fileName: 'commercial_document.pdf'
  });

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!uploadForm.title.trim()) return;

    uploadDocument({
      applicationId: 'APP-2026-1082',
      title: uploadForm.title,
      category: uploadForm.category,
      fileName: uploadForm.fileName,
      fileSize: '3.1 MB'
    });

    setShowUploadModal(false);
    setSelectedDocToReplace(null);
    setUploadForm({ title: '', category: 'Financial Statements', fileName: 'commercial_document.pdf' });
  };

  const openReplaceModal = (doc) => {
    setSelectedDocToReplace(doc);
    setUploadForm({
      title: `Replacement: ${doc.title}`,
      category: doc.category,
      fileName: `updated_${doc.fileName}`
    });
    setShowUploadModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
            Documents & KYC Verification
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Securely uploaded corporate files for underwriter compliance and Investment IQ validation.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedDocToReplace(null);
            setShowUploadModal(true);
          }}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all self-start sm:self-auto"
        >
          <Upload className="w-4 h-4" />
          <span>Upload New Document</span>
        </button>
      </div>

      {/* Security Banner */}
      <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>AES-256 Underwriting Vault:</strong> All corporate documents are strictly encrypted. Lenders reviewing marketplace leads only see anonymized credit metrics until they claim an active working deal under Rule FR-08.
        </div>
      </div>

      {/* Documents List Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            Uploaded Underwriting Checklist ({documents.length} Files)
          </h3>
          <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            KYC Compliance Active
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {documents.map((doc) => {
            const isRejected = doc.status === 'REJECTED' || doc.status === 'NEEDS_REPLACEMENT';
            return (
              <div key={doc.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 truncate">{doc.title}</span>
                      <StatusBadge status={doc.status} />
                    </div>

                    <div className="text-[11px] text-slate-500 mt-0.5 flex flex-wrap items-center gap-2">
                      <span className="font-mono text-slate-400">{doc.fileName}</span>
                      <span>•</span>
                      <span>{doc.fileSize}</span>
                      <span>•</span>
                      <span className="text-slate-600">{doc.category}</span>
                      <span>•</span>
                      <span>Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}</span>
                    </div>

                    {doc.reviewerNotes && (
                      <div className={`mt-2 p-2.5 rounded-xl text-xs leading-relaxed ${
                        isRejected ? 'bg-orange-50 text-orange-900 border border-orange-200' : 'bg-slate-50 text-slate-600 border border-slate-200/80'
                      }`}>
                        <strong>Reviewer Note ({doc.reviewedBy || 'Compliance'}):</strong> {doc.reviewerNotes}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center">
                  {isRejected && (
                    <button
                      onClick={() => openReplaceModal(doc)}
                      className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Replace Document</span>
                    </button>
                  )}

                  <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium transition-colors">
                    View File
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upload / Replace Document Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Upload className="w-5 h-5 text-blue-600" />
                {selectedDocToReplace ? 'Replace Document' : 'Upload Verification Document'}
              </h3>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Document Title</label>
                <input
                  type="text"
                  required
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                  placeholder="e.g. 2026 Commercial Kitchen Equipment Invoices"
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Classification Category</label>
                <select
                  value={uploadForm.category}
                  onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >
                  <option value="Financial Statements">Financial Statements (Bank statements, P&L)</option>
                  <option value="Tax Filings">Tax Filings (1120-S, 1040, Schedule C)</option>
                  <option value="Collateral / Equipment">Collateral / Equipment Invoices</option>
                  <option value="Legal Agreements">Legal Agreements (Commercial lease, articles)</option>
                  <option value="Licensing & Compliance">Licensing & Operating Permits</option>
                </select>
              </div>

              <div className="p-4 border-2 border-dashed border-slate-200 rounded-xl text-center hover:bg-slate-50 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-1.5" />
                <span className="text-xs font-bold text-slate-700 block">Click to select PDF or image</span>
                <span className="text-[10px] text-slate-400">PDF, JPG, PNG up to 25MB</span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20"
                >
                  Confirm Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
