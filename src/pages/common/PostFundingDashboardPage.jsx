import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Calendar,
  CreditCard,
  Download,
  FileCheck,
  Sparkles,
  MessageSquare,
  PhoneCall,
  Mail,
  RefreshCw,
  Building2,
  Lock,
  Check,
  X,
  AlertCircle,
  Clock,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Banknote,
  History,
  FileText,
  Sliders,
  Send,
  Eye,
  Layers,
  HelpCircle
} from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

// Mock funded facilities available for post-funding servicing
const FUNDED_FACILITIES = [
  {
    id: 'LN-2026-8801',
    applicationId: 'APP-2026-1082',
    businessName: 'Blue Harbor Seafood Bistro LLC',
    borrowerName: 'Marcus Vance',
    borrowerEmail: 'marcus@blueharborseafood.com',
    programName: 'Restaurant & Hospitality Commercial Loan',
    lenderName: 'Apex Horizon Commercial Credit Fund',
    fundedAmount: 450000,
    closingFee: 6750, // 1.5%
    netDisbursed: 443250,
    disbursementDate: '2026-10-01',
    firstPaymentDate: '2026-11-01',
    termMonths: 60,
    interestRate: 7.95, // %
    monthlyPayment: 9120.00,
    principalPaid: 24812.40,
    interestPaid: 29907.60,
    principalRemaining: 425187.60,
    paymentsCompleted: 6,
    onTimeRecord: '100% On-Time (6/6)',
    delinquencies: 0,
    wireTracking: 'FED-WIRE-99284102-OAL',
    wireImad: '20261001-B1Q8092C-002194',
    wireOmad: 'FED-WIRE-OAL-99284102-ACH',
    bankName: 'Wells Fargo Commercial Banking',
    bankAccountMask: '•••• 4192',
    bankRouting: '121000247',
    achStatus: 'ACTIVE_AUTOPAY',
    topUpPreQualifiedAmount: 200000,
    assignedRep: {
      name: 'Elena Rostova',
      title: 'Senior Commercial Placement Specialist',
      email: 'elena.rostova@oalnetwork.com',
      phone: '+1 (555) 901-8321 ext 104',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'LN-2026-7734',
    applicationId: 'APP-2026-1133',
    businessName: 'Grace Community Fellowship',
    borrowerName: 'Rev. Samuel Thorne',
    borrowerEmail: 'pastor@gracecommunitychurch.org',
    programName: 'Church & Religious Facility Expansion',
    lenderName: 'Apex Horizon Commercial Credit Fund',
    fundedAmount: 950000,
    closingFee: 14250, // 1.5%
    netDisbursed: 935750,
    disbursementDate: '2026-09-15',
    firstPaymentDate: '2026-10-15',
    termMonths: 120,
    interestRate: 6.85,
    monthlyPayment: 10960.00,
    principalPaid: 32410.00,
    interestPaid: 44310.00,
    principalRemaining: 917590.00,
    paymentsCompleted: 7,
    onTimeRecord: '100% On-Time (7/7)',
    delinquencies: 0,
    wireTracking: 'FED-WIRE-88102941-OAL',
    wireImad: '20260915-B7K9921D-004412',
    wireOmad: 'FED-WIRE-OAL-88102941-ACH',
    bankName: 'JPMorgan Chase Commercial',
    bankAccountMask: '•••• 8831',
    bankRouting: '021000021',
    achStatus: 'ACTIVE_AUTOPAY',
    topUpPreQualifiedAmount: 350000,
    assignedRep: {
      name: 'Elena Rostova',
      title: 'Senior Commercial Placement Specialist',
      email: 'elena.rostova@oalnetwork.com',
      phone: '+1 (555) 901-8321 ext 104',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    }
  }
];

export const PostFundingDashboardPage = () => {
  const { currentUser, currentRole, addToast, sendMessage, createTicket } = useApp();
  const navigate = useNavigate();

  // Selected Loan Facility
  const [selectedFacilityId, setSelectedFacilityId] = useState(FUNDED_FACILITIES[0].id);
  const facility = FUNDED_FACILITIES.find(f => f.id === selectedFacilityId) || FUNDED_FACILITIES[0];

  // Auto-Pay State
  const [autoPayEnabled, setAutoPayEnabled] = useState(true);

  // Amortization Table Tab Filter: 'all' | 'paid' | 'upcoming'
  const [amortizationFilter, setAmortizationFilter] = useState('all');
  const [scheduleViewMode, setScheduleViewMode] = useState('table'); // 'table' | 'cards'

  // Modals
  const [showWireModal, setShowWireModal] = useState(false);
  const [showPayoffModal, setShowPayoffModal] = useState(false);
  const [showAchModal, setShowAchModal] = useState(false);
  const [showCustomPaymentModal, setShowCustomPaymentModal] = useState(false);
  const [showRefinanceModal, setShowRefinanceModal] = useState(false);
  const [showMessageElenaModal, setShowMessageElenaModal] = useState(false);
  const [showScheduleCallModal, setShowScheduleCallModal] = useState(false);

  // ACH Form State
  const [achForm, setAchForm] = useState({
    bankName: facility.bankName,
    accountNumber: '•••• 4192',
    routingNumber: facility.bankRouting,
    accountType: 'Commercial Checking'
  });

  // Custom Payment Form State
  const [customPaymentAmount, setCustomPaymentAmount] = useState('15000');
  const [customPaymentType, setCustomPaymentType] = useState('PRINCIPAL_REDUCTION');

  // Refinance / Additional Capital Form State
  const [refinanceAmount, setRefinanceAmount] = useState(100000);
  const [refinanceTerm, setRefinanceTerm] = useState('36');
  const [refinancePurpose, setRefinancePurpose] = useState('Working Capital & Seasonal Inventory');
  const [refinanceSubmitted, setRefinanceSubmitted] = useState(false);

  // Message Elena Form State
  const [elenaMessageText, setElenaMessageText] = useState(
    `Hello Elena, I am reviewing our post-funding servicing records for loan facility ${facility.id}. I had a question regarding our amortized debt service and potential top-up expansion capital.`
  );

  // Call Schedule Form State
  const [callDate, setCallDate] = useState('2026-10-15');
  const [callTime, setCallTime] = useState('14:00');
  const [callTopic, setCallTopic] = useState('Quarterly Servicing Review & Refinancing Assessment');

  // Generate 60-Month Amortization Schedule Data
  const generateSchedule = () => {
    const list = [];
    let balance = facility.fundedAmount;
    const monthlyRate = (facility.interestRate / 100) / 12;
    const pmt = facility.monthlyPayment;

    for (let i = 1; i <= Math.min(24, facility.termMonths); i++) {
      const interest = Math.round(balance * monthlyRate * 100) / 100;
      const principal = Math.round((pmt - interest) * 100) / 100;
      balance = Math.max(0, Math.round((balance - principal) * 100) / 100);

      // Date calculation based on disbursement date
      const d = new Date(facility.disbursementDate);
      d.setMonth(d.getMonth() + i);
      const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

      const isPaid = i <= facility.paymentsCompleted;
      const isNext = i === facility.paymentsCompleted + 1;

      list.push({
        paymentNumber: i,
        dueDate: dateStr,
        totalPayment: pmt,
        principal,
        interest,
        remainingBalance: balance,
        status: isPaid ? 'PAID' : isNext ? 'SCHEDULED_ACH' : 'UPCOMING'
      });
    }
    return list;
  };

  const scheduleList = generateSchedule();

  const filteredSchedule = scheduleList.filter(item => {
    if (amortizationFilter === 'paid') return item.status === 'PAID';
    if (amortizationFilter === 'upcoming') return item.status !== 'PAID';
    return true;
  });

  // Calculate Payoff Quote Values
  const perDiemRate = Math.round((facility.principalRemaining * (facility.interestRate / 100) / 365) * 100) / 100;
  const accruedDays = 10;
  const accruedInterest = Math.round(perDiemRate * accruedDays * 100) / 100;
  const payoffQuoteTotal = Math.round((facility.principalRemaining + accruedInterest) * 100) / 100;

  // Handlers for File Downloads (Creates real text/blob files and triggers direct download)
  const handleDownloadWireProof = () => {
    const content = `================================================================================
OAL NETWORK - OFFICIAL FEDERAL WIRE TRANSFER DISBURSEMENT PROOF
================================================================================
FACILITY REFERENCE        : ${facility.id}
APPLICATION REFERENCE     : ${facility.applicationId}
BENEFICIARY ENTITY        : ${facility.businessName}
AUTHORIZED SIGNER         : ${facility.borrowerName}
LENDER INSTITUTION        : ${facility.lenderName}
SERVICING AGENT           : ${facility.assignedRep.name} (${facility.assignedRep.phone})
--------------------------------------------------------------------------------
WIRE EXECUTION PARTICULARS:
Gross Funded Amount       : $${facility.fundedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
OAL Origination/Closing   : -$${facility.closingFee.toLocaleString('en-US', { minimumFractionDigits: 2 })} (1.50%)
NET DISBURSED TO BORROWER : $${facility.netDisbursed.toLocaleString('en-US', { minimumFractionDigits: 2 })}
Value Date                : ${facility.disbursementDate} 10:42:18 EST
Federal IMAD              : ${facility.wireImad}
Federal OMAD              : ${facility.wireOmad}
Fedwire Tracking Number   : ${facility.wireTracking}
Depository Bank           : ${facility.bankName}
Routing Transit (ABA)     : ${facility.bankRouting}
Account Mask              : ${facility.bankAccountMask}
Fed Clearing Method       : Fedwire Funds Service (Real-Time Gross Settlement)
Federal Confirmation      : 20261001NYFEDWIRE7749102X
--------------------------------------------------------------------------------
COMPLIANCE CERTIFICATION:
This transaction has cleared all BSA/AML screenings, FinCEN Title 31 compliance,
and Patriot Act Identity Verification under OAL Network Protocol FR-11/12.
Certified by: Victoria Sterling, Chief Compliance Officer, OAL Network HQ.
================================================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `OAL_Federal_Wire_Disbursement_${facility.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    if (addToast) {
      addToast('Wire Confirmation Downloaded', `Fedwire dossier for ${facility.id} saved to your device.`, 'success');
    }
  };

  const handleDownloadPayoffStatement = () => {
    const content = `================================================================================
OAL NETWORK COMMERCIAL SERVICING - OFFICIAL 30-DAY PAYOFF DEMAND STATEMENT
================================================================================
DATE OF STATEMENT         : ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
QUOTE EXPIRATION DATE     : November 10, 2026 (5:00 PM EST)
LOAN FACILITY ID          : ${facility.id}
COMMERCIAL BORROWER       : ${facility.businessName}
ATTENTION                 : ${facility.borrowerName}
SERVICING AGENT           : ${facility.assignedRep.name}
ORIGINAL LOAN AMOUNT      : $${facility.fundedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
CURRENT OUTSTANDING PRIN  : $${facility.principalRemaining.toLocaleString('en-US', { minimumFractionDigits: 2 })}
ACCRUED INTEREST (10 Days): $${accruedInterest.toLocaleString('en-US', { minimumFractionDigits: 2 })}
PER-DIEM INTEREST RATE    : $${perDiemRate.toFixed(2)} / calendar day
PREPAYMENT PENALTY        : $0.00 (Guaranteed Zero Prepayment Penalty - OAL Charter)
LEGAL RECONVEYANCE FEE    : $125.00
--------------------------------------------------------------------------------
TOTAL 30-DAY PAYOFF QUOTE : $${(payoffQuoteTotal + 125).toLocaleString('en-US', { minimumFractionDigits: 2 })}
--------------------------------------------------------------------------------
PAYOFF WIRING INSTRUCTIONS:
Receiving Bank            : JPMorgan Chase Bank, N.A.
ABA Routing Number        : 021000021
Beneficiary Account       : 8819200192 (OAL Commercial Escrow Servicing Trust)
Reference / Memo Line     : PAYOFF FOR ${facility.id} - ${facility.businessName}
--------------------------------------------------------------------------------
LEGAL RELEASE GUARANTEE:
Upon receipt of certified collected wire funds, OAL Network and ${facility.lenderName}
shall execute and record full Release of UCC-1 Financing Statement and Satisfaction
of Commercial Promissory Note within three (3) business days.
================================================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `OAL_Certified_Payoff_Quote_${facility.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    if (addToast) {
      addToast('Payoff Statement Downloaded', `Certified 30-day payoff demand for ${facility.id} has been generated.`, 'success');
    }
  };

  const handleDownloadPaymentReceipt = (paymentNum, amount, date) => {
    const content = `================================================================================
OAL NETWORK COMMERCIAL SERVICING - PAYMENT RECEIPT & ACH VOUCHER
================================================================================
RECEIPT REFERENCE         : RCT-2026-${paymentNum.toString().padStart(4, '0')}
PAYMENT CYCLE             : Payment #${paymentNum} of ${facility.termMonths}
LOAN FACILITY ID          : ${facility.id}
BORROWER ENTITY           : ${facility.businessName}
DATE PROCESSED            : ${date}
PAYMENT METHOD            : ACH Auto-Debit (Direct Business Account)
ORIGINATING DEPOSITORY    : ${facility.bankName} (${facility.bankAccountMask})
TOTAL AMOUNT CLEARED      : $${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
TRANSACTION STATUS        : CLEARED & POSTED
SERVICING LEDGER          : 0 Delinquencies • 100% On-Time Record Maintained
================================================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `OAL_Receipt_Payment_${paymentNum}_${facility.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    if (addToast) {
      addToast('Receipt Downloaded', `Official receipt for payment #${paymentNum} saved.`, 'info');
    }
  };

  const handleExportScheduleCsv = () => {
    let csv = 'Payment Number,Due Date,Total Payment,Principal,Interest,Remaining Balance,Status\n';
    scheduleList.forEach(row => {
      csv += `${row.paymentNumber},"${row.dueDate}",${row.totalPayment.toFixed(2)},${row.principal.toFixed(2)},${row.interest.toFixed(2)},${row.remainingBalance.toFixed(2)},"${row.status}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `OAL_Amortization_Schedule_${facility.id}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    if (addToast) {
      addToast('Schedule Exported', `Full 60-month amortization ledger saved as CSV.`, 'success');
    }
  };

  const handleDownloadInterest1098 = () => {
    const content = `================================================================================
IRS FORM 1098 (SUBSTITUTE) - ANNUAL COMMERCIAL MORTGAGE/DEBT INTEREST STATEMENT
================================================================================
CALENDAR TAX YEAR         : 2026
RECIPIENT / LENDER        : ${facility.lenderName}
SERVICING AGENT           : OAL Network Commercial Servicing Trust
BORROWER TIN / EIN        : XX-XXX4912
BORROWER NAME             : ${facility.businessName}
BORROWER ADDRESS          : Commercial Facility #108, Waterfront Promenade
LOAN FACILITY REFERENCE   : ${facility.id}
--------------------------------------------------------------------------------
BOX 1 - Commercial Interest Received from Borrower  : $${facility.interestPaid.toLocaleString('en-US', { minimumFractionDigits: 2 })}
BOX 2 - Outstanding Principal Balance (as of 10/26)  : $${facility.principalRemaining.toLocaleString('en-US', { minimumFractionDigits: 2 })}
BOX 3 - Loan Origination Date                       : ${facility.disbursementDate}
BOX 4 - Refund of Overpaid Interest                 : $0.00
BOX 5 - Mortgage Insurance Premiums                 : $0.00
BOX 6 - Points Paid on Purchase of Principal Biz    : $${facility.closingFee.toLocaleString('en-US', { minimumFractionDigits: 2 })}
--------------------------------------------------------------------------------
This statement is provided for federal income tax documentation purposes.
================================================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `IRS_Form_1098_Interest_${facility.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    if (addToast) {
      addToast('Tax Statement Ready', '2026 Form 1098 Interest Statement downloaded.', 'success');
    }
  };

  // Toggle Auto-Pay
  const handleToggleAutoPay = () => {
    const nextState = !autoPayEnabled;
    setAutoPayEnabled(nextState);
    if (addToast) {
      addToast(
        nextState ? 'ACH Auto-Pay Activated' : 'ACH Auto-Pay Paused',
        nextState
          ? `Direct debit of $${facility.monthlyPayment.toLocaleString()} is active for the 1st of each month.`
          : 'Auto-Pay paused. You must make manual wire/ACH payments prior to the 5th to avoid late fees.',
        nextState ? 'success' : 'warning'
      );
    }
  };

  // Save ACH account updates
  const handleSaveAchUpdate = (e) => {
    e.preventDefault();
    setShowAchModal(false);
    if (addToast) {
      addToast(
        'Payment Method Updated',
        `ACH auto-debit account updated to ${achForm.bankName} (${achForm.accountNumber.slice(-4) ? `•••• ${achForm.accountNumber.slice(-4)}` : 'Verified Account'}).`,
        'success'
      );
    }
  };

  // Custom Extra Payment Handler
  const handleProcessCustomPayment = (e) => {
    e.preventDefault();
    setShowCustomPaymentModal(false);
    const num = Number(customPaymentAmount) || 5000;
    if (addToast) {
      addToast(
        'Payment Authorized',
        `Instant ACH debit of $${num.toLocaleString()} submitted for ${customPaymentType === 'PRINCIPAL_REDUCTION' ? 'Principal Reduction' : 'Regular Payment'}.`,
        'success'
      );
    }
  };

  // Refinance / Additional Capital Submit
  const handleApplyRefinance = (e) => {
    e.preventDefault();
    setRefinanceSubmitted(true);
    setShowRefinanceModal(false);
    if (addToast) {
      addToast(
        'Capital Expansion Requested',
        `Your application for $${refinanceAmount.toLocaleString()} top-up capital has been assigned to Elena Rostova. Fast-track underwriting is now underway.`,
        'success'
      );
    }
  };

  // Send Direct Message to Elena
  const handleSendElenaMessage = (e) => {
    e.preventDefault();
    if (!elenaMessageText.trim()) return;

    if (sendMessage) {
      sendMessage({
        conversationId: `CONV_${currentRole}_rep_${facility.applicationId}`,
        text: `[Post-Funding Servicing Facility #${facility.id}]\n${elenaMessageText}`,
        applicationId: facility.applicationId,
        receiverRole: 'rep',
        receiverId: 'usr_rep_01',
        receiverName: 'Elena Rostova (OAL Rep)'
      });
    }

    setShowMessageElenaModal(false);
    setElenaMessageText('');
    if (addToast) {
      addToast('Message Dispatched', 'Elena Rostova has received your servicing inquiry and will respond within 2 hours.', 'success');
    }
  };

  // Schedule Call Handler
  const handleScheduleCall = (e) => {
    e.preventDefault();
    setShowScheduleCallModal(false);
    if (addToast) {
      addToast(
        'Servicing Call Scheduled',
        `Confirmed 15-minute review with Elena Rostova on ${callDate} at ${callTime} EST. Calendar invitation sent to your email.`,
        'success'
      );
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* =========================================================================
          TOP HERO BANNER & FACILITY SELECTOR (Lifecycle Stage 13)
          ========================================================================= */}
      <div className="bg-gradient-to-r from-[#0B1730] via-[#102347] to-[#1E3A8A] rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden border border-slate-700/60">
        {/* Decorative lighting */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Lifecycle Stage 13: Post Funding Dashboard</span>
              </span>

              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-slate-200 border border-white/10">
                Doc 1 Mandate (Line 129)
              </span>

              <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Servicing Active
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight">
              Post-Funding Commercial Servicing Center
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Real-time monitoring of disbursed capital facilities, federal wire proof, amortization repayment schedule, ACH auto-pay ledger, certified 30-day payoff quotes, and secondary capital expansion.
            </p>
          </div>

          {/* Facility Selector Switcher & Quick Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            {/* Facility Dropdown */}
            <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-2 flex flex-col gap-1">
              <label className="text-[10px] uppercase font-bold text-slate-400 px-2 tracking-wider">
                Active Funded Facility
              </label>
              <select
                value={selectedFacilityId}
                onChange={(e) => setSelectedFacilityId(e.target.value)}
                className="bg-slate-800 text-white font-bold text-xs rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                {FUNDED_FACILITIES.map(fac => (
                  <option key={fac.id} value={fac.id}>
                    {fac.id} • {fac.businessName} (${(fac.fundedAmount / 1000).toFixed(0)}k)
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Action Button */}
            <button
              type="button"
              onClick={() => setShowPayoffModal(true)}
              className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-[#D5B66A] hover:bg-[#c4a457] text-slate-950 text-xs font-extrabold shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 whitespace-nowrap"
            >
              <FileCheck className="w-4 h-4 shrink-0" />
              <span>Get 30-Day Payoff Quote</span>
            </button>
          </div>
        </div>

        {/* Facility Micro-Status Bar */}
        <div className="relative z-10 mt-6 pt-5 border-t border-slate-700/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 text-[11px] block">Commercial Borrower:</span>
            <strong className="text-white font-bold text-sm truncate block">{facility.businessName}</strong>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] block">Servicing Lender:</span>
            <strong className="text-white font-bold text-sm truncate block">{facility.lenderName}</strong>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] block">Current Facility ID:</span>
            <strong className="text-amber-400 font-mono font-bold text-sm block">{facility.id}</strong>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] block">Payment Health Status:</span>
            <strong className="text-emerald-400 font-bold text-sm flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> {facility.onTimeRecord}
            </strong>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MODULE 1: DISBURSEMENT DETAILS & WIRE CONFIRMATION (Doc 1 Line 129)
          ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-7 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h2 className="text-lg font-heading font-extrabold text-slate-900">
                1. Disbursement & Federal Wire Transfer Particulars
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              Verified gross loan origination, closing deductions, and real-time Fedwire transit coordinates.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              type="button"
              onClick={() => setShowWireModal(true)}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap shadow-xs"
            >
              <Eye className="w-4 h-4 text-[#D5B66A] shrink-0" />
              <span>Inspect Wire Slip</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadWireProof}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap shadow-xs"
            >
              <Download className="w-4 h-4 shrink-0" />
              <span>Download Fedwire Proof</span>
            </button>
          </div>
        </div>

        {/* 4 Disbursement Metric Cards */}
        <div className="p-6 sm:p-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 bg-slate-50/50">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold uppercase tracking-wider text-[10px]">Gross Capital Approved</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              ${facility.fundedAmount.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
              <span>Underwriting Committee Approved</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold uppercase tracking-wider text-[10px]">Net Disbursed Proceeds</span>
              <Banknote className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 font-heading">
              ${facility.netDisbursed.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
              <span>Less Closing Fee:</span>
              <span className="font-semibold text-rose-600">-${facility.closingFee.toLocaleString()} (1.5%)</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold uppercase tracking-wider text-[10px]">Closing / Wire Date</span>
              <Calendar className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-heading">
              {new Date(facility.disbursementDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
            <div className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Funds Cleared & Settled
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold uppercase tracking-wider text-[10px]">Receiving Bank & Mask</span>
              <Building2 className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-lg font-extrabold text-slate-900 truncate">
              {facility.bankName.split(' ')[0]} {facility.bankAccountMask}
            </div>
            <div className="text-[11px] text-slate-500 mt-1 truncate">
              Routing ABA: <span className="font-mono font-bold text-slate-700">{facility.bankRouting}</span>
            </div>
          </div>
        </div>

        {/* Real-time Federal Wire Transit Strip */}
        <div className="p-5 sm:px-7 bg-white border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700">Fedwire Tracking IMAD:</span>
              <span className="font-mono bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 text-slate-800 font-semibold">
                {facility.wireImad}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700">Fedwire OMAD:</span>
              <span className="font-mono bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 text-slate-800 font-semibold">
                {facility.wireOmad}
              </span>
            </div>
          </div>

          <div className="text-[11px] text-slate-400">
            Certified compliant under FinCEN & USA PATRIOT Act Title 31
          </div>
        </div>
      </div>

      {/* =========================================================================
          MODULE 2 & 3: AMORTIZATION REPAYMENT TRACKER & ACH AUTO-PAY CALENDAR
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Interactive Amortization Tracker */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <h2 className="text-lg font-heading font-extrabold text-slate-900">
                  2. Amortization & Debt Servicing Schedule
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Fixed monthly debt service of <strong>${facility.monthlyPayment.toLocaleString()}</strong> over {facility.termMonths} months at {facility.interestRate}% APR.
              </p>
            </div>

            <button
              type="button"
              onClick={handleExportScheduleCsv}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <Download className="w-4 h-4 text-blue-600" />
              <span>Export CSV</span>
            </button>
          </div>

          {/* Amortization Progress Split Bar */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
              <div className="flex items-center gap-4">
                <span className="text-slate-700">
                  Principal Amortized: <strong className="text-emerald-700">${facility.principalPaid.toLocaleString()}</strong>
                </span>
                <span className="text-slate-700">
                  Interest Serviced: <strong className="text-blue-700">${facility.interestPaid.toLocaleString()}</strong>
                </span>
              </div>
              <span className="text-slate-500 font-semibold">
                Remaining Principal: <strong className="text-slate-900 font-extrabold">${facility.principalRemaining.toLocaleString()}</strong>
              </span>
            </div>

            {/* Split Progress Bar */}
            <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden flex">
              <div
                className="bg-emerald-600 h-full transition-all"
                style={{ width: `${(facility.principalPaid / facility.fundedAmount) * 100}%` }}
                title={`Principal Amortized: ${((facility.principalPaid / facility.fundedAmount) * 100).toFixed(1)}%`}
              />
              <div
                className="bg-blue-600 h-full transition-all"
                style={{ width: `${(facility.interestPaid / facility.fundedAmount) * 100}%` }}
                title={`Interest Paid: ${((facility.interestPaid / facility.fundedAmount) * 100).toFixed(1)}%`}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium pt-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" /> Principal Paid (${facility.principalPaid.toLocaleString()})
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" /> Interest Serviced (${facility.interestPaid.toLocaleString()})
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" /> {facility.termMonths - facility.paymentsCompleted} Months Remaining
              </span>
            </div>
          </div>

          {/* Table Filter Tabs & Mobile View Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 max-w-full">
              <button
                type="button"
                onClick={() => setAmortizationFilter('all')}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  amortizationFilter === 'all'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Cycles ({scheduleList.length})
              </button>
              <button
                type="button"
                onClick={() => setAmortizationFilter('paid')}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  amortizationFilter === 'paid'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Paid History ({facility.paymentsCompleted})
              </button>
              <button
                type="button"
                onClick={() => setAmortizationFilter('upcoming')}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  amortizationFilter === 'upcoming'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Upcoming Cycles ({scheduleList.length - facility.paymentsCompleted})
              </button>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3">
              <span className="text-[11px] text-slate-400 shrink-0">
                Showing first 24 cycles of {facility.termMonths}
              </span>

              {/* Mobile View Toggle */}
              <div className="flex sm:hidden items-center bg-slate-100 p-0.5 rounded-lg text-[11px] font-bold">
                <button
                  type="button"
                  onClick={() => setScheduleViewMode('table')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    scheduleViewMode === 'table' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                  }`}
                >
                  Table
                </button>
                <button
                  type="button"
                  onClick={() => setScheduleViewMode('cards')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    scheduleViewMode === 'cards' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                  }`}
                >
                  Cards
                </button>
              </div>
            </div>
          </div>

          {/* Amortization Ledger Table (Mobile Responsive with whitespace-nowrap & horizontal scroll) */}
          <div className={`${scheduleViewMode === 'cards' ? 'hidden sm:block' : 'block'} overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs`}>
            <table className="w-full text-xs text-left min-w-[640px]">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3.5 whitespace-nowrap">Cycle #</th>
                  <th className="p-3.5 whitespace-nowrap">Due Date</th>
                  <th className="p-3.5 whitespace-nowrap">Debt Service</th>
                  <th className="p-3.5 whitespace-nowrap">Principal</th>
                  <th className="p-3.5 whitespace-nowrap">Interest</th>
                  <th className="p-3.5 whitespace-nowrap">Balance</th>
                  <th className="p-3.5 whitespace-nowrap">Status</th>
                  <th className="p-3.5 text-right whitespace-nowrap">Receipt / Proof</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSchedule.map((item) => (
                  <tr
                    key={item.paymentNumber}
                    className={`transition-colors ${
                      item.status === 'PAID'
                        ? 'bg-emerald-50/30 hover:bg-emerald-50/60'
                        : item.status === 'SCHEDULED_ACH'
                        ? 'bg-blue-50/40 hover:bg-blue-50/70 font-semibold'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="p-3.5 font-bold text-slate-900 whitespace-nowrap">
                      #{item.paymentNumber.toString().padStart(2, '0')}
                    </td>
                    <td className="p-3.5 text-slate-700 whitespace-nowrap">
                      {item.dueDate}
                    </td>
                    <td className="p-3.5 font-extrabold text-slate-900 whitespace-nowrap">
                      ${item.totalPayment.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-3.5 text-emerald-700 font-medium whitespace-nowrap">
                      ${item.principal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-3.5 text-blue-700 font-medium whitespace-nowrap">
                      ${item.interest.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-3.5 font-mono text-slate-800 whitespace-nowrap">
                      ${item.remainingBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      {item.status === 'PAID' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 whitespace-nowrap shrink-0 shadow-2xs border border-emerald-200">
                          <Check className="w-3 h-3 shrink-0" />
                          <span>Paid</span>
                        </span>
                      ) : item.status === 'SCHEDULED_ACH' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 whitespace-nowrap shrink-0 shadow-2xs border border-blue-200">
                          <Clock className="w-3 h-3 shrink-0" />
                          <span>Scheduled ACH</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 whitespace-nowrap shrink-0 border border-slate-200">
                          Upcoming
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      {item.status === 'PAID' ? (
                        <button
                          type="button"
                          onClick={() => handleDownloadPaymentReceipt(item.paymentNumber, item.totalPayment, item.dueDate)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold transition-all shadow-xs inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                          title="Download payment receipt"
                        >
                          <Download className="w-3 h-3 shrink-0" />
                          <span>Receipt</span>
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic whitespace-nowrap">Pending</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Dedicated Mobile Card View (Available when Cards toggle is active) */}
          {scheduleViewMode === 'cards' && (
            <div className="sm:hidden space-y-3">
              {filteredSchedule.map((item) => (
                <div
                  key={item.paymentNumber}
                  className={`p-4 rounded-2xl border transition-all space-y-3 ${
                    item.status === 'PAID'
                      ? 'bg-emerald-50/40 border-emerald-200/90'
                      : item.status === 'SCHEDULED_ACH'
                      ? 'bg-blue-50/50 border-blue-200 shadow-xs'
                      : 'bg-slate-50/60 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-extrabold text-slate-900 bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
                        #{item.paymentNumber.toString().padStart(2, '0')}
                      </span>
                      <span className="text-xs font-bold text-slate-700">{item.dueDate}</span>
                    </div>

                    {/* Status Badge in Mobile Card */}
                    {item.status === 'PAID' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 whitespace-nowrap shrink-0">
                        <Check className="w-3 h-3 shrink-0" /> Paid
                      </span>
                    ) : item.status === 'SCHEDULED_ACH' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 whitespace-nowrap shrink-0">
                        <Clock className="w-3 h-3 shrink-0" /> Scheduled ACH
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-slate-200 text-slate-600 whitespace-nowrap shrink-0">
                        Upcoming
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-white/80 p-2.5 rounded-xl border border-slate-200/70">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-semibold">Debt Service</span>
                      <strong className="text-slate-900 font-extrabold text-sm">
                        ${item.totalPayment.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-semibold">Remaining Balance</span>
                      <strong className="text-slate-800 font-mono text-xs">
                        ${item.remainingBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </strong>
                    </div>
                    <div className="pt-1 border-t border-slate-100">
                      <span className="text-[10px] text-slate-400 block">Principal</span>
                      <span className="text-emerald-700 font-bold">
                        ${item.principal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="pt-1 border-t border-slate-100">
                      <span className="text-[10px] text-slate-400 block">Interest</span>
                      <span className="text-blue-700 font-bold">
                        ${item.interest.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  {/* Status & Proof Action Section in Mobile Card */}
                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-200/60">
                    <span className="text-[11px] text-slate-500 font-medium">Receipt / Proof:</span>
                    {item.status === 'PAID' ? (
                      <button
                        type="button"
                        onClick={() => handleDownloadPaymentReceipt(item.paymentNumber, item.totalPayment, item.dueDate)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs inline-flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                      >
                        <Download className="w-3.5 h-3.5 shrink-0" />
                        <span>Download Receipt</span>
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400 italic">Pending Clearance</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right 1 Col: Module 3 - Payment Due Calendar & Auto-Pay ACH */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                <h2 className="text-base font-heading font-extrabold text-slate-900">
                  3. Auto-Pay (ACH) Manager
                </h2>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                Direct Debit
              </span>
            </div>

            {/* Next Payment Hero Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-[#102347] text-white space-y-4 shadow-md">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="uppercase tracking-wider font-semibold text-[10px]">Next Due Date</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 text-[10px]">
                  Due in 21 Days
                </span>
              </div>

              <div>
                <div className="text-xl font-heading font-bold text-slate-200">
                  {new Date(facility.firstPaymentDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
                <div className="text-3xl font-extrabold text-white mt-1 font-heading">
                  ${facility.monthlyPayment.toLocaleString()}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs text-slate-300">
                <div>
                  <span className="text-[10px] text-slate-400 block">Principal:</span>
                  <strong className="text-white font-bold">$4,196.80</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Interest:</span>
                  <strong className="text-white font-bold">$4,923.20</strong>
                </div>
              </div>
            </div>

            {/* Auto-Pay Toggle Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <strong className="text-xs text-slate-900 block">Automated ACH Direct Debit</strong>
                  <span className="text-[11px] text-slate-500">Scheduled on the 1st of each month</span>
                </div>

                <button
                  type="button"
                  onClick={handleToggleAutoPay}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                    autoPayEnabled ? 'bg-emerald-600' : 'bg-slate-300'
                  }`}
                  title="Toggle ACH Auto-Pay"
                >
                  <span
                    className={`w-5 h-5 rounded-full bg-white shadow-md block transform transition-transform ${
                      autoPayEnabled ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              <div className="text-xs text-slate-600 border-t border-slate-200 pt-3 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Account:</span>
                  <strong className="text-slate-800">{achForm.bankName}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Account Mask:</span>
                  <strong className="text-slate-800 font-mono">{achForm.accountNumber}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Routing Number:</span>
                  <strong className="text-slate-800 font-mono">{achForm.routingNumber}</strong>
                </div>
              </div>
            </div>

            {/* Action Buttons for ACH & Custom Payments */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => setShowAchModal(true)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <CreditCard className="w-4 h-4 text-[#D5B66A]" />
                <span>Update ACH Account / Routing</span>
              </button>

              <button
                type="button"
                onClick={() => setShowCustomPaymentModal(true)}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <DollarSign className="w-4 h-4" />
                <span>Make Extra Principal Payment</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadInterest1098}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-slate-500" />
                <span>Download 2026 Form 1098 Interest</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MODULE 4 & 5: PAYOFF STATEMENT GENERATOR & TOP-UP EXPANSION REQUEST
          ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Module 4: Certified Payoff Statement & Balance Generator */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              <h2 className="text-base font-heading font-extrabold text-slate-900">
                4. Payoff Statement & Balance Generator
              </h2>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              0% Prepay Penalty
            </span>
          </div>

          <p className="text-xs text-slate-500">
            Generate an official 30-day payoff demand quotation with legal lien reconveyance guarantee.
          </p>

          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-emerald-100">
              <span className="text-slate-600">Current Outstanding Principal:</span>
              <strong className="text-slate-900 font-extrabold text-sm">
                ${facility.principalRemaining.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </strong>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-emerald-100">
              <span className="text-slate-600">Per-Diem Interest Accrual:</span>
              <strong className="text-slate-800 font-semibold">${perDiemRate.toFixed(2)} / calendar day</strong>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-emerald-100">
              <span className="text-slate-600">Accrued Unbilled Interest (10 Days):</span>
              <strong className="text-slate-800 font-semibold">${accruedInterest.toFixed(2)}</strong>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-emerald-100">
              <span className="text-slate-600">Prepayment Penalty Fee:</span>
              <strong className="text-emerald-700 font-bold">$0.00 (Zero Penalty Guarantee)</strong>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-emerald-900 font-bold text-sm">Total 30-Day Payoff Demand:</span>
              <strong className="text-emerald-950 font-black text-lg">
                ${(payoffQuoteTotal + 125).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </strong>
            </div>
            <div className="text-[10px] text-slate-400 text-right">
              Quote valid through November 10, 2026 (Includes $125 statutory reconveyance recording fee)
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowPayoffModal(true)}
              className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Eye className="w-4 h-4 text-[#D5B66A] shrink-0" />
              <span>Preview Legal Letter</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPayoffStatement}
              className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Download className="w-4 h-4 shrink-0" />
              <span>Download Payoff Letter</span>
            </button>
          </div>
        </div>

        {/* Module 5: Refinancing & Additional Capital Request */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <h2 className="text-base font-heading font-extrabold text-slate-900">
                5. Refinancing & Additional Capital Request
              </h2>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-600" /> Pre-Qualified
            </span>
          </div>

          <p className="text-xs text-slate-500">
            Based on your <strong>100% on-time repayment history</strong> across {facility.paymentsCompleted} consecutive months, you are eligible for fast-track secondary growth capital without full tax re-underwriting.
          </p>

          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-amber-950 font-bold">Fast-Track Capital Pre-Approval:</span>
              <strong className="text-amber-900 font-extrabold text-base">
                Up to ${facility.topUpPreQualifiedAmount.toLocaleString()}
              </strong>
            </div>

            <p className="text-amber-900 text-[11px] leading-relaxed">
              No new financial statement uploads required. Funds wired directly to your designated commercial checking account within 48 hours of promissory execution.
            </p>

            <div className="flex items-center gap-2 pt-1 text-[11px] text-amber-950 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Investment IQ 154/180 Preserved • Zero Origination Penalty</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowRefinanceModal(true)}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 text-[#D5B66A] shrink-0" />
              <span>Apply for Top-Up Capital Expansion</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MODULE 6: ASSIGNED SERVICING PLACEMENT AGENT (Elena Rostova)
          ========================================================================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <h2 className="text-lg font-heading font-extrabold text-slate-900">
                6. Dedicated Placement Agent & Post-Funding Servicing Desk
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Direct assistance with loan payoff, facility modifications, ACH disputes, and portfolio expansion.
            </p>
          </div>

          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 self-start sm:self-auto">
            Guaranteed Response: &lt; 2 Business Hours
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-4">
            <img
              src={facility.assignedRep.avatar}
              alt={facility.assignedRep.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-600 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  {facility.assignedRep.name}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Assigned Servicer
                </span>
              </div>
              <div className="text-xs text-blue-600 font-semibold">{facility.assignedRep.title}</div>
              <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" /> {facility.assignedRep.email}
                </span>
                <span className="flex items-center gap-1">
                  <PhoneCall className="w-3.5 h-3.5 text-slate-400" /> {facility.assignedRep.phone}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <button
              type="button"
              onClick={() => setShowMessageElenaModal(true)}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              <span>Direct Message Elena</span>
            </button>

            <button
              type="button"
              onClick={() => setShowScheduleCallModal(true)}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Calendar className="w-4 h-4 text-[#D5B66A] shrink-0" />
              <span>Schedule Servicing Call</span>
            </button>

            <a
              href={`mailto:${facility.assignedRep.email}?subject=Post-Funding%20Servicing%20Loan%20${facility.id}`}
              className="p-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition-colors shrink-0 flex items-center justify-center"
              title="Open Default Email Client"
            >
              <ExternalLink className="w-4 h-4 shrink-0" />
            </a>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MODAL 1: FEDERAL WIRE CONFIRMATION SLIP MODAL
          ========================================================================= */}
      {showWireModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Federal Wire Transfer Clearance Dossier
                  </span>
                </div>
                <h3 className="text-lg font-heading font-extrabold text-[#0B1730]">
                  Official Wire Transit Proof: Facility #{facility.id}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowWireModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Wire Slip Content */}
            <div className="p-5 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-xs space-y-2.5 border border-slate-800">
              <div className="text-slate-400 border-b border-slate-800 pb-2 flex justify-between">
                <span>FEDWIRE REAL-TIME GROSS SETTLEMENT</span>
                <span>STATUS: SETTLED</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div><span className="text-slate-400">BENEFICIARY:</span> {facility.businessName}</div>
                <div><span className="text-slate-400">BORROWER REP:</span> {facility.borrowerName}</div>
                <div><span className="text-slate-400">LENDER:</span> {facility.lenderName}</div>
                <div><span className="text-slate-400">NET DISBURSED:</span> ${facility.netDisbursed.toLocaleString()}</div>
                <div><span className="text-slate-400">VALUE DATE:</span> {facility.disbursementDate}</div>
                <div><span className="text-slate-400">FED TRACKING:</span> {facility.wireTracking}</div>
                <div><span className="text-slate-400">IMAD NUMBER:</span> {facility.wireImad}</div>
                <div><span className="text-slate-400">OMAD NUMBER:</span> {facility.wireOmad}</div>
                <div><span className="text-slate-400">RECEIVING BANK:</span> {facility.bankName}</div>
                <div><span className="text-slate-400">ABA ROUTING:</span> {facility.bankRouting}</div>
                <div><span className="text-slate-400">ACCOUNT MASK:</span> {facility.bankAccountMask}</div>
                <div><span className="text-slate-400">CLEARING CODE:</span> RTGS-20261001-OAL</div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowWireModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
              >
                Close View
              </button>
              <button
                type="button"
                onClick={handleDownloadWireProof}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Certified Slip</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: 30-DAY PAYOFF QUOTE PREVIEW MODAL
          ========================================================================= */}
      {showPayoffModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Certified 30-Day Payoff Demand Letter
                </span>
                <h3 className="text-lg font-heading font-extrabold text-[#0B1730]">
                  Official Payoff Quote: Facility #{facility.id}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPayoffModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Letterhead Preview */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-4 font-sans text-slate-800">
              <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
                <div>
                  <strong className="text-sm font-bold text-slate-900 block font-heading">OAL NETWORK SERVICING TRUST</strong>
                  <span className="text-[11px] text-slate-500">Commercial Credit Administration & Reconveyance</span>
                </div>
                <div className="text-right text-[11px] text-slate-400">
                  Date: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </div>

              <div className="space-y-1">
                <div><strong>To:</strong> {facility.businessName} (Attn: {facility.borrowerName})</div>
                <div><strong>Facility ID:</strong> {facility.id} (Promissory Note dated {facility.disbursementDate})</div>
                <div><strong>Lender of Record:</strong> {facility.lenderName}</div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                <div className="flex justify-between">
                  <span>Current Outstanding Principal:</span>
                  <strong>${facility.principalRemaining.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Per-Diem Interest (10 days accrued):</span>
                  <strong>${accruedInterest.toFixed(2)} (${perDiemRate.toFixed(2)}/day)</strong>
                </div>
                <div className="flex justify-between">
                  <span>Prepayment Penalty:</span>
                  <strong className="text-emerald-700">$0.00 (Guaranteed Zero Penalty)</strong>
                </div>
                <div className="flex justify-between">
                  <span>Statutory UCC Reconveyance / Release Fee:</span>
                  <strong>$125.00</strong>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-bold text-emerald-900">
                  <span>Total Payoff Amount:</span>
                  <strong>${(payoffQuoteTotal + 125).toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed">
                Quote is legally guaranteed through November 10, 2026. Upon receipt of wire payoff funds, full UCC-1 Termination Statements and Promissory Note release documents will be filed with the Secretary of State within 3 business days.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowPayoffModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
              >
                Close Preview
              </button>
              <button
                type="button"
                onClick={handleDownloadPayoffStatement}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Certified Letter</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 3: UPDATE ACH PAYMENT METHOD MODAL
          ========================================================================= */}
      {showAchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  ACH Direct Debit Setup
                </span>
                <h3 className="text-lg font-heading font-extrabold text-[#0B1730]">
                  Update Payment Method for {facility.id}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAchModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveAchUpdate} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Commercial Depository Bank Name</label>
                <input
                  type="text"
                  required
                  value={achForm.bankName}
                  onChange={(e) => setAchForm({ ...achForm, bankName: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 font-medium"
                  placeholder="e.g. Wells Fargo Commercial Banking"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">ABA Routing Number (9 Digits)</label>
                  <input
                    type="text"
                    required
                    maxLength={9}
                    value={achForm.routingNumber}
                    onChange={(e) => setAchForm({ ...achForm, routingNumber: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 font-mono font-medium"
                    placeholder="121000247"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Account Number</label>
                  <input
                    type="text"
                    required
                    value={achForm.accountNumber}
                    onChange={(e) => setAchForm({ ...achForm, accountNumber: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 font-mono font-medium"
                    placeholder="4192881029"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Account Classification</label>
                <select
                  value={achForm.accountType}
                  onChange={(e) => setAchForm({ ...achForm, accountType: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 font-medium cursor-pointer"
                >
                  <option value="Commercial Checking">Commercial Checking (Standard)</option>
                  <option value="Commercial Savings / Money Market">Commercial Savings / Money Market</option>
                  <option value="Operating Escrow Account">Operating Escrow Account</option>
                </select>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 leading-relaxed">
                By clicking Update, you authorize OAL Commercial Servicing Trust to initiate automated debit entries of ${facility.monthlyPayment.toLocaleString()} on the 1st of each month.
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAchModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md cursor-pointer"
                >
                  Save & Validate Bank
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 4: CUSTOM / PRINCIPAL EXTRA PAYMENT MODAL
          ========================================================================= */}
      {showCustomPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Instant ACH Principal Payment
                </span>
                <h3 className="text-lg font-heading font-extrabold text-[#0B1730]">
                  Make Additional Debt Service Payment
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCustomPaymentModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleProcessCustomPayment} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Payment Application Category</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCustomPaymentType('PRINCIPAL_REDUCTION')}
                    className={`p-3 rounded-xl border text-left font-bold transition-all cursor-pointer ${
                      customPaymentType === 'PRINCIPAL_REDUCTION'
                        ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Direct Principal Curtailment
                    <span className="block text-[10px] font-normal text-slate-500 mt-0.5">Directly lowers debt balance</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCustomPaymentType('REGULAR_DEBT_SERVICE')}
                    className={`p-3 rounded-xl border text-left font-bold transition-all cursor-pointer ${
                      customPaymentType === 'REGULAR_DEBT_SERVICE'
                        ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Regular Installment
                    <span className="block text-[10px] font-normal text-slate-500 mt-0.5">Covers upcoming cycle early</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Payment Amount ($ USD)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-slate-400 font-bold">$</span>
                  <input
                    type="number"
                    required
                    min={100}
                    max={facility.principalRemaining}
                    value={customPaymentAmount}
                    onChange={(e) => setCustomPaymentAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 font-extrabold text-sm"
                  />
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
                <div className="flex justify-between">
                  <span>Debited Account:</span>
                  <strong>{facility.bankName} ({facility.bankAccountMask})</strong>
                </div>
                <div className="flex justify-between">
                  <span>Current Outstanding Balance:</span>
                  <strong>${facility.principalRemaining.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between text-emerald-700 font-bold border-t border-slate-200 pt-1">
                  <span>Projected Balance Post-Payment:</span>
                  <strong>${Math.max(0, facility.principalRemaining - (Number(customPaymentAmount) || 0)).toLocaleString()}</strong>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCustomPaymentModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md cursor-pointer"
                >
                  Authorize ACH Debit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 5: REFINANCE & TOP-UP CAPITAL MODAL
          ========================================================================= */}
      {showRefinanceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 flex items-center gap-1 w-max">
                  <Sparkles className="w-3 h-3 text-amber-600" /> Fast-Track Pre-Approved
                </span>
                <h3 className="text-lg font-heading font-extrabold text-[#0B1730]">
                  Apply for Top-Up Growth Capital
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowRefinanceModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleApplyRefinance} className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-bold text-slate-700">Requested Capital Amount</label>
                  <strong className="text-blue-700 font-extrabold text-sm">
                    ${refinanceAmount.toLocaleString()}
                  </strong>
                </div>
                <input
                  type="range"
                  min={25000}
                  max={facility.topUpPreQualifiedAmount}
                  step={5000}
                  value={refinanceAmount}
                  onChange={(e) => setRefinanceAmount(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>Min: $25,000</span>
                  <span>Max Pre-Qualified: ${facility.topUpPreQualifiedAmount.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Repayment Term</label>
                <select
                  value={refinanceTerm}
                  onChange={(e) => setRefinanceTerm(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 font-medium cursor-pointer"
                >
                  <option value="24">24 Months (2 Years)</option>
                  <option value="36">36 Months (3 Years - Recommended)</option>
                  <option value="48">48 Months (4 Years)</option>
                  <option value="60">60 Months (5 Years)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Intended Purpose of Growth Funds</label>
                <select
                  value={refinancePurpose}
                  onChange={(e) => setRefinancePurpose(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 font-medium cursor-pointer"
                >
                  <option value="Working Capital & Seasonal Inventory">Working Capital & Seasonal Inventory</option>
                  <option value="Commercial Equipment Acquisition">Commercial Equipment Acquisition</option>
                  <option value="Facility Physical Expansion / Remodel">Facility Physical Expansion / Remodel</option>
                  <option value="Hiring & Staff Expansion">Hiring & Staff Expansion</option>
                  <option value="Marketing & Customer Acquisition">Marketing & Customer Acquisition</option>
                </select>
              </div>

              <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-200 text-[11px] text-blue-950 space-y-1.5">
                <div className="flex justify-between font-semibold">
                  <span>Estimated Additional Monthly Service:</span>
                  <strong className="text-blue-900 text-xs">
                    ~${Math.round((refinanceAmount / Number(refinanceTerm)) * 1.08).toLocaleString()} / mo
                  </strong>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Underwriting Process:</span>
                  <strong className="text-emerald-700">Expedited 48-Hour Wire (No New Tax Returns)</strong>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRefinanceModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md cursor-pointer"
                >
                  Submit Pre-Approved Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 6: DIRECT MESSAGE ELENA ROSTOVA MODAL
          ========================================================================= */}
      {showMessageElenaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src={facility.assignedRep.avatar}
                  alt={facility.assignedRep.name}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-xs"
                />
                <div>
                  <h3 className="text-base font-heading font-extrabold text-[#0B1730]">
                    Message {facility.assignedRep.name}
                  </h3>
                  <div className="text-xs text-blue-600 font-medium">Re: Facility #{facility.id}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowMessageElenaModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendElenaMessage} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Servicing Inquiry Message</label>
                <textarea
                  required
                  rows={5}
                  value={elenaMessageText}
                  onChange={(e) => setElenaMessageText(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 font-medium leading-relaxed"
                  placeholder="Type your message to Elena regarding amortization, payoff, or additional funding..."
                />
              </div>

              <div className="text-[11px] text-slate-400">
                Messages are mediated via OAL Network Brokerage Services and delivered directly to Elena's communications hub.
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowMessageElenaModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 7: SCHEDULE SERVICING CALL MODAL
          ========================================================================= */}
      {showScheduleCallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  15-Min Portfolio Review
                </span>
                <h3 className="text-lg font-heading font-extrabold text-[#0B1730]">
                  Schedule Servicing Call with Elena
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowScheduleCallModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleScheduleCall} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={callDate}
                    onChange={(e) => setCallDate(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 font-medium cursor-pointer"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Preferred Time (EST)</label>
                  <select
                    value={callTime}
                    onChange={(e) => setCallTime(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 font-medium cursor-pointer"
                  >
                    <option value="10:00">10:00 AM EST</option>
                    <option value="11:30">11:30 AM EST</option>
                    <option value="14:00">02:00 PM EST</option>
                    <option value="15:30">03:30 PM EST</option>
                    <option value="17:00">05:00 PM EST</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Primary Review Topic</label>
                <select
                  value={callTopic}
                  onChange={(e) => setCallTopic(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600 font-medium cursor-pointer"
                >
                  <option value="Quarterly Servicing Review & Refinancing Assessment">
                    Quarterly Servicing Review & Refinancing Assessment
                  </option>
                  <option value="Payoff Statement & Lien Release Assistance">
                    Payoff Statement & Lien Release Assistance
                  </option>
                  <option value="ACH Payment Adjustment or Banking Change">
                    ACH Payment Adjustment or Banking Change
                  </option>
                  <option value="Second Facility Origination Inquiry">
                    Second Facility Origination Inquiry
                  </option>
                </select>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500">
                You will receive a Google Meet video conference link and calendar invite at <strong>{facility.borrowerEmail}</strong>.
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowScheduleCallModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md cursor-pointer"
                >
                  Confirm Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
