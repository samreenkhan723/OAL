import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HeartHandshake,
  ShieldCheck,
  Award,
  DollarSign,
  TrendingUp,
  Users,
  CheckCircle2,
  Copy,
  Check,
  Send,
  Building,
  Mail,
  Phone,
  FileText,
  Clock,
  Sparkles,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { VerifyBadge } from '../../components/common/VerifyBadge';

export const IsoProgramPage = () => {
  const { addToast } = useApp();
  const [partnerRegistered, setPartnerRegistered] = useState(true); // default preview mode
  const [copiedLink, setCopiedLink] = useState(false);

  // ISO Registration form
  const [isoForm, setIsoForm] = useState({
    agencyName: '',
    primaryContact: '',
    email: '',
    phone: '',
    brokerType: 'Independent Loan Broker',
    expectedMonthlyVolume: '$500,000 - $2,000,000'
  });

  // Client lead submission modal/state
  const [showSubmitLead, setShowSubmitLead] = useState(false);
  const [leadForm, setLeadForm] = useState({
    borrowerName: '',
    companyName: '',
    program: 'Restaurant Loans',
    loanAmount: '250000',
    email: '',
    phone: '',
    notes: ''
  });

  // Mock ISO Referred Files
  const [referredDeals, setReferredDeals] = useState([
    {
      id: 'ISO-DEAL-01',
      client: 'Blue Horizon Logistics LLC',
      program: 'General Freight & Trucking',
      amount: '$450,000',
      status: 'WORKING DEAL (2 of 3)',
      commissionEst: '$4,500',
      payoutStatus: 'Pending Underwriting',
      date: '2026-10-04'
    },
    {
      id: 'ISO-DEAL-02',
      client: 'Savor Bistro Group',
      program: 'Restaurant Financing',
      amount: '$275,000',
      status: 'FUNDED',
      commissionEst: '$3,250',
      payoutStatus: 'PAID',
      date: '2026-09-28'
    },
    {
      id: 'ISO-DEAL-03',
      client: 'Crestview Dental Partners',
      program: 'Dental Practice Financing',
      amount: '$650,000',
      status: 'OFFER ACCEPTED',
      commissionEst: '$6,500',
      payoutStatus: 'Scheduled at Closing',
      date: '2026-10-08'
    }
  ]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://oalnetwork.com/apply?ref=ISO-PARTNER-8849');
    setCopiedLink(true);
    addToast('Partner Link Copied', 'Your unique ISO tracking link was copied to clipboard.', 'success');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    if (!leadForm.borrowerName || !leadForm.companyName) return;

    const newDeal = {
      id: `ISO-DEAL-0${referredDeals.length + 1}`,
      client: leadForm.companyName,
      program: leadForm.program,
      amount: `$${Number(leadForm.loanAmount).toLocaleString()}`,
      status: 'INTAKE REVIEW',
      commissionEst: `$${(Number(leadForm.loanAmount) * 0.01).toFixed(0)}`,
      payoutStatus: 'Pending Intake',
      date: new Date().toISOString().split('T')[0]
    };

    setReferredDeals([newDeal, ...referredDeals]);
    setShowSubmitLead(false);
    setLeadForm({ borrowerName: '', companyName: '', program: 'Restaurant Loans', loanAmount: '250000', email: '', phone: '', notes: '' });
    addToast('File Submitted', 'Commercial borrower lead submitted to OAL underwriting queue.', 'success');
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#001744] via-[#002060] to-[#0070C0] text-white pt-16 pb-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00B0F0]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#FFD200]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#00B0F0]/30 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#FFD200] animate-pulse" />
            <span className="text-xs font-bold text-[#FFD200] uppercase tracking-wider">
              Broker &amp; Partner Network
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-white leading-tight">
            ISO Program for Partners &amp; Referrals
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl mx-auto">
            The premier institutional placement desk for Independent Sales Organizations (ISOs), loan brokers, accountants, and commercial advisors.
          </p>
        </div>
      </section>

      {/* Main Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Value Proposition Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0070C0] flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5 text-[#00B0F0]" />
            </div>
            <h3 className="text-base font-bold text-[#002060]">Aggressive ISO Splits</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Transparent commission terms on every completed wire. Point tracking with automated ledger reporting and same-day closing disbursement.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="text-base font-bold text-[#002060]">File Protection &amp; Mediation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your borrower clients are protected from open lead blasting. Licensed OAL Representatives supervise all lender interactions under Rule FR-09.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#002060] flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5 text-[#0070C0]" />
            </div>
            <h3 className="text-base font-bold text-[#002060]">Fast 24–72 Hr Decisions</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Standardized 180-point Investment IQ intake accelerates underwriter review, delivering multiple binding terms without repetitive credit pulls.
            </p>
          </div>
        </div>

        {/* Simulated ISO Partner Portal Experience */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
          
          {/* ISO Portal Top Bar */}
          <div className="bg-gradient-to-r from-[#002060] to-[#0070C0] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#FFD200] text-[#002060] uppercase tracking-wider">
                  Active ISO Portal
                </span>
                <span className="text-xs text-slate-300 font-mono">ID: ISO-PARTNER-8849</span>
              </div>
              <h2 className="text-xl font-heading font-bold text-white">
                Apex Capital Advisory Partners (Verified Broker Member)
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#FFD200]" />}
                <span>{copiedLink ? 'Link Copied!' : 'Copy Referral Link'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowSubmitLead(true)}
                className="px-5 py-2.5 rounded-xl bg-[#FFD200] hover:bg-[#F5C500] text-[#002060] text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Submit Client Deal</span>
              </button>
            </div>
          </div>

          {/* Performance Stats */}
          <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/50 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Total Referred Deals</span>
              <div className="text-2xl font-extrabold text-[#002060] font-heading">{referredDeals.length} Files</div>
              <span className="text-[11px] text-emerald-600 font-semibold">100% On-Time Processing</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Total Funded Volume</span>
              <div className="text-2xl font-extrabold text-[#0070C0] font-heading">$1,375,000</div>
              <span className="text-[11px] text-slate-500">Across 8 programs</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Commissions Paid</span>
              <div className="text-2xl font-extrabold text-emerald-600 font-heading">$3,250</div>
              <span className="text-[11px] text-slate-500">Direct wire to account</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Pending Commissions</span>
              <div className="text-2xl font-extrabold text-amber-600 font-heading">$11,000</div>
              <span className="text-[11px] text-slate-500">In closing or review</span>
            </div>
          </div>

          {/* Referred Files Table */}
          <div className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#002060]">
                Active Client Submissions Ledger
              </h3>
              <span className="text-xs text-slate-500">Live Underwriting Sync</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-semibold text-[11px] uppercase">
                    <th className="pb-3">Deal ID</th>
                    <th className="pb-3">Borrower / Client</th>
                    <th className="pb-3">Program</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Marketplace Status</th>
                    <th className="pb-3">Est. Commission</th>
                    <th className="pb-3">Payout Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {referredDeals.map((deal) => (
                    <tr key={deal.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 font-mono text-slate-500">{deal.id}</td>
                      <td className="py-3.5 font-bold text-[#002060]">{deal.client}</td>
                      <td className="py-3.5 text-slate-600">{deal.program}</td>
                      <td className="py-3.5 font-bold text-slate-900">{deal.amount}</td>
                      <td className="py-3.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          deal.status.includes('FUNDED')
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : deal.status.includes('WORKING')
                            ? 'bg-amber-50 text-amber-800 border border-amber-300'
                            : 'bg-sky-50 text-[#0070C0] border border-sky-200'
                        }`}>
                          {deal.status}
                        </span>
                      </td>
                      <td className="py-3.5 font-bold text-emerald-600">{deal.commissionEst}</td>
                      <td className="py-3.5">
                        <span className={`text-[11px] font-semibold ${
                          deal.payoutStatus === 'PAID' ? 'text-emerald-700' : 'text-slate-500'
                        }`}>
                          {deal.payoutStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

      {/* Submit Client Deal Modal */}
      {showSubmitLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-[#002060]">Submit Client Loan File</h3>
                <p className="text-xs text-slate-500">File will be routed to an assigned OAL Representative for intake.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowSubmitLead(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Company / Entity Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Freight Logistics"
                    value={leadForm.companyName}
                    onChange={(e) => setLeadForm({ ...leadForm, companyName: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0070C0]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Borrower Contact Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={leadForm.borrowerName}
                    onChange={(e) => setLeadForm({ ...leadForm, borrowerName: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0070C0]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Loan Program</label>
                  <select
                    value={leadForm.program}
                    onChange={(e) => setLeadForm({ ...leadForm, program: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-[#0070C0]"
                  >
                    <option value="Restaurant Financing">Restaurant Loans</option>
                    <option value="Food Truck Funding">Food Truck Loans</option>
                    <option value="Buy A Franchise">Buy A Franchise</option>
                    <option value="Dental Practice Financing">Dental Practice Financing</option>
                    <option value="General Freight & Trucking">General Freight &amp; Trucking</option>
                    <option value="Hotels / Motels / Airbnb">Hotels / Motels / Airbnb</option>
                    <option value="Church Loans">Church Loans</option>
                    <option value="Fix & Flip Loans">Fix &amp; Flip Loans</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Requested Loan Amount ($)</label>
                  <input
                    type="number"
                    required
                    value={leadForm.loanAmount}
                    onChange={(e) => setLeadForm({ ...leadForm, loanAmount: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0070C0]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Borrower Email</label>
                  <input
                    type="email"
                    placeholder="client@company.com"
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0070C0]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Borrower Phone</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0070C0]"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowSubmitLead(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0070C0] hover:bg-[#002060] text-white text-xs font-bold rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-[#FFD200]" />
                  <span>Submit File to Exchange</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
