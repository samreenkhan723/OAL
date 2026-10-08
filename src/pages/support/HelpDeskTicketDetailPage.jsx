import React, { useState, useRef } from 'react';
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
  const { tickets, replyTicket, closeTicket, currentUser, addToast } = useApp();
  const [replyText, setReplyText] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [forceShowReply, setForceShowReply] = useState(false);
  const replyTextareaRef = useRef(null);

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
    setForceShowReply(false);
  };

  const handleApplyAiSuggestion = () => {
    if (ticket.aiSuggestion) {
      setReplyText(ticket.aiSuggestion);
      setForceShowReply(true);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);

      setTimeout(() => {
        if (replyTextareaRef.current) {
          replyTextareaRef.current.focus();
          replyTextareaRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 60);

      if (addToast) {
        addToast('AI Suggestion Inserted', 'Draft copied into response box. You can review and edit before dispatch.', 'success');
      }
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
          <div className="flex flex-wrap items-center gap-2">
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
            className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 rounded-xl transition-colors w-full sm:w-auto text-center"
          >
            Mark Ticket Closed
          </button>
        )}
      </div>

      {/* AI Suggestion Box (FR-13: Human Review Before Sending) */}
      {ticket.aiSuggestion && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50/70 border border-blue-200 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
              <Sparkles className="w-4 h-4 text-[#D5B66A]" />
              <span>AI Reply Suggestion (PRD FR-13 / Wireframe 8)</span>
            </div>
            <span className="text-[10px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full self-start sm:self-auto">
              Requires Human Review Before Dispatch
            </span>
          </div>

          <p className="text-xs text-blue-950/80 leading-relaxed italic bg-white/70 p-3 rounded-xl border border-blue-100">
            "{ticket.aiSuggestion}"
          </p>

          <div className="flex justify-end pt-1">
            <button
              onClick={handleApplyAiSuggestion}
              className={`px-4 py-2 rounded-xl text-white text-xs font-bold shadow-xs transition-all w-full sm:w-auto text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                isCopied ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Inserted Into Box!</span>
                </>
              ) : (
                <span>Review & Insert Into Response Box</span>
              )}
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
        {(ticket.status !== 'CLOSED' || forceShowReply) ? (
          <form onSubmit={handleSendReply} className="pt-4 border-t border-slate-100 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <label className="block text-xs font-bold text-slate-700">Write Response</label>
              {ticket.status === 'CLOSED' && (
                <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  Ticket was marked closed • Sending will reopen as In Progress
                </span>
              )}
            </div>
            <textarea
              ref={replyTextareaRef}
              rows={3}
              required
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Draft your response to the user..."
              className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all bg-white"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{ticket.status === 'CLOSED' ? 'Reopen & Send Response' : 'Send Response'}</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
            <span>Ticket is resolved and closed.</span>
            <button
              type="button"
              onClick={() => {
                setForceShowReply(true);
                setTimeout(() => replyTextareaRef.current?.focus(), 60);
              }}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold self-start sm:self-auto cursor-pointer"
            >
              Reopen & Reply
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
