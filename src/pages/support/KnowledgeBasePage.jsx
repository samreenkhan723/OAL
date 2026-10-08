import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Search, ArrowRight, Eye, Clock } from 'lucide-react';

export const KnowledgeBasePage = () => {
  const { kbArticles } = useApp();
  const [search, setSearch] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const filtered = kbArticles.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.summary.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
          Help Desk Knowledge Base
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Internal and client-facing articles on 180-pt Investment IQ scoring, working-deal limits, and KYC compliance.
        </p>
      </div>

      <div className="max-w-md">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((art) => (
          <div
            key={art.id}
            onClick={() => setSelectedArticle(art)}
            className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:border-blue-400 cursor-pointer transition-all flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase">
                {art.category}
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-2">{art.title}</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">{art.summary}</p>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {art.views}</span>
              <span className="text-blue-600 font-bold">View Article &rarr;</span>
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700">
                {selectedArticle.category}
              </span>
              <button onClick={() => setSelectedArticle(null)} className="text-xs font-bold text-slate-400 hover:text-slate-600">
                Close
              </button>
            </div>

            <h2 className="text-xl font-bold font-heading text-slate-900">
              {selectedArticle.title}
            </h2>

            <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-200/70">
              {selectedArticle.content}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
