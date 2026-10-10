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
  Check,
  Mail,
  PhoneCall,
  MessageSquare,
  Bot,
  HelpCircle,
  FileText,
  Users
} from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

export const HelpDeskTicketDetailPage = () => {
  const { id } = useParams();
  const { tickets, replyTicket, closeTicket, currentUser, addToast } = useApp();
  const [replyText, setReplyText] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [forceShowReply, setForceShowReply] = useState(false);
  
  // Collaboration Note Toggle (Doc 2 Lines 31-32)
  const [isInternalNote, setIsInternalNote] = useState(false);
  
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

  const channel = ticket.channel || (ticket.id === 'TCK-2026-081' ? 'Email' : ticket.id === 'TCK-2026-082' ? 'In-App Chat' : 'SMS');

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    if (isInternalNote) {
      // Add internal note behind the scenes (Doc 2 Lines 31-32)
      ticket.messages = ticket.messages || [];
      ticket.messages.push({
        sender: `${currentUser.name || 'Support Agent'} (Internal Team Note)`,
        text: replyText,
        timestamp: new Date().toISOString(),
        isInternal: true
      });
      if (addToast) {
        addToast(
          'Internal Note Posted',
          'Internal collaboration note saved. This note is hidden from the customer and only visible to OAL team members.',
          'info'
        );
      }
    } else {
      replyTicket(ticket.id, replyText);
      if (addToast) {
        addToast('Reply Dispatched', `Response transmitted to customer via ${channel}.`, 'success');
      }
    }

    setReplyText('');
    setForceShowReply(false);
    setIsInternalNote(false);
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
        addToast('AI Suggestion Inserted', 'AI reply inserted into draft box. You may review and edit before sending.', 'success');
      }
    }
  };

  const handleInsertKbLink = (title, url) => {
    const linkText = `\n\nReference Article: ${title} (${url})`;
    setReplyText((prev) => prev + linkText);
    if (addToast) {
      addToast('Knowledge Base Article Added', `Inserted link for "${title}".`, 'info');
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

      {/* Ticket Header with Channel & Auto-Routing Metadata (Doc 2) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-400">{ticket.id}</span>
            <StatusBadge status={ticket.status} />
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {ticket.priority} Priority
            </span>

            {/* Channel origin */}
            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              {channel === 'Email' ? <Mail className="w-3 h-3 text-amber-600" /> : channel === 'SMS' ? <PhoneCall className="w-3 h-3 text-purple-600" /> : <MessageSquare className="w-3 h-3 text-blue-600" />}
              <span>{channel} Intake</span>
            </span>

            {/* Auto-routed badge */}
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
              <Bot className="w-3 h-3 text-purple-600" />
              <span>Assigned: {ticket.assignedTo}</span>
            </span>
          </div>

          <h1 className="text-xl font-bold font-heading text-slate-900">
            {ticket.subject}
          </h1>

          <div className="text-xs text-slate-500">
            Requester: <strong className="text-slate-800">{ticket.userName}</strong> ({ticket.userEmail}) • Role: {ticket.userRole} • Category: {ticket.category}
          </div>
        </div>

        {ticket.status !== 'CLOSED' && (
          <button
            onClick={() => closeTicket(ticket.id)}
            className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 rounded-xl transition-colors w-full sm:w-auto text-center cursor-pointer shrink-0"
          >
            Mark Ticket Closed
          </button>
        )}
      </div>

      {/* AI Suggestion Box (Doc 2 Line 23: Response Suggestions) */}
      {ticket.aiSuggestion && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50/70 border border-blue-200 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
              <Sparkles className="w-4 h-4 text-[#D5B66A]" />
              <span>Doc 2 AI Response Suggestion (Review & Personalize)</span>
            </div>
            <span className="text-[10px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full self-start sm:self-auto">
              Automated Draft Assistance
            </span>
          </div>

          <p className="text-xs text-blue-950/80 leading-relaxed italic bg-white/70 p-3 rounded-xl border border-blue-100">
            "{ticket.aiSuggestion}"
          </p>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span>Quick Knowledge Base Articles:</span>
              <button
                type="button"
                onClick={() => handleInsertKbLink('KYC Upload Checklist', 'https://oalnetwork.com/help/kyc')}
                className="text-blue-600 hover:underline font-semibold cursor-pointer"
              >
                + KYC Checklist
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => handleInsertKbLink('180-Point IQ Guidelines', 'https://oalnetwork.com/help/iq')}
                className="text-blue-600 hover:underline font-semibold cursor-pointer"
              >
                + IQ Guide
              </button>
            </div>

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
                <span>Review & Insert Into Box</span>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Message History with Internal Team Notes (Doc 2 Lines 31-32 Collaboration Tools) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Conversation Thread ({ticket.messages?.length || 1} Messages)
          </h3>
          <span className="text-[10px] text-slate-400">
            Team Collaboration Tools Active
          </span>
        </div>

        <div className="space-y-4 divide-y divide-slate-100">
          {ticket.messages?.map((m, idx) => {
            const isInternal = m.isInternal || m.sender.includes('Internal Team Note');

            return (
              <div key={idx} className="pt-4 first:pt-0 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{m.sender}</span>
                    {isInternal && (
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5 text-amber-700" />
                        <span>INTERNAL NOTE (HIDDEN FROM CUSTOMER)</span>
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div
                  className={`p-3.5 rounded-xl text-xs leading-relaxed ${
                    isInternal
                      ? 'bg-amber-50/80 border border-amber-200 text-amber-950 font-medium'
                      : 'bg-slate-50 border border-slate-100 text-slate-700'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Reply & Internal Collaboration Note Form */}
        {(ticket.status !== 'CLOSED' || forceShowReply) ? (
          <form onSubmit={handleSendReply} className="pt-4 border-t border-slate-100 space-y-3">
            {/* Mode Switcher: Public Reply vs Internal Note (Doc 2 Lines 31-32) */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setIsInternalNote(false)}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    !isInternalNote
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Send className="w-3 h-3" />
                  <span>Public Reply (To Customer)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsInternalNote(true)}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    isInternalNote
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Users className="w-3 h-3" />
                  <span>Internal Team Note (Private)</span>
                </button>
              </div>

              {isInternalNote && (
                <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Behind the scenes collaboration • Customer cannot view
                </span>
              )}
            </div>

            <textarea
              ref={replyTextareaRef}
              rows={3}
              required
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={
                isInternalNote
                  ? 'Write internal private note for team members (underwriters, compliance, Elena Rostova)...'
                  : `Draft your official response to ${ticket.userName} via ${channel}...`
              }
              className={`w-full px-3.5 py-2.5 text-xs border rounded-xl focus:outline-none transition-all ${
                isInternalNote
                  ? 'bg-amber-50/50 border-amber-200 focus:ring-2 focus:ring-amber-500 text-amber-950 placeholder-amber-700/60'
                  : 'bg-white border-slate-200 focus:ring-2 focus:ring-blue-600'
              }`}
            />

            <div className="flex justify-end">
              <button
                type="submit"
                className={`w-full sm:w-auto px-5 py-2.5 text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                  isInternalNote
                    ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20'
                    : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'
                }`}
              >
                {isInternalNote ? (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Save Internal Private Note</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Response to Customer</span>
                  </>
                )}
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

