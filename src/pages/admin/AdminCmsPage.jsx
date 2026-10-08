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
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newDraftForm, setNewDraftForm] = useState({ page: '', path: '', headline: '', status: 'DRAFT' });

  const handleOpenCreate = () => {
    const nextNum = pages.length + 1;
    setNewDraftForm({
      page: `New Program Showcase #${nextNum}`,
      path: `/programs/custom-${nextNum}`,
      headline: 'Flexible Commercial Debt Solutions for High-Growth Enterprises',
      status: 'DRAFT'
    });
    setShowCreateModal(true);
  };

  const handleCreateDraft = (e) => {
    e.preventDefault();
    if (!newDraftForm.page.trim()) return;

    const newPage = {
      id: `cms-${Date.now()}`,
      page: newDraftForm.page.trim(),
      path: newDraftForm.path.trim() || `/draft-${pages.length + 1}`,
      headline: newDraftForm.headline.trim() || 'Custom Loan Solutions',
      status: newDraftForm.status,
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setPages([newPage, ...pages]);
    addToast('Draft Page Created', `Added new CMS page shell: "${newPage.page}".`, 'success');
    setShowCreateModal(false);
  };

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

    addToast('CMS Page Updated', `Saved marketing content changes for "${editForm.page}".`, 'success');
    setEditingPage(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
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
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-1.5 w-full sm:w-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Page Draft</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs divide-y divide-slate-100">
        {pages.map((item) => (
          <div key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs hover:bg-slate-50/50 transition-colors">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-slate-900 block break-words">{item.page}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  item.status === 'PUBLISHED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {item.status}
                </span>
              </div>
              <div className="text-xs text-slate-600 mt-0.5 font-medium break-words">"{item.headline}"</div>
              <span className="text-[11px] text-slate-400 font-mono mt-0.5 block break-words">{item.path} • Updated {item.lastUpdated}</span>
            </div>
            <button
              onClick={() => handleOpenEdit(item)}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:border-blue-600 hover:text-blue-600 text-slate-700 font-bold transition-colors self-start sm:self-center w-full sm:w-auto text-center cursor-pointer"
            >
              Edit Copy
            </button>
          </div>
        ))}
      </div>

      {/* Interactive Edit Modal */}
      {editingPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Edit Marketing Copy & Meta</h3>
              <button onClick={() => setEditingPage(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
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

              <div className="pt-3 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingPage(null)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-600/20 cursor-pointer text-center"
                >
                  Save Copy Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Page Draft Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Create New CMS Page Draft</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDraft} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Page Title / Section</label>
                <input
                  type="text"
                  value={newDraftForm.page}
                  onChange={(e) => setNewDraftForm({ ...newDraftForm, page: e.target.value })}
                  placeholder="e.g. Equipment Financing Guide"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Route Path</label>
                <input
                  type="text"
                  value={newDraftForm.path}
                  onChange={(e) => setNewDraftForm({ ...newDraftForm, path: e.target.value })}
                  placeholder="/programs/equipment-loans"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Hero Headline Text</label>
                <textarea
                  rows={2}
                  value={newDraftForm.headline}
                  onChange={(e) => setNewDraftForm({ ...newDraftForm, headline: e.target.value })}
                  placeholder="Enter main heading banner copy..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Initial State</label>
                <select
                  value={newDraftForm.status}
                  onChange={(e) => setNewDraftForm({ ...newDraftForm, status: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >
                  <option value="DRAFT">DRAFT (Staging / Pending Review)</option>
                  <option value="PUBLISHED">PUBLISHED (Live Immediately)</option>
                </select>
              </div>

              <div className="pt-3 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-600/20 cursor-pointer text-center"
                >
                  Create Page Draft
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

