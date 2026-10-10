import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LifeBuoy,
  Plus,
  Search,
  Filter,
  MessageSquare,
  ArrowRight,
  Clock,
  Sparkles,
  ShieldCheck,
  Mail,
  PhoneCall,
  Globe,
  Bot,
  CheckCircle2,
  TrendingUp,
  UserCheck,
  Radio,
  HelpCircle,
  Zap,
  Check
} from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

export const HelpDeskTicketsPage = () => {
  const { tickets, createTicket, addToast } = useApp();
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [channelFilter, setChannelFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    category: 'General',
    priority: 'Normal',
    channel: 'In-App Chat',
    message: ''
  });

  // Filtered tickets
  const filteredTickets = tickets.filter(t => {
    const matchesStatus = statusFilter === 'ALL' || t.status === statusFilter;
    const ticketChannel = t.channel || (t.id === 'TCK-2026-081' ? 'Email' : t.id === 'TCK-2026-082' ? 'In-App Chat' : 'SMS');
    const matchesChannel = channelFilter === 'ALL' || ticketChannel.toLowerCase() === channelFilter.toLowerCase();
    const matchesSearch = !searchQuery.trim() ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesChannel && matchesSearch;
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newTicket.subject.trim() || !newTicket.message.trim()) return;
    
    // Auto routing rule simulation (Doc 2 Line 22)
    let assignedTo = 'David Kim (Support Desk Lead)';
    if (newTicket.category === 'Document Verification') assignedTo = 'Victoria Sterling (Compliance)';
    if (newTicket.category === 'Marketplace Operations') assignedTo = 'Elena Rostova (Placement Agent)';

    createTicket({
      ...newTicket,
      assignedTo,
      channel: newTicket.channel
    });

    if (addToast) {
      addToast(
        'Support Ticket Dispatched',
        `Ticket automatically routed to ${assignedTo} per Doc 2 AI routing criteria.`,
        'success'
      );
    }

    setShowCreateModal(false);
    setNewTicket({ subject: '', category: 'General', priority: 'Normal', channel: 'In-App Chat', message: '' });
  };

  return (
    <div className="space-y-8">
      {/* Top AI Help Desk Banner (Doc 2 Specifications) */}
      <div className="bg-gradient-to-r from-[#001744] via-[#002060] to-[#003882] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden border border-[#003882]/70">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#0070C0]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-[#FFD200] text-[#002060] border border-amber-300 uppercase tracking-wider">
              AI Help Desk & Support Center
            </span>
            <span className="text-xs text-slate-300">
              Doc 2 Standard: 24/7 Multi-Channel Intake & Automated Issue Tracking
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>AI Response Suggestions Active</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
            AI Help Desk — Centralized Support Console
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Streamline communication, track user inquiries from multiple platforms, and assist borrowers during critical application moments to <strong>prevent drop-off and abandonment</strong>.
          </p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">
          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#FFD200] hover:bg-[#ffe040] text-[#002060] border border-amber-300 font-extrabold text-xs shadow-md shadow-amber-400/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center"
          >
            <Plus className="w-4 h-4 text-[#002060]" />
            <span>Open New Ticket</span>
          </button>

          <Link
            to="/support/knowledge-base"
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-bold transition-all flex items-center justify-center gap-1.5 text-center"
          >
            <HelpCircle className="w-4 h-4 text-[#FFD200]" />
            <span>Knowledge Base</span>
          </Link>

          <Link
            to="/support/analytics"
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-bold transition-all flex items-center justify-center gap-1.5 text-center"
          >
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>CSAT Analytics</span>
          </Link>
        </div>
      </div>

      {/* 4 Performance Analytics KPI Cards (Doc 2 Lines 29-30) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold uppercase tracking-wider text-[10px] sm:text-[11px] truncate">CSAT Score</span>
            <Sparkles className="w-4 h-4 text-[#FFD200] shrink-0" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-heading">98.4%</div>
          <span className="text-[10px] sm:text-[11px] text-emerald-600 font-semibold mt-1 block flex items-center gap-1 truncate">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> High Resolution Quality
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold uppercase tracking-wider text-[10px] sm:text-[11px] truncate">First Response</span>
            <Clock className="w-4 h-4 text-[#0070C0] shrink-0" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#002060] font-heading">8.2 min</div>
          <span className="text-[10px] sm:text-[11px] text-[#0070C0] font-semibold mt-1 block truncate">
            AI Reply Suggestions
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold uppercase tracking-wider text-[10px] sm:text-[11px] truncate">Resolution Rate</span>
            <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-purple-700 font-heading">91.5%</div>
          <span className="text-[10px] sm:text-[11px] text-purple-700 font-semibold mt-1 block truncate">
            Knowledge Base
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold uppercase tracking-wider text-[10px] sm:text-[11px] truncate">Drop-Off Drop</span>
            <Zap className="w-4 h-4 text-amber-500 shrink-0" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-heading">-38.2%</div>
          <span className="text-[10px] sm:text-[11px] text-amber-700 font-semibold mt-1 block truncate">
            Critical Interventions
          </span>
        </div>
      </div>

      {/* Proactive Application Abandonment Intervention Banner (Doc 2 Lines 10-12) */}
      <div className="bg-gradient-to-r from-blue-900/5 via-indigo-900/5 to-slate-900/5 border border-blue-200/80 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
            <LifeBuoy className="w-5 h-5 text-[#0070C0]" />
          </div>
          <div className="space-y-1 flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Doc 2 Mandate: Reducing Application Abandonment & Proactive Guidance
              </h4>
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200/80 whitespace-nowrap shrink-0">
                Live Support Guard
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed max-w-4xl">
              "Support During Critical Moments: Many users abandon applications due to difficulties or lack of information. Help desks can intervene to assist users, thereby lowering abandonment rates." — <strong>Active intervention triggers monitoring borrowers paused on Step 3 (Documents) or Step 4 (Financials).</strong>
            </p>
          </div>
        </div>

        <span className="w-full sm:w-auto text-xs font-bold px-3.5 py-2 rounded-xl bg-white text-blue-800 border border-blue-200 shadow-xs shrink-0 flex items-center justify-center gap-1.5 text-center">
          <Check className="w-3.5 h-3.5 text-emerald-600" />
          <span>Abandonment Monitor Active</span>
        </span>
      </div>

      {/* Main Tickets Queue with Multi-Channel Filter & AI Auto-Routing Badges */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden space-y-4 p-4 sm:p-5">
        {/* Filters and Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
            {['ALL', 'OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  statusFilter === st
                    ? 'bg-[#0070C0] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {st.replace(/_/g, ' ')}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by ticket, requester, subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-1.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0070C0] focus:outline-none"
            />
          </div>
        </div>

        {/* Multi-Channel Filter Badges (Doc 2 Lines 27-28) */}
        <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
          <span className="text-slate-400 font-semibold text-[11px] flex items-center gap-1">
            <Filter className="w-3 h-3" /> Channel Intake:
          </span>
          {[
            { id: 'ALL', label: 'All Channels', icon: Globe },
            { id: 'In-App Chat', label: 'In-App Portal Chat', icon: MessageSquare },
            { id: 'Email', label: 'Email Ingestion', icon: Mail },
            { id: 'SMS', label: 'SMS Text Relay', icon: PhoneCall },
          ].map((c) => {
            const Icon = c.icon;
            return (
              <button
                key={c.id}
                onClick={() => setChannelFilter(c.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  channelFilter === c.id
                    ? 'bg-[#002060] text-[#FFD200] shadow-xs font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{c.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tickets List */}
        <div className="divide-y divide-slate-100 pt-2">
          {filteredTickets.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs">
              No support tickets found matching active criteria.
            </div>
          ) : (
            filteredTickets.map((t) => {
              const channel = t.channel || (t.id === 'TCK-2026-081' ? 'Email' : t.id === 'TCK-2026-082' ? 'In-App Chat' : 'SMS');

              return (
                <div
                  key={t.id}
                  className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors rounded-xl"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-400">{t.id}</span>
                      <StatusBadge status={t.status} />

                      {/* Channel Badge (Doc 2) */}
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {channel === 'Email' ? <Mail className="w-3 h-3 text-amber-600" /> : channel === 'SMS' ? <PhoneCall className="w-3 h-3 text-purple-600" /> : <MessageSquare className="w-3 h-3 text-[#0070C0]" />}
                        <span>{channel}</span>
                      </span>

                      {/* Priority */}
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {t.priority} Priority
                      </span>

                      {/* AI Auto-Routing Badge (Doc 2 Line 22) */}
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 flex items-center gap-1">
                        <Bot className="w-3 h-3 text-purple-600" />
                        <span>Auto-Routed to: {t.assignedTo}</span>
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900">{t.subject}</h3>

                    <p className="text-xs text-slate-500">
                      From: <strong>{t.userName}</strong> ({t.userEmail}) • Role: <strong>{t.userRole}</strong> • Category: {t.category}
                    </p>
                  </div>

                  <Link
                    to={`/support/tickets/${t.id}`}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#002060] hover:bg-[#0070C0] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 self-stretch sm:self-center shadow-xs text-center"
                  >
                    <span>Inspect & Reply</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* New Ticket Modal with Multi-Channel Source & Auto-Routing Preview (Doc 2) */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Create Support Ticket</h3>
                <span className="text-xs text-slate-400">Integrated Intake Queue • Doc 2 Standard</span>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Inquiry Subject</label>
                <input
                  type="text"
                  required
                  placeholder="E.g., Assistance required with equipment invoice upload..."
                  value={newTicket.subject}
                  onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Intake Channel</label>
                  <select
                    value={newTicket.channel}
                    onChange={(e) => setNewTicket({ ...newTicket, channel: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value="In-App Chat">In-App Chat</option>
                    <option value="Email">Email</option>
                    <option value="SMS">SMS Relay</option>
                    <option value="Social Media">Social Media</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newTicket.category}
                    onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value="General">General Inquiry</option>
                    <option value="Document Verification">Document Verification</option>
                    <option value="Marketplace Operations">Marketplace Operations</option>
                    <option value="Investment IQ">Investment IQ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Priority</label>
                  <select
                    value={newTicket.priority}
                    onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Inquiry Details</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detail the issue or technical error encountered..."
                  value={newTicket.message}
                  onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              {/* Automated Routing Preview (Doc 2 Line 22) */}
              <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-[11px] text-purple-900 flex items-center gap-2">
                <Bot className="w-4 h-4 text-purple-600 shrink-0" />
                <span>
                  <strong>AI Automated Routing:</strong> Tickets categorized under <em>{newTicket.category}</em> are routed to specialized tier agents automatically.
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0070C0] hover:bg-[#005a9e] text-white rounded-xl text-xs font-bold shadow-md shadow-[#0070C0]/25 cursor-pointer"
                >
                  Submit & Route Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

