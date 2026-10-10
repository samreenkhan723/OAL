import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Send, ShieldAlert, User, CheckCheck, Lock } from 'lucide-react';

export const MediatedChat = ({ applicationId = 'APP-2026-1082' }) => {
  const { currentRole, currentUser, messages, sendMessage } = useApp();
  const [inputText, setInputText] = useState('');

  // Rep can toggle between Borrower thread and Lender thread
  const [repActiveThread, setRepActiveThread] = useState('borrower'); // 'borrower' | 'lender'

  // Filter messages for this application
  const appMessages = messages.filter(m => m.applicationId === applicationId);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    if (currentRole === 'rep') {
      // Rep is replying to either borrower or lender
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
      // Borrower sends message to OAL Rep
      sendMessage({
        conversationId: `CONV_BORROWER_REP_${applicationId}`,
        text: inputText,
        applicationId,
        receiverRole: 'rep',
        receiverId: 'usr_rep_01',
        receiverName: 'Elena Rostova (OAL Rep)'
      });
    } else if (currentRole === 'lender') {
      // Lender sends message to OAL Rep
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
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col h-[520px]">
      {/* Header */}
      <div className="p-3.5 sm:p-4 bg-gradient-to-r from-[#0B1730] to-[#172B4D] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 mt-0.5 sm:mt-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-bold text-white">
                Mediated Communication Channel
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D5B66A] text-slate-950 whitespace-nowrap shrink-0 shadow-xs">
                Rule FR-09
              </span>
            </div>
            <p className="text-[11px] text-slate-300">
              Supervised via Elena Rostova (Senior OAL Representative)
            </p>
          </div>
        </div>

        {/* Rep Toggle switch */}
        {currentRole === 'rep' && (
          <div className="flex items-center bg-slate-900/80 p-1 rounded-xl border border-slate-700 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setRepActiveThread('borrower')}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors text-center cursor-pointer ${
                repActiveThread === 'borrower' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Borrower Thread
            </button>
            <button
              type="button"
              onClick={() => setRepActiveThread('lender')}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors text-center cursor-pointer ${
                repActiveThread === 'lender' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Lender Thread
            </button>
          </div>
        )}
      </div>

      {/* Safety Compliance Banner */}
      <div className="bg-amber-50 border-b border-amber-200/80 px-3.5 sm:px-4 py-2.5 flex items-start gap-2 text-[11px] text-amber-900 leading-relaxed">
        <Lock className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong>Mediated Security Invariant:</strong> Direct borrower-to-lender chat is structurally prohibited to ensure compliance and avoid uncoordinated commitments.
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
        {appMessages.map((msg) => {
          const isMe = msg.senderRole === currentRole;

          return (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[80%] ${isMe ? 'ml-auto items-end' : 'mr-auto items-start'}`}
            >
              <div className="flex items-center gap-1.5 mb-1 px-1">
                <span className="text-[10px] font-bold text-slate-600">{msg.senderName}</span>
                <span className="text-[9px] text-slate-400">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              <div
                className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                  isMe
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : msg.senderRole === 'rep'
                    ? 'bg-[#0B1730] text-slate-100 rounded-tl-none border border-slate-700'
                    : 'bg-white text-slate-800 rounded-tl-none border border-slate-200'
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Send Message Input */}
      <form onSubmit={handleSend} className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={
            currentRole === 'rep'
              ? `Message ${repActiveThread === 'borrower' ? 'Borrower (Marcus)' : 'Lender Underwriters'}...`
              : 'Type a message to your dedicated OAL Representative...'
          }
          className="flex-1 px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          type="submit"
          className="p-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl shadow-md shadow-blue-600/20 transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
