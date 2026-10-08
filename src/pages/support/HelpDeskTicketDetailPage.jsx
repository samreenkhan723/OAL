import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LifeBuoy,
  ChevronLeft,
  Send,
  Sparkles,
  CheckCircle2,
  Lock,
  User,
  ShieldCheck,
  Check
} from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

export const HelpDeskTicketDetailPage = () => {
  const { id } = useParams();
  const { tickets, replyTicket, closeTicket, currentUser } = useApp();
  const [replyText, setReplyText] = useState('');

  const ticket = tickets.find(t => t.id === id) || tickets[0];

  if (!ticket) {
    return (
      <div className="p-12 text-center">
        <h2 className="text-base font-bold">Ticket not found</h2>
        <Link to="/support/tickets" className="text-blue-600 text-xs font-bold mt-2 inline-block">
          &larr; Back to queue
        </Link>
      </div>
    );
  }

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    replyTicket(ticket.id, replyText);
    setReplyText('');
  };

  const handleApplyAiSuggestion = () => {
    if (ticket.aiSuggestion) {
      setReplyText(ticket.aiSuggestion);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <Link
          to="/support/tickets"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Ticket Queue</span>
        </Link>
      </div>

      {/* Ticket Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-400">{ticket.id}</span>
            <StatusBadge status={ticket.status} />
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {ticket.priority}
            </span>
          </div>

          <h1 className="text-xl font-bold font-heading text-slate-900 mt-1">
            {ticket.subject}
          </h1>

          <div className="text-xs text-slate-500 mt-1">
            Requester: <strong className="text-slate-800">{ticket.userName}</strong> ({ticket.userEmail}) • Role: {ticket.userRole}
          </div>
        </div>

        {ticket.status !== 'CLOSED' && (
          <button
            onClick={() => closeTicket(ticket.id)}
            className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 rounded-xl transition-colors self-start sm:self-auto"
          >
            Mark Ticket Closed
          </button>
        )}
      </div>

      {/* AI Suggestion Box (FR-13: Human Review Before Sending) */}
      {ticket.aiSuggestion && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50/70 border border-blue-200 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
              <Sparkles className="w-4 h-4 text-[#D5B66A]" />
              <span>AI Reply Suggestion (PRD FR-13 / Wireframe 8)</span>
            </div>
            <span className="text-[10px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
              Requires Human Review Before Dispatch
            </span>
          </div>

          <p className="text-xs text-blue-950/80 leading-relaxed italic bg-white/70 p-3 rounded-xl border border-blue-100">
            "{ticket.aiSuggestion}"
          </p>

          <div className="flex justify-end pt-1">
            <button
              onClick={handleApplyAiSuggestion}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
            >
              Review & Insert Into Response Box
            </button>
          </div>
        </div>
      )}

      {/* Message History */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Conversation Thread ({ticket.messages?.length || 1} Messages)
        </h3>

        <div className="space-y-4 divide-y divide-slate-100">
          {ticket.messages?.map((m, idx) => (
            <div key={idx} className="pt-4 first:pt-0 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{m.sender}</span>
                <span className="text-[10px] text-slate-400">
                  {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl">
                {m.text}
              </p>
            </div>
          ))}
        </div>

        {/* Reply Form */}
        {ticket.status !== 'CLOSED' && (
          <form onSubmit={handleSendReply} className="pt-4 border-t border-slate-100 space-y-3">
            <label className="block text-xs font-bold text-slate-700">Write Response</label>
            <textarea
              rows={3}
              required
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Draft your response to the user..."
              className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Send Response</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
