import React, { useState, useRef } from 'react';
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
  X,
  FileCheck,
  Download,
  Eye,
  Loader2
} from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

export const BorrowerDocumentsPage = () => {
  const { documents, uploadDocument, currentUser, addToast } = useApp();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedDocToReplace, setSelectedDocToReplace] = useState(null);
  const [previewDoc, setPreviewDoc] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDownloadFile = (doc) => {
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
Reviewer         : ${doc.reviewedBy || 'Compliance Officer'}
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
    if (addToast) {
      addToast('Download Started', `Downloaded ${doc.fileName}`, 'success');
    }
  };

  const [uploadForm, setUploadForm] = useState({
    title: '',
    category: 'Licensing & Compliance',
    fileName: 'commercial_document.pdf',
    fileSize: '2.4 MB'
  });

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const sizeStr = file.size > 1024 * 1024 
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
        : `${Math.round(file.size / 1024)} KB`;
      setUploadForm(prev => ({
        ...prev,
        fileName: file.name,
        fileSize: sizeStr,
        title: prev.title.trim() ? prev.title : file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ')
      }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
      const sizeStr = file.size > 1024 * 1024 
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
        : `${Math.round(file.size / 1024)} KB`;
      setUploadForm(prev => ({
        ...prev,
        fileName: file.name,
        fileSize: sizeStr,
        title: prev.title.trim() ? prev.title : file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ')
      }));
    }
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!uploadForm.title.trim()) return;

    setIsUploading(true);

    setTimeout(() => {
      uploadDocument({
        replaceDocId: selectedDocToReplace?.id,
        applicationId: 'APP-2026-1082',
        title: uploadForm.title.trim(),
        category: uploadForm.category,
        fileName: selectedFile?.name || uploadForm.fileName || 'kyc_document.pdf',
        fileSize: uploadForm.fileSize || (selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB` : '2.4 MB')
      });

      setIsUploading(false);
      setShowUploadModal(false);
      setSelectedDocToReplace(null);
      setSelectedFile(null);
      setUploadForm({ title: '', category: 'Licensing & Compliance', fileName: 'commercial_document.pdf', fileSize: '2.4 MB' });
    }, 350);
  };

  const openReplaceModal = (doc) => {
    setSelectedDocToReplace(doc);
    setSelectedFile(null);
    setUploadForm({
      title: `Replacement: ${doc.title}`,
      category: doc.category,
      fileName: `updated_${doc.fileName}`,
      fileSize: doc.fileSize || '2.4 MB'
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
            setSelectedFile(null);
            setUploadForm({ title: '', category: 'Licensing & Compliance', fileName: 'commercial_document.pdf', fileSize: '2.4 MB' });
            setShowUploadModal(true);
          }}
          className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all self-start sm:self-auto w-full sm:w-auto cursor-pointer"
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
        <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2">
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
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 break-words">{doc.title}</span>
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

                <div className="flex flex-wrap items-center gap-2 self-start md:self-center w-full md:w-auto">
                  {isRejected && (
                    <button
                      onClick={() => openReplaceModal(doc)}
                      className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1 cursor-pointer w-full sm:w-auto"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Replace Document</span>
                    </button>
                  )}

                  <button
                    onClick={() => setPreviewDoc(doc)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer w-full sm:w-auto"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View File</span>
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
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Upload className="w-5 h-5 text-blue-600" />
                {selectedDocToReplace ? 'Replace Document' : 'Upload Verification Document'}
              </h3>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setSelectedDocToReplace(null);
                  setSelectedFile(null);
                }}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Document Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                  placeholder="e.g. Licensing & Operating Permits"
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Classification Category</label>
                <select
                  value={uploadForm.category}
                  onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white cursor-pointer"
                >
                  <option value="Licensing & Operating Permits">Licensing & Operating Permits</option>
                  <option value="Financial Statements">Financial Statements (Bank statements, P&L)</option>
                  <option value="Tax Filings">Tax Filings (1120-S, 1040, Schedule C)</option>
                  <option value="Collateral / Equipment">Collateral / Equipment Invoices</option>
                  <option value="Legal Agreements">Legal Agreements (Commercial lease, articles)</option>
                </select>
              </div>

              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                className="hidden"
              />

              {/* Dropzone / File Picker */}
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`p-5 border-2 border-dashed rounded-xl text-center transition-all cursor-pointer ${
                  selectedFile
                    ? 'border-emerald-500 bg-emerald-50/40'
                    : isDragging
                    ? 'border-blue-500 bg-blue-50/50'
                    : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50/70'
                }`}
              >
                {selectedFile ? (
                  <div className="space-y-1.5">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-bold text-slate-900 truncate max-w-xs mx-auto">
                      {selectedFile.name}
                    </div>
                    <div className="text-[11px] text-emerald-700 font-medium">
                      {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB • Ready to Upload
                    </div>
                    <span className="text-[10px] text-blue-600 font-semibold block pt-1 hover:underline">
                      Click to change file
                    </span>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-8 h-8 text-blue-500 mx-auto mb-1.5" />
                    <span className="text-xs font-bold text-slate-800 block">
                      Click to select PDF or image
                    </span>
                    <span className="text-[11px] text-slate-500 mt-0.5 block">
                      or drag and drop your file here
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      PDF, JPG, PNG, DOC up to 25MB
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-2 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowUploadModal(false);
                    setSelectedDocToReplace(null);
                    setSelectedFile(null);
                  }}
                  className="w-full sm:w-auto text-center px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="w-full sm:w-auto justify-center px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Encrypting & Uploading...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm Upload</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Document Preview Modal */}
      {previewDoc && (() => {
        const isNeedsReplacement = previewDoc.status === 'NEEDS_REPLACEMENT' || previewDoc.status === 'REJECTED';
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-4 sm:p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between pb-3 border-b border-slate-100 gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <FileText className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <h3 className="text-base font-bold text-slate-900 break-words leading-snug">{previewDoc.title}</h3>
                </div>
                <button onClick={() => setPreviewDoc(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer p-1 shrink-0">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    {isNeedsReplacement ? (
                      <button
                        type="button"
                        onClick={() => {
                          const doc = previewDoc;
                          setPreviewDoc(null);
                          openReplaceModal(doc);
                        }}
                        title="Click to replace this document"
                        className="inline-flex items-center gap-1.5 cursor-pointer group hover:opacity-90 transition-all text-left"
                      >
                        <StatusBadge status={previewDoc.status} />
                        <span className="text-[10px] font-semibold text-orange-700 bg-orange-100/80 hover:bg-orange-200 border border-orange-300 px-2 py-0.5 rounded-full transition-colors flex items-center gap-1 shrink-0">
                          <RotateCcw className="w-2.5 h-2.5" />
                          Replace Now
                        </span>
                      </button>
                    ) : (
                      <StatusBadge status={previewDoc.status} />
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 sm:text-right shrink-0">
                    Uploaded on {new Date(previewDoc.uploadedAt).toLocaleString()}
                  </span>
                </div>

                {/* Simulated PDF Document Viewer */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2 gap-2">
                    <div className="text-xs font-bold text-slate-700">OAL Encrypted Document Viewer</div>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full shrink-0">
                      AES-256 Protected
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-600 break-words">
                    <div className="break-all"><strong>File Name:</strong> {previewDoc.fileName}</div>
                    <div><strong>File Size:</strong> {previewDoc.fileSize}</div>
                    <div className="break-words"><strong>Category:</strong> {previewDoc.category}</div>
                    {previewDoc.reviewedBy && (
                      <div className="break-words"><strong>Review Officer:</strong> {previewDoc.reviewedBy}</div>
                    )}
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-center py-6 text-slate-400 text-xs">
                    <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    Preview rendered securely. Document verified for commercial credit evaluation.
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setPreviewDoc(null)}
                    className="w-full sm:w-auto text-center px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Close
                  </button>
                  <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                    {isNeedsReplacement && (
                      <button
                        type="button"
                        onClick={() => {
                          const doc = previewDoc;
                          setPreviewDoc(null);
                          openReplaceModal(doc);
                        }}
                        className="w-full sm:w-auto justify-center px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-md shadow-orange-600/20 flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Replace Document</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDownloadFile(previewDoc)}
                      className="w-full sm:w-auto justify-center px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-md shadow-blue-600/20 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download File</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
