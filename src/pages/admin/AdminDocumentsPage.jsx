import React from 'react';
import { useApp } from '../../context/AppContext';
import { FolderOpen, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

export const AdminDocumentsPage = () => {
  const { documents } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
          Centralized Document Repository
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Master electronic file vault of all uploaded commercial bank statements, tax returns, and collateral invoices.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>{documents.length} Encrypted Files Stored</span>
          <span className="text-emerald-700 font-bold">AES-256 Storage Active</span>
        </div>

        <div className="divide-y divide-slate-100">
          {documents.map((doc) => (
            <div key={doc.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-slate-400">{doc.id}</span>
                  <StatusBadge status={doc.status} />
                  <span className="text-xs text-slate-400">Application: {doc.applicationId}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{doc.title}</h3>
                <div className="text-xs text-slate-500">
                  {doc.fileName} • {doc.fileSize} • Category: {doc.category}
                </div>
              </div>

              <button className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors self-end md:self-center">
                Inspect Document
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
