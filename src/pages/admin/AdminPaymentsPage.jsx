import React, { useState } from 'react';
import { CreditCard, DollarSign, ArrowUpRight, Download, Filter, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { VerifyBadge } from '../../components/common/VerifyBadge';

export const AdminPaymentsPage = () => {
  const { addToast } = useApp();
  const [filterType, setFilterType] = useState('ALL');

  const transactions = [
    { id: 'PAY-8821', type: 'INCOME', from: 'Apex Horizon Capital LLC', desc: 'Working Deal Placement Surcharge (APP-2026-1094)', amount: '+$3,900.00', status: 'SETTLED', date: '2026-10-06' },
    { id: 'PAY-8820', type: 'PAYOUT', from: 'OAL Treasury', desc: 'Affiliate Commission Payout to Marcus Vance', amount: '-$1,000.00', status: 'PAID', date: '2026-10-04' },
    { id: 'PAY-8819', type: 'INCOME', from: 'Hospitality Capital Partners', desc: 'Institutional Monthly Seat Subscription', amount: '+$1,950.00', status: 'SETTLED', date: '2026-10-01' },
    { id: 'PAY-8818', type: 'INCOME', from: 'MedVest Healthcare Lending', desc: 'Working Deal Closing Fee (APP-2026-1105)', amount: '+$4,800.00', status: 'SETTLED', date: '2026-09-28' },
  ];

  const filtered = transactions.filter(t => filterType === 'ALL' || t.type === filterType);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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

        <button
          onClick={() => addToast('Ledger Exported [SIMULATED]', 'Exported all settled payment transactions as CSV.', 'success')}
          className="px-4 py-2.5 rounded-xl border border-slate-200 hover:border-blue-600 hover:text-blue-600 text-xs font-bold text-slate-700 transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export Fee Ledger</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        {['ALL', 'INCOME', 'PAYOUT'].map((f) => (
          <button
            key={f}
            onClick={() => setFilterType(f)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterType === f ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {f === 'ALL' ? 'All Transactions' : f === 'INCOME' ? 'Fee Collections' : 'Partner Disbursements'}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>{filtered.length} Recorded Ledger Transactions</span>
          <span className="text-emerald-700 font-bold">ACH & Wire Clearing Active</span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {filtered.map((tx) => (
            <div key={tx.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
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

