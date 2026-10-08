import React from 'react';
import { CreditCard, DollarSign, ArrowUpRight } from 'lucide-react';
import { VerifyBadge } from '../../components/common/VerifyBadge';

export const AdminPaymentsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
            Payments & Commercial Fee Ledger
          </h1>
          <VerifyBadge note="Client confirmation pending for automated payment gateway integrations and payout lifecycle (PRD FR-15)" />
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Master transaction ledger of platform origination basis points, subscription billings, and affiliate disbursements.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>Recent Platform Fee Collections</span>
          <span className="text-emerald-700 font-bold">ACH & Wire Clearing</span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {[
            { id: 'PAY-8821', from: 'Apex Horizon Capital LLC', desc: 'Working Deal Placement Surcharge (APP-2026-1094)', amount: '+$3,900.00', status: 'SETTLED', date: '2026-10-06' },
            { id: 'PAY-8820', from: 'OAL Treasury', desc: 'Affiliate Commission Payout to Marcus Vance', amount: '-$1,000.00', status: 'PAID', date: '2026-10-04' },
            { id: 'PAY-8819', from: 'Hospitality Capital Partners', desc: 'Institutional Monthly Seat Subscription', amount: '+$1,950.00', status: 'SETTLED', date: '2026-10-01' },
          ].map((tx) => (
            <div key={tx.id} className="p-4 flex items-center justify-between gap-4">
              <div>
                <span className="font-bold text-slate-900 block">{tx.desc}</span>
                <span className="text-[11px] text-slate-400">{tx.id} • {tx.from} • {tx.date}</span>
              </div>
              <div className="text-right">
                <span className={`font-mono font-bold block ${tx.amount.startsWith('+') ? 'text-emerald-700' : 'text-slate-900'}`}>{tx.amount}</span>
                <span className="text-[10px] text-emerald-600 font-bold">{tx.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
