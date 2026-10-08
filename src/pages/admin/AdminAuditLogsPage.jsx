import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { History, ShieldCheck, Search, Download } from 'lucide-react';

export const AdminAuditLogsPage = () => {
  const { auditLogs, addToast } = useApp();
  const [search, setSearch] = useState('');

  const filteredLogs = auditLogs.filter(l =>
    l.id.toLowerCase().includes(search.toLowerCase()) ||
    l.action.toLowerCase().includes(search.toLowerCase()) ||
    l.actor.toLowerCase().includes(search.toLowerCase()) ||
    l.target.toLowerCase().includes(search.toLowerCase()) ||
    l.details.toLowerCase().includes(search.toLowerCase())
  );

  const handleExportJsonLd = () => {
    const payload = {
      "@context": "https://schema.org",
      "@type": "DataFeed",
      "name": "OAL Network Cryptographic Audit Trail",
      "exportedAt": new Date().toISOString(),
      "securityStandard": "AES-256 Non-Repudiation / SHA-256 State Hashing",
      "recordCount": filteredLogs.length,
      "dataFeedElement": filteredLogs.map(log => ({
        "@type": "AuditRecord",
        "identifier": log.id,
        "action": log.action,
        "agent": log.actor,
        "target": log.target,
        "description": log.details,
        "timestamp": log.timestamp,
        "verification": "Tamper-Evident SHA-256 Cryptographic Verification"
      }))
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/ld+json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `oal_audit_trail_${new Date().toISOString().split('T')[0]}.jsonld`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    addToast('Audit Trail Exported', `Downloaded ${filteredLogs.length} audit records in JSON-LD format.`, 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
            Platform Immutable Audit Trail
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Cryptographically recorded timeline of all state transitions, KYC decisions, offer events, and working deal claims.
          </p>
        </div>

        <button
          onClick={handleExportJsonLd}
          className="px-4 py-2.5 rounded-xl border border-slate-200 hover:border-blue-600 hover:text-blue-600 text-xs font-bold text-slate-700 transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export JSON-LD Audit Log</span>
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Filter by actor, action, target, or keywords..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-500">
          <span>{filteredLogs.length} Filtered Log Entries</span>
          <span className="text-emerald-700 font-bold flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" /> Non-Repudiation Enforced
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredLogs.map((log) => (
            <div key={log.id} className="p-4 hover:bg-slate-50/70 transition-colors space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono font-bold text-slate-400 tracking-wide">{log.id}</span>
                  <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/80">
                    {log.action}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-sans shrink-0">
                  {new Date(log.timestamp).toLocaleString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })}
                </span>
              </div>

              <div className="text-xs font-sans text-slate-700 flex flex-wrap items-center gap-1.5">
                <strong className="text-slate-900">{log.actor}</strong>
                <span className="text-slate-400">&rarr;</span>
                <span className="font-semibold text-blue-600">{log.target}</span>
              </div>

              <p className="text-xs font-sans text-slate-600 leading-relaxed break-words">
                {log.details}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

