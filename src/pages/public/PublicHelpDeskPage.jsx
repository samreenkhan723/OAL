import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LifeBuoy,
  Search,
  BookOpen,
  HelpCircle,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Send,
  Plus
} from 'lucide-react';

export const PublicHelpDeskPage = () => {
  const { kbArticles, createTicket } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(0);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: 'Loan Application Assistance',
    priority: 'Normal',
    message: ''
  });

  const faqs = [
    {
      q: 'How does the 3-lender Working Deal limit protect my business?',
      a: 'Under Rule FR-08, OAL Network limits concurrent underwriting to a maximum of 3 eligible institutional lenders. This prevents an open bidding circus, protects your focus, and ensures underwriters dedicate serious diligence rather than issuing shallow preliminary terms.'
    },
    {
      q: 'Can lenders contact me directly without my OAL Representative?',
      a: 'No. Per Rule FR-09, all borrower-lender discussions are mediated by your assigned OAL Representative. This ensures clear audit histories, prevents high-pressure sales calls, and safeguards your private contact information until you formally accept an offer.'
    },
    {
      q: 'Is the 180-point Investment IQ score a guaranteed loan approval?',
      a: 'No. Investment IQ is an objective measure of commercial financing readiness across Credit History (70), Cash Flow (50), Collateral (30), Business Plan (20), and Risk (10). Final approvals are contingent on underwriter verification of bank statements, tax returns, and lien checks.'
    },
    {
      q: 'What happens if a document upload is rejected?',
      a: 'Your OAL Representative and Compliance team will post a specific note (e.g. "Expired county permit; please provide current annual renewal"). You can upload an immediate replacement directly from your Documents tab without restarting your application.'
    }
  ];

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!ticketForm.subject.trim() || !ticketForm.message.trim()) return;

    createTicket(ticketForm);
    setShowTicketModal(false);
    setTicketForm({ subject: '', category: 'Loan Application Assistance', priority: 'Normal', message: '' });
  };

  const filteredArticles = kbArticles.filter(art =>
    art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
          Support & Documentation Center
        </span>
        <h1 className="text-4xl font-heading font-extrabold text-[#0B1730]">
          Help Desk & Knowledge Base
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Find answers regarding Investment IQ, working deal claim policies, document requirements, and mediated communications.
        </p>

        {/* Search */}
        <div className="pt-2 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search knowledge base articles or guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* Action Banner to Open Ticket */}
      <div className="bg-gradient-to-r from-blue-900 to-[#0B1730] rounded-2xl p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-white">Need Personal Underwriting Assistance?</h3>
          <p className="text-xs text-slate-300">
            Open a support ticket to consult with an OAL operations specialist or compliance officer.
          </p>
        </div>
        <button
          onClick={() => setShowTicketModal(true)}
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#D5B66A] hover:bg-[#c4a457] text-slate-950 shadow-md transition-all whitespace-nowrap flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Open Support Ticket</span>
        </button>
      </div>

      {/* Knowledge Base Articles */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          Featured Guides & Policy Articles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between hover:border-blue-400 transition-colors"
            >
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase">
                  {art.category}
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-2.5 leading-snug">
                  {art.title}
                </h4>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>{art.readTime} read</span>
                <span className="text-blue-600 font-bold hover:underline cursor-pointer">
                  Read article &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:bg-slate-50/50 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Submit Ticket Modal */}
      {showTicketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Submit Support & Intake Ticket
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Your inquiry will be logged directly into our Help Desk ticketing queue.
            </p>

            <form onSubmit={handleTicketSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={ticketForm.subject}
                  onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                  placeholder="e.g. Question regarding restaurant equipment loan documents"
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={ticketForm.category}
                    onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value="Loan Application Assistance">Loan Application Assistance</option>
                    <option value="Document Verification">Document Verification</option>
                    <option value="Investment IQ Scoring">Investment IQ Scoring</option>
                    <option value="Marketplace Operations">Marketplace Operations</option>
                    <option value="Billing & Subscription">Billing & Subscription</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Priority</label>
                  <select
                    value={ticketForm.priority}
                    onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value="Low">Low</option>
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Message</label>
                <textarea
                  rows={4}
                  required
                  value={ticketForm.message}
                  onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })}
                  placeholder="Explain the issue or inquiry in detail..."
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowTicketModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
