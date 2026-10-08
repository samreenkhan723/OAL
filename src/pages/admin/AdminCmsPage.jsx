import React, { useState } from 'react';
import { BookOpen, Edit, FileText, Globe, Plus, CheckCircle2, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { VerifyBadge } from '../../components/common/VerifyBadge';

export const AdminCmsPage = () => {
  const { addToast } = useApp();
  const [pages, setPages] = useState([
    { id: 'cms-1', page: 'Homepage Hero & Statistics', path: '/', lastUpdated: '2026-10-06', headline: 'Business Funding, Connected to the Right Lenders', status: 'PUBLISHED' },
    { id: 'cms-2', page: 'Loan Programs Catalog (8 Categories)', path: '/loan-programs', lastUpdated: '2026-10-04', headline: 'Specialized Financing for High-Performing Commercial Assets', status: 'PUBLISHED' },
    { id: 'cms-3', page: 'Investment IQ Methodology Explainer', path: '/investment-iq', lastUpdated: '2026-10-02', headline: 'The 180-Point Standard for Institutional Debt Readiness', status: 'PUBLISHED' },
    { id: 'cms-4', page: 'Help Desk & FAQ Knowledge Base', path: '/help', lastUpdated: '2026-10-05', headline: 'Centralized Answers on Underwriting, Working Deals, and KYC', status: 'PUBLISHED' },
  ]);

  const [editingPage, setEditingPage] = useState(null);
  const [editForm, setEditForm] = useState({ page: '', path: '', headline: '', status: 'PUBLISHED' });

  const handleOpenEdit = (item) => {
    setEditingPage(item);
    setEditForm({ page: item.page, path: item.path, headline: item.headline, status: item.status });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editForm.page.trim()) return;

    setPages(pages.map(p => p.id === editingPage.id ? {
      ...p,
      page: editForm.page,
      path: editForm.path,
      headline: editForm.headline,
      status: editForm.status,
      lastUpdated: new Date().toISOString().split('T')[0]
    } : p));

    addToast('CMS Page Updated [SIMULATED]', `Saved marketing content changes for "${editForm.page}".`, 'success');
    setEditingPage(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
              Content Management System (CMS)
            </h1>
            <VerifyBadge note="Client confirmation pending for CMS publishing workflows and marketing content roles (PRD FR-15)" />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Edit marketing copy, manage public loan program descriptions, and publish compliance updates.
          </p>
        </div>

        <button
          onClick={() => {
            const newId = `cms-${pages.length + 1}`;
            const newP = { id: newId, page: 'New Landing Section', path: `/landing-${newId}`, lastUpdated: new Date().toISOString().split('T')[0], headline: 'Enterprise Commercial Expansion', status: 'DRAFT' };
            setPages([...pages, newP]);
            addToast('Draft Page Created [SIMULATED]', 'Created new CMS page shell in draft state.', 'info');
          }}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Page Draft</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs divide-y divide-slate-100">
        {pages.map((item) => (
          <div key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs hover:bg-slate-50/50 transition-colors">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 block">{item.page}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  item.status === 'PUBLISHED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {item.status}
                </span>
              </div>
              <div className="text-xs text-slate-600 mt-0.5 font-medium">"{item.headline}"</div>
              <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">{item.path} • Updated {item.lastUpdated}</span>
            </div>
            <button
              onClick={() => handleOpenEdit(item)}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:border-blue-600 hover:text-blue-600 text-slate-700 font-bold transition-colors self-end sm:self-center"
            >
              Edit Copy
            </button>
          </div>
        ))}
      </div>

      {/* Interactive Edit Modal */}
      {editingPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Edit Marketing Copy & Meta</h3>
              <button onClick={() => setEditingPage(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Page Title</label>
                <input
                  type="text"
                  value={editForm.page}
                  onChange={(e) => setEditForm({ ...editForm, page: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Route Path</label>
                <input
                  type="text"
                  value={editForm.path}
                  onChange={(e) => setEditForm({ ...editForm, path: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Hero Headline Text</label>
                <textarea
                  rows={2}
                  value={editForm.headline}
                  onChange={(e) => setEditForm({ ...editForm, headline: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Publishing State</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >
                  <option value="PUBLISHED">PUBLISHED (Live)</option>
                  <option value="DRAFT">DRAFT (Staging Only)</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingPage(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-600/20"
                >
                  Save Copy Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

