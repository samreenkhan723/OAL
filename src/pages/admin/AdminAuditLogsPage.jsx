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
          onClick={() => addToast('Audit Trail Exported [SIMULATED]', 'Exported full JSON-LD tamper-evident cryptographic log.', 'success')}
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
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>{filteredLogs.length} Filtered Log Entries</span>
          <span className="text-emerald-700 font-bold flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" /> Non-Repudiation Enforced
          </span>
        </div>

        <div className="divide-y divide-slate-100 font-mono text-xs">
          {filteredLogs.map((log) => (
            <div key={log.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-2 hover:bg-slate-50/70 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-400">{log.id}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                    {log.action}
                  </span>
                  <span className="text-[11px] text-slate-600 font-sans">
                    <strong>{log.actor}</strong> &rarr; <span className="text-blue-600">{log.target}</span>
                  </span>
                </div>
                <div className="text-[11px] font-sans text-slate-600">{log.details}</div>
              </div>

              <span className="text-[10px] text-slate-400 font-sans whitespace-nowrap self-end md:self-center">
                {new Date(log.timestamp).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

