import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Send, ShieldAlert, User, CheckCheck, Lock, ShieldCheck, AlertCircle } from 'lucide-react';

/**
 * Normalized conversation identifier helpers and role authorization predicates.
 * Rule FR-09: Direct Borrower <-> Lender communication is structurally prohibited.
 * All conversations are isolated 1-on-1 bridges mediated by an authorized OAL Representative.
 */
export const getCanonicalConversationId = (appId, threadType) => {
  const cleanAppId = appId || 'APP-2026-1082';
  return threadType === 'lender'
    ? `CONV_LENDER_REP_${cleanAppId}`
    : `CONV_BORROWER_REP_${cleanAppId}`;
};

export const isBorrowerThreadMessage = (msg, appId) => {
  if (!msg) return false;
  // Invariant: Institutional Lenders are never participants in Borrower-Rep channels
  if (msg.senderRole === 'lender' || msg.receiverRole === 'lender') return false;

  const cId = (msg.conversationId || '').toUpperCase();
  const targetId = `CONV_BORROWER_REP_${appId}`.toUpperCase();

  // Canonical exact match
  if (cId === targetId) return true;
  // Normalized legacy / backward-compatibility match (e.g. CONV_BORROWER_REP_1082)
  if (cId.includes('BORROWER_REP')) return true;
  // Participant-based fallback if conversationId is unpopulated
  if (msg.senderRole === 'borrower' || msg.receiverRole === 'borrower') return true;

  return false;
};

export const isLenderThreadMessage = (msg, appId, lenderId = null) => {
  if (!msg) return false;
  // Invariant: Borrowers are never participants in Lender-Rep channels
  if (msg.senderRole === 'borrower' || msg.receiverRole === 'borrower') return false;

  const cId = (msg.conversationId || '').toUpperCase();
  const targetId = `CONV_LENDER_REP_${appId}`.toUpperCase();

  // If specific lenderId is provided, isolate to this lender only
  if (lenderId) {
    const specificTargetId = `CONV_LENDER_REP_${appId}_${lenderId}`.toUpperCase();
    if (cId === specificTargetId || cId.includes(lenderId.toUpperCase())) return true;
    if (msg.senderId === lenderId || msg.receiverId === lenderId) return true;

    // Competing lender isolation: If message is explicitly for another lender, reject
    if (msg.senderId && msg.senderId.startsWith('usr_lender_') && msg.senderId !== lenderId) return false;
    if (msg.receiverId && msg.receiverId.startsWith('usr_lender_') && msg.receiverId !== lenderId) return false;

    // Backward compatibility for legacy seed messages without explicit lender sub-id:
    // If the message is generic CONV_LENDER_REP, map to primary claimant 'usr_lender_01'
    if (cId === targetId || cId.includes('LENDER_REP')) {
      return lenderId === 'usr_lender_01';
    }
    return false;
  }

  // Generic check for any lender message on this deal
  if (cId.startsWith(targetId)) return true;
  if (cId.includes('LENDER_REP')) return true;
  if (msg.senderRole === 'lender' || msg.receiverRole === 'lender') return true;

  return false;
};

export const MediatedChat = ({ applicationId = 'APP-2026-1082' }) => {
  const { currentRole, currentUser, messages, sendMessage } = useApp();
  const [inputText, setInputText] = useState('');

  // Rep / Admin cockpit can toggle between Borrower thread and Lender thread
  const [repActiveThread, setRepActiveThread] = useState('borrower'); // 'borrower' | 'lender'

  // 1. Filter raw messages for this application (accounting for legacy suffix formats)
  const appMessages = useMemo(() => {
    return (messages || []).filter(m => {
      if (!m) return false;
      if (m.applicationId === applicationId) return true;
      if (applicationId && m.applicationId) {
        const cleanTarget = applicationId.replace(/^APP-2026-/, '');
        const cleanMsgApp = m.applicationId.replace(/^APP-2026-/, '');
        if (cleanTarget && cleanMsgApp && cleanTarget === cleanMsgApp) return true;
      }
      return false;
    });
  }, [messages, applicationId]);

  // 2. Count messages per thread for cockpit badges
  const borrowerThreadCount = useMemo(() => {
    return appMessages.filter(m => isBorrowerThreadMessage(m, applicationId)).length;
  }, [appMessages, applicationId]);

  const lenderThreadCount = useMemo(() => {
    return appMessages.filter(m => isLenderThreadMessage(m, applicationId)).length;
  }, [appMessages, applicationId]);

  // 3. Strictly authorized messages per authenticated user and active role
  const visibleMessages = useMemo(() => {
    if (currentRole === 'borrower') {
      // Borrower sees ONLY authorized Borrower–Rep messages.
      // Private Lender–Rep messages and Lender metadata are strictly excluded.
      return appMessages.filter(m => isBorrowerThreadMessage(m, applicationId));
    }

    if (currentRole === 'lender') {
      // Lender sees ONLY authorized Lender–Rep messages for their own account.
      // Private Borrower–Rep messages and competing lender messages are strictly excluded.
      return appMessages.filter(m => isLenderThreadMessage(m, applicationId, currentUser?.id));
    }

    if (currentRole === 'rep' || currentRole === 'admin') {
      // Representative / Compliance Admin accesses the selected mediated thread
      if (repActiveThread === 'borrower') {
        return appMessages.filter(m => isBorrowerThreadMessage(m, applicationId));
      } else {
        return appMessages.filter(m => isLenderThreadMessage(m, applicationId));
      }
    }

    // Default safety deny-all for unauthorized roles
    return [];
  }, [appMessages, currentRole, repActiveThread, applicationId]);

  // 4. Safe Sender Labeling (Task 4: Never leak Lender name to Borrower)
  const getSafeSenderLabel = (msg) => {
    if (currentRole === 'borrower') {
      if (msg.senderRole === 'rep') {
        return msg.senderName || 'Elena Rostova (OAL Rep)';
      }
      if (msg.senderRole === 'borrower') {
        return msg.senderName || currentUser?.name || 'You (Borrower)';
      }
      // Defensive fallback: Never leak Lender identity
      return 'OAL Representative Bridge';
    }

    if (currentRole === 'lender') {
      if (msg.senderRole === 'rep') {
        return msg.senderName || 'Elena Rostova (OAL Rep)';
      }
      if (msg.senderRole === 'lender') {
        return msg.senderName || currentUser?.name || 'Your Underwriting Team';
      }
      // Defensive fallback: Never expose direct borrower personal data
      return 'Commercial Applicant (via Rep)';
    }

    // Rep and Admin see explicit participant names
    return msg.senderName;
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    if (currentRole === 'rep' || currentRole === 'admin') {
      // Rep replies to either borrower or lender thread
      if (repActiveThread === 'borrower') {
        sendMessage({
          conversationId: `CONV_BORROWER_REP_${applicationId}`,
          text: inputText,
          applicationId,
          receiverRole: 'borrower',
          receiverId: 'usr_borrower_01',
          receiverName: 'Marcus Vance'
        });
      } else {
        sendMessage({
          conversationId: `CONV_LENDER_REP_${applicationId}`,
          text: inputText,
          applicationId,
          receiverRole: 'lender',
          receiverId: 'usr_lender_01',
          receiverName: 'Apex Horizon Capital LLC'
        });
      }
    } else if (currentRole === 'borrower') {
      // Borrower sends message strictly to OAL Rep
      sendMessage({
        conversationId: `CONV_BORROWER_REP_${applicationId}`,
        text: inputText,
        applicationId,
        receiverRole: 'rep',
        receiverId: 'usr_rep_01',
        receiverName: 'Elena Rostova (OAL Rep)'
      });
    } else if (currentRole === 'lender') {
      // Lender sends message strictly to OAL Rep
      sendMessage({
        conversationId: `CONV_LENDER_REP_${applicationId}`,
        text: inputText,
        applicationId,
        receiverRole: 'rep',
        receiverId: 'usr_rep_01',
        receiverName: 'Elena Rostova (OAL Rep)'
      });
    }

    setInputText('');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col h-[540px]">
      {/* Header */}
      <div className="p-3.5 sm:p-4 bg-gradient-to-r from-[#001744] to-[#002060] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 mt-0.5 sm:mt-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-bold text-white">
                {currentRole === 'rep'
                  ? 'Tri-Party Mediation Cockpit'
                  : currentRole === 'lender'
                  ? 'Institutional Placement Bridge'
                  : 'Representative Mediated Channel'}
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFD200] text-[#002060] whitespace-nowrap shrink-0 shadow-xs">
                Rule FR-09
              </span>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-900/60 text-blue-200 border border-blue-700/50">
                {applicationId}
              </span>
            </div>
            <p className="text-[11px] text-slate-300">
              {currentRole === 'rep'
                ? `Supervising application ${applicationId} • Isolated dual bridge`
                : currentRole === 'lender'
                ? 'Direct line with Senior OAL Placement Agent Elena Rostova'
                : 'Supervised via Elena Rostova (Senior OAL Representative)'}
            </p>
          </div>
        </div>

        {/* Rep / Admin Cockpit Thread Selector */}
        {(currentRole === 'rep' || currentRole === 'admin') && (
          <div className="flex items-center bg-slate-900/80 p-1 rounded-xl border border-slate-700 w-full sm:w-auto">
            <button
              type="button"
              id="rep-toggle-borrower-thread"
              onClick={() => setRepActiveThread('borrower')}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                repActiveThread === 'borrower' ? 'bg-[#0070C0] text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Borrower Channel</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-blue-900 text-blue-200">
                {borrowerThreadCount}
              </span>
            </button>
            <button
              type="button"
              id="rep-toggle-lender-thread"
              onClick={() => setRepActiveThread('lender')}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                repActiveThread === 'lender' ? 'bg-[#002060] text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Lender Channel</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-200">
                {lenderThreadCount}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Safety Compliance Banner */}
      <div className="bg-amber-50 border-b border-amber-200/80 px-3.5 sm:px-4 py-2 flex items-start gap-2 text-[11px] text-amber-900 leading-relaxed">
        <Lock className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong>FR-09 Security Isolation Enforced:</strong>{' '}
          {currentRole === 'borrower'
            ? 'Your messages are private and routed exclusively to your OAL Representative. Institutional lender details remain confidential.'
            : currentRole === 'lender'
            ? 'Your communications are routed exclusively to OAL Placement Officers. Direct borrower contact is restricted under marketplace regulations.'
            : repActiveThread === 'borrower'
            ? 'Active thread: Commercial Applicant ↔ OAL Rep. Lender participants cannot access this channel.'
            : 'Active thread: Institutional Underwriters ↔ OAL Rep. Borrower participants cannot access this channel.'}
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
        {visibleMessages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold text-slate-600">No authorized messages in this channel</p>
            <p className="text-[11px] text-slate-400 max-w-sm">
              {currentRole === 'borrower'
                ? 'Send a question or update to Elena Rostova to begin supervised placement communication.'
                : currentRole === 'lender'
                ? 'Send an underwriting inquiry or stipulation request to the assigned OAL Representative.'
                : 'No messages recorded yet for this mediated thread.'}
            </p>
          </div>
        ) : (
          visibleMessages.map((msg) => {
            const isMe = msg.senderRole === currentRole;
            const safeLabel = getSafeSenderLabel(msg);

            return (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[85%] sm:max-w-[78%] ${
                  isMe ? 'ml-auto items-end' : 'mr-auto items-start'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1 px-1">
                  <span className="text-[10px] font-bold text-slate-700">
                    {safeLabel}
                  </span>
                  <span className="text-[9px] text-slate-400">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {msg.senderRole === 'rep' && (
                    <span className="text-[8px] font-bold px-1.5 py-0.2 rounded bg-blue-100 text-[#002060]">
                      OAL Rep
                    </span>
                  )}
                </div>

                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                    isMe
                      ? 'bg-[#0070C0] text-white rounded-tr-none'
                      : msg.senderRole === 'rep'
                      ? 'bg-[#002060] text-slate-100 rounded-tl-none border border-slate-700'
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-200'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Send Message Input */}
      <form onSubmit={handleSend} className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
        <input
          type="text"
          id="chat-message-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={
            currentRole === 'rep' || currentRole === 'admin'
              ? repActiveThread === 'borrower'
                ? 'Message Commercial Applicant (Marcus Vance)...'
                : 'Message Institutional Underwriting (Apex Horizon Capital)...'
              : currentRole === 'lender'
              ? 'Message assigned OAL Representative regarding this application...'
              : 'Type a message to your dedicated OAL Representative...'
          }
          className="flex-1 px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
        />
        <button
          type="submit"
          id="chat-send-button"
          disabled={!inputText.trim()}
          className="p-2.5 bg-[#0070C0] hover:bg-[#005a9e] active:bg-[#002060] disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl shadow-md shadow-[#0070C0]/25 transition-all cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
