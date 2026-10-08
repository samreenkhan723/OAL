import React, { useState } from 'react';
import { CreditCard, CheckCircle2, ShieldCheck, ArrowRight, Download, X, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { VerifyBadge } from '../../components/common/VerifyBadge';

export const LenderBillingPage = () => {
  const { addToast } = useApp();
  const [currentTier, setCurrentTier] = useState({
    name: 'Enterprise Capital Tier',
    price: '$1,950 / month',
    deals: 'Up to 10 concurrent active working-deal claims',
    renewal: 'Nov 01, 2026'
  });

  const [showManageModal, setShowManageModal] = useState(false);

  const availableTiers = [
    { name: 'Standard Underwriter Tier', price: '$850 / month', deals: 'Up to 3 concurrent working deals' },
    { name: 'Enterprise Capital Tier', price: '$1,950 / month', deals: 'Up to 10 concurrent working deals' },
    { name: 'Syndicate Sovereign Tier', price: '$4,500 / month', deals: 'Unlimited active working deals' },
  ];

  const handleSelectTier = (t) => {
    setCurrentTier({
      name: t.name,
      price: t.price,
      deals: t.deals,
      renewal: 'Nov 01, 2026'
    });
    addToast('Plan Upgraded [SIMULATED]', `Switched subscription to ${t.name}.`, 'success');
    setShowManageModal(false);
  };

  const handleDownloadAnnualStatement = () => {
    const content = `================================================================================
OAL NETWORK - ANNUAL INSTITUTIONAL TAX STATEMENT (2026)
================================================================================
Account Partner  : Institutional Tier L-3
Statement Period : FY 2026 (Jan 01, 2026 - Dec 31, 2026)
Total Platform Fees Paid: $38,400.00
Eligible Deductions     : 100% Ordinary Commercial Expense (Section 162)
Total Originations      : $48,200,000.00
================================================================================
SUMMARY OF INVOICES:
- INV-2026-904 | $1,950.00 | PAID | Oct 01, 2026 | Enterprise Platform Subscription
- INV-2026-881 | $4,750.00 | PAID | Sep 25, 2026 | Deal Origination Success Fee
================================================================================
VERIFIED AND CERTIFIED BY OAL FINANCIAL NETWORK COMPLIANCE TREASURY
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'oal_annual_tax_statement_2026.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    addToast('Annual Statement Downloaded', 'Exported full 2026 institutional fee statements.', 'success');
  };

  const handleDownloadInvoice = (inv) => {
    const content = `================================================================================
OAL NETWORK OFFICIAL INVOICE RECEIPT
================================================================================
Invoice Number : ${inv.id}
Invoice Date   : ${inv.date}
Status         : ${inv.status}
Bill To        : Institutional Capital Partner
Description    : ${inv.desc}
Amount Paid    : ${inv.amount}
Payment Method : ACH Corporate Auto-Debit (Ending in 4402)
Transaction ID : TXN-${inv.id.replace('INV-', '')}-CONFIRMED
================================================================================
THANK YOU FOR YOUR PARTNERSHIP WITH OAL NETWORK
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${inv.id}_receipt.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    addToast('Invoice Downloaded', `Downloaded official receipt for ${inv.id}`, 'success');
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
            Lender Subscriptions & Placement Billing
          </h1>
          <VerifyBadge note="Client confirmation pending for exact institutional tier pricing and success fee percentages" />
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Manage your exchange seat licenses, monthly working-deal claim capacity, and closing fee invoices.
        </p>
      </div>

      {/* Current Plan Card */}
      <div className="bg-gradient-to-br from-[#0B1730] to-[#172B4D] rounded-3xl p-5 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#D5B66A] text-slate-950 uppercase">
            Active Institutional Tier
          </span>
          <h2 className="text-2xl font-bold font-heading text-white">
            {currentTier.name}
          </h2>
          <p className="text-xs text-slate-300 max-w-md leading-relaxed">
            Includes unlimited marketplace deal reviews, priority AI Lead Alerts, and {currentTier.deals}.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-slate-300">
            <span>Billing: <strong>{currentTier.price}</strong></span>
            <span>•</span>
            <span>Renews: <strong>{currentTier.renewal}</strong></span>
          </div>
        </div>

        <button
          onClick={() => setShowManageModal(true)}
          className="px-5 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-bold hover:bg-slate-100 transition-colors self-start md:self-auto cursor-pointer"
        >
          Manage Subscription
        </button>
      </div>

      {/* Invoices */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-sm font-bold text-slate-900">Recent Origination Fee Invoices</h3>
          <button
            onClick={handleDownloadAnnualStatement}
            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Annual Statement</span>
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {[
            { id: 'INV-2026-904', desc: 'Enterprise Platform Subscription — Oct 2026', amount: '$1,950.00', status: 'PAID', date: 'Oct 01, 2026' },
            { id: 'INV-2026-881', desc: 'Grace Community Fellowship Deal Success Fee', amount: '$4,750.00', status: 'PAID', date: 'Sep 25, 2026' },
          ].map((inv) => (
            <div key={inv.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:bg-slate-50/50 transition-colors">
              <div>
                <span className="font-bold text-slate-900 block">{inv.desc}</span>
                <span className="text-[11px] text-slate-400">{inv.id} • {inv.date}</span>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                <div className="text-left sm:text-right">
                  <span className="font-extrabold text-slate-900 block">{inv.amount}</span>
                  <span className="text-[10px] text-emerald-600 font-bold">{inv.status}</span>
                </div>
                <button
                  onClick={() => handleDownloadInvoice(inv)}
                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                  title="Download Invoice"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription Management Modal */}
      {showManageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Change Institutional Subscription Tier</h3>
              <button onClick={() => setShowManageModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Select an underwriting capacity tier to match your deal flow requirements. Tier changes take effect immediately on your next billing cycle.
            </p>

            <div className="space-y-3">
              {availableTiers.map((t, idx) => {
                const isSelected = currentTier.name === t.name;
                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectTier(t)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/60'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-slate-900 text-xs flex items-center gap-2">
                        <span>{t.name}</span>
                        {isSelected && (
                          <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{t.deals}</div>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="font-extrabold text-slate-900 text-sm font-heading">{t.price}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowManageModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

