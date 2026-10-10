import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LifeBuoy,
  Search,
  BookOpen,
  HelpCircle,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Send,
  Plus,
  GraduationCap,
  FileText,
  ShieldCheck,
  Lock,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { VerifyBadge } from '../../components/common/VerifyBadge';

export const PublicHelpDeskPage = ({ initialTab = 'kb' }) => {
  const { kbArticles, createTicket } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentParam = searchParams.get('tab') || initialTab || 'kb';
  const [activeTab, setActiveTab] = useState(currentParam);

  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(0);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: 'Loan Application Assistance',
    priority: 'Normal',
    message: ''
  });

  const navTabs = [
    { id: 'kb', label: 'Knowledge Base' },
    { id: 'academy', label: 'Academy' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'training', label: 'Training' },
    { id: 'definitions', label: 'Definitions' },
    { id: 'resources', label: 'Resources' },
    { id: 'privacy', label: 'Privacy & Security' },
    { id: 'terms', label: 'Terms of Service' }
  ];

  const scrollToSection = (id) => {
    setActiveTab(id);
    setSearchParams({ tab: id }, { replace: true });
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const target = searchParams.get('tab') || initialTab;
    if (target) {
      setActiveTab(target);
      const timer = setTimeout(() => {
        const el = document.getElementById(target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [searchParams, initialTab]);

  const faqs = [
    {
      q: 'How does the 3-lender Working Deal limit protect my commercial loan application?',
      a: 'Under Rule FR-08, OAL Network restricts concurrent underwriting to a maximum of 3 eligible institutional lenders. This prevents an open bidding circus, eliminates redundant credit pulls, and ensures that underwriters dedicate serious diligence rather than issuing shallow preliminary term sheets.'
    },
    {
      q: 'Why are all borrower communications mediated by an OAL Representative?',
      a: 'Per Rule FR-09 and explicit client requirements, direct borrower-to-lender contact is prohibited during initial evaluation. Your licensed OAL Representative manages all communications, ensuring clear audit histories, preventing high-pressure lending tactics, and safeguarding your private contact information until an offer is formally accepted.'
    },
    {
      q: 'What is the 180-point Investment IQ and does a high score guarantee funding?',
      a: 'The 180-point Investment IQ is an objective underwriting readiness metric evaluated across Credit History (70 pts), Cash Flow & DSCR (50 pts), Collateral (30 pts), Business Plan (20 pts), and Risk Assessment (10 pts). While scores of 140+ signify institutional credit quality, final funding is contingent on verification of tax returns, bank statements, and title/lien diligence.'
    },
    {
      q: 'What are the Patriot Act and Account Opening requirements?',
      a: 'Under federal anti-money laundering (AML) and counter-terrorism financing regulations, all financial institutions must obtain, verify, and record information that identifies each individual and entity opening an account. This requires legal name, business EIN, contact verification, and multi-factor authentication (MFA).'
    },
    {
      q: 'How do the 24–72 hour approvals work for Freight and Fix & Flip programs?',
      a: 'Standardized digital intake and instant bank verification enable participating asset-based lenders to review Class 8 truck titles, freight brokerage contracts, or real estate Purchase & Sale Agreements in as fast as 2 to 24 hours, with typical closing disbursal within 24–72 hours.'
    },
    {
      q: 'What is the difference between Good and Bad Credit loan categories?',
      a: 'OAL Network features programs specifically designated for GOOD & BAD CREDIT (such as Restaurants, Food Trucks, General Freight, and Fix & Flip). In these categories, lenders place primary weight on verified operational revenue, daily bank balances, and asset collateral rather than FICO score alone.'
    }
  ];

  const definitions = [
    {
      term: '180-Point Investment IQ™',
      def: 'The standardized commercial borrower scoring model developed by OAL Network, aggregating Credit (70), Cash Flow (50), Collateral (30), Business Plan (20), and Risk (10) into an objective score out of 180.'
    },
    {
      term: 'Working Deal (Rule FR-08)',
      def: 'A deal file claimed by an institutional lender for active underwriting review. Under Rule FR-08, a maximum of 3 concurrent lenders may claim a file simultaneously.'
    },
    {
      term: 'Mediated Brokerage (Rule FR-09)',
      def: 'The supervisory protocol where all communications, questions, and offer revisions between borrowers and lenders are mediated through an assigned OAL Representative.'
    },
    {
      term: 'DSCR (Debt-Service Coverage Ratio)',
      def: 'A core commercial cash-flow metric measuring Net Operating Income (NOI) divided by total annual debt service. A ratio of 1.25x or higher is typically preferred by institutional underwriters.'
    },
    {
      term: 'Accredited Investor (SEC Rule 501)',
      def: 'An individual with net worth > $1M (excluding primary residence), annual income ≥ $200k ($300k joint), or qualifying Series 7, 65, or 82 credentials eligible to participate in private placements.'
    },
    {
      term: 'ISO (Independent Sales Organization)',
      def: 'Commercial loan brokers, financial advisors, or referral partners who submit debt files to the OAL Network exchange and earn contractually defined referral commissions.'
    },
    {
      term: 'PIP (Property Improvement Plan)',
      def: 'A mandated renovation and upgrade schedule required by hospitality franchises for hotels and motels, funded via commercial improvement debt.'
    },
    {
      term: 'ARV (After-Repair Value)',
      def: 'The estimated future market value of a real estate asset once planned renovation or flip work is fully completed, used to determine loan-to-value ratios.'
    }
  ];

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!ticketForm.subject.trim() || !ticketForm.message.trim()) return;

    createTicket(ticketForm);
    setShowTicketModal(false);
    setTicketForm({ subject: '', category: 'Loan Application Assistance', priority: 'Normal', message: '' });
  };

  const filteredArticles = kbArticles.filter(art =>
    art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              24/7 AI &amp; Underwriting Help Desk
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-white leading-tight">
            Help Center &amp; Support Hub
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl mx-auto">
            Guidance, training, documentation, and compliance standards for commercial applicants, lenders, and OAL representatives.
          </p>

        </div>
      </section>

      {/* Main Container - All sections rendered on a single page */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Action Bar (Search + Ticket Button) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search Help Center (e.g. Investment IQ, Rule FR-08, KYC)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0070C0] outline-none"
            />
          </div>

          <button
            onClick={() => setShowTicketModal(true)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold bg-[#FFD200] hover:bg-[#F5C500] text-[#002060] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Open Help Desk Ticket</span>
          </button>
        </div>

        {/* SECTION 1: KNOWLEDGE BASE */}
        <section id="kb" className="scroll-mt-28 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-heading font-bold text-[#002060] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#0070C0]" />
              Featured Knowledge Base Articles
            </h2>
            <span className="text-xs text-slate-500">{filteredArticles.length} Articles</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredArticles.map((art) => (
              <div
                key={art.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between hover:border-[#0070C0] transition-colors"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-sky-50 text-[#0070C0] uppercase">
                    {art.category}
                  </span>
                  <h3 className="text-base font-bold text-[#002060] leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{art.readTime}</span>
                  <span className="text-[#0070C0] font-bold hover:underline cursor-pointer">
                    Read Guide &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: ACADEMY */}
        <section id="academy" className="scroll-mt-28 pt-12 border-t border-slate-200/80 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold text-[#0070C0] uppercase tracking-wider">Educational Modules</span>
            <h2 className="text-3xl font-heading font-extrabold text-[#002060]">
              OAL Commercial Lending Academy
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Structured courses for commercial applicants and capital partners to master balance-sheet optimization, DSCR requirements, and institutional underwriting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Module 1: Commercial Underwriting Fundamentals',
                level: 'Foundational',
                duration: '45 mins',
                desc: 'Understand how institutional underwriters evaluate bank statements, debt-service coverage, and tax returns.'
              },
              {
                title: 'Module 2: Maximizing Your 180-Point Investment IQ',
                level: 'Intermediate',
                duration: '60 mins',
                desc: 'Practical strategies to improve credit lines, business plan mission statements, and collateral valuations.'
              },
              {
                title: 'Module 3: Term Sheet Comparison & Negotiation',
                level: 'Advanced',
                duration: '35 mins',
                desc: 'Learn how to compare APR, origination fees, prepayment penalties, and balloon amortization structures.'
              }
            ].map((mod, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200 text-[10px]">
                    {mod.level}
                  </span>
                  <span className="text-slate-400 font-mono">{mod.duration}</span>
                </div>
                <h3 className="text-base font-bold text-[#002060]">{mod.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{mod.desc}</p>
                <button className="w-full py-2 bg-sky-50 hover:bg-sky-100 text-[#0070C0] font-bold text-xs rounded-xl transition-colors cursor-pointer">
                  Start Learning Module &rarr;
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: FAQS */}
        <section id="faqs" className="scroll-mt-28 pt-12 border-t border-slate-200/80 space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold text-[#0070C0] uppercase tracking-wider">Direct Answers</span>
            <h2 className="text-3xl font-heading font-extrabold text-[#002060]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[#0070C0] shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: TRAINING */}
        <section id="training" className="scroll-mt-28 pt-12 border-t border-slate-200/80 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold text-[#0070C0] uppercase tracking-wider">Professional Development</span>
            <h2 className="text-3xl font-heading font-extrabold text-[#002060]">
              OAL Platform Training &amp; Relations
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Specialized training programs for Team Get Money (TGM) graduates and OAL Club members advancing into institutional commercial debt placement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                Team Get Money (0–58 LINV IQ)
              </span>
              <h3 className="text-lg font-bold text-[#002060]">Financial Development for Beginners</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Introductory training covering personal-to-commercial guarantor transitions, business bank statement hygiene, maintaining daily ledger balances, and building trade references.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#002060] to-[#0070C0] text-white rounded-3xl shadow-xl space-y-4">
              <span className="text-xs font-bold text-[#002060] bg-[#FFD200] px-3 py-1 rounded-full">
                OAL Club (59+ LINV IQ)
              </span>
              <h3 className="text-lg font-bold text-white">Advance Finance Training for TGM Graduates</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Master capital structures, syndication mechanics, subordinated mezzanine debt, and institutional commercial mortgage packaging with senior underwriters.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: DEFINITIONS */}
        <section id="definitions" className="scroll-mt-28 pt-12 border-t border-slate-200/80 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold text-[#0070C0] uppercase tracking-wider">Commercial Dictionary</span>
            <h2 className="text-3xl font-heading font-extrabold text-[#002060]">
              Key Definitions &amp; Industry Terminology
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Essential terms and regulatory definitions governing the OAL Network commercial lending exchange.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {definitions.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-2">
                <h3 className="text-sm font-bold text-[#002060] pb-1 border-b border-slate-100 flex items-center justify-between">
                  <span>{item.term}</span>
                  <span className="text-[10px] text-[#0070C0] font-mono font-normal">OAL-DEF</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.def}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: RESOURCES */}
        <section id="resources" className="scroll-mt-28 pt-12 border-t border-slate-200/80 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold text-[#0070C0] uppercase tracking-wider">Downloadable Tools</span>
            <h2 className="text-3xl font-heading font-extrabold text-[#002060]">
              Intake Forms &amp; Underwriting Resources
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Commercial Underwriting Checklist', type: 'PDF Document', size: '240 KB' },
              { title: 'Schedule of Real Estate Owned (SREO)', type: 'Excel Spreadsheet', size: '510 KB' },
              { title: 'Debt-Service Coverage (DSCR) Model', type: 'Excel Spreadsheet', size: '380 KB' },
              { title: 'Equipment Invoicing & Quote Template', type: 'Word Template', size: '180 KB' },
              { title: 'Business Plan Executive Summary (<= 20 Words)', type: 'PDF Guide', size: '150 KB' },
              { title: 'Accredited Investor Self-Certification Form', type: 'PDF Document', size: '320 KB' }
            ].map((res, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-[#002060]">{res.title}</h3>
                  <span className="text-[10px] text-slate-400">{res.type} • {res.size}</span>
                </div>
                <span className="text-xs font-bold text-[#0070C0] hover:underline cursor-pointer">
                  Download
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 7: PRIVACY & SECURITY */}
        <section id="privacy" className="scroll-mt-28 pt-12 border-t border-slate-200/80 space-y-8 max-w-4xl">
          <div className="space-y-3">
            <span className="text-xs font-bold text-[#0070C0] uppercase tracking-wider">Compliance &amp; Governance</span>
            <h2 className="text-3xl font-heading font-extrabold text-[#002060]">
              Privacy, Security &amp; Patriot Act Compliance
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              OAL Network implements multi-factor authentication (MFA), end-to-end encryption, and rigorous federal compliance procedures.
            </p>
          </div>

          {/* Patriot Act Callout Box from docx */}
          <div className="p-6 sm:p-8 rounded-3xl bg-amber-50 border-2 border-amber-300 text-amber-950 space-y-3">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-6 h-6 text-amber-700" />
              <h3 className="text-base font-bold text-amber-900">
                Very Important Detail: Procedure for Opening a New Account
              </h3>
            </div>
            <p className="text-xs leading-relaxed">
              To aid the government in the fight against terrorism financing and money laundering, federal regulations require that all financial institutions obtain, verify, and record information that identifies each individual who opens an account.
            </p>
            <p className="text-xs leading-relaxed font-semibold">
              What this means for you: When you open an account on OAL Network, we will ask for your full legal name, business address, email, phone number, and tax identification details. Identity confirmation is conducted via secure multi-factor authentication (MFA) prior to loan intake.
            </p>
          </div>

          <div className="space-y-4 text-xs text-slate-700 leading-relaxed bg-white p-8 rounded-3xl border border-slate-200">
            <h4 className="text-sm font-bold text-[#002060]">International Security Standards &amp; Data Shielding</h4>
            <p>
              All data transmitted across OAL Network is protected by 256-bit TLS encryption in transit and AES-256 encryption at rest. In accordance with Rule FR-09, sensitive personal identifying information (PII) is masked from initial marketplace feeds. Lenders view anonymized financial criteria, requested volume, and Investment IQ scores, keeping your credit protected from repetitive hard inquiries.
            </p>
            <h4 className="text-sm font-bold text-[#002060] pt-2">No Direct Borrower-Lender Contact</h4>
            <p>
              To eliminate unsolicited sales outreach and protect borrower peace of mind, all communications are mediated by an assigned OAL Representative until a binding term sheet is accepted.
            </p>
          </div>
        </section>

        {/* SECTION 8: TERMS OF SERVICE */}
        <section id="terms" className="scroll-mt-28 pt-12 border-t border-slate-200/80 space-y-8 max-w-4xl">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#0070C0] uppercase tracking-wider">Legal Agreements</span>
            <h2 className="text-3xl font-heading font-extrabold text-[#002060]">
              Terms of Service &amp; Marketplace Conditions
            </h2>
          </div>

          <div className="space-y-4 text-xs text-slate-700 leading-relaxed bg-white p-8 rounded-3xl border border-slate-200">
            <h4 className="text-sm font-bold text-[#002060]">1. Marketplace Function</h4>
            <p>
              OAL Network operates an institutional commercial debt marketplace facilitating connections between business loan applicants, licensed OAL representatives, and accredited institutional lenders. OAL Network is not a direct lender, and score calculations do not constitute binding credit commitments.
            </p>
            <h4 className="text-sm font-bold text-[#002060] pt-2">2. Rule FR-08 Concurrency Governance</h4>
            <p>
              All participating institutional lenders agree to honor the 3-lender concurrent working deal limitation. Attempting to bypass OAL Representative mediation or contact borrowers outside platform channels constitutes grounds for immediate termination of network access.
            </p>
            <h4 className="text-sm font-bold text-[#002060] pt-2">3. Accuracy of Representations</h4>
            <p>
              Borrowers represent and warrant that all bank statements, tax returns, and commercial documentation provided during KYC intake are accurate and authentic.
            </p>
          </div>
        </section>

      </div>

      {/* Submit Ticket Modal */}
      {showTicketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#002060]">Open Underwriting Support Ticket</h3>
              <button
                type="button"
                onClick={() => setShowTicketModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleTicketSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Question on 6-month bank statement verification"
                  value={ticketForm.subject}
                  onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0070C0] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={ticketForm.category}
                    onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-[#0070C0]"
                  >
                    <option value="Loan Application Assistance">Loan Application Assistance</option>
                    <option value="Investment IQ Question">Investment IQ Question</option>
                    <option value="Document KYC Review">Document KYC Review</option>
                    <option value="Lender Portal Technical Support">Lender Portal Technical Support</option>
                    <option value="ISO & Broker Questions">ISO &amp; Broker Questions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Priority</label>
                  <select
                    value={ticketForm.priority}
                    onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-[#0070C0]"
                  >
                    <option value="Low">Low</option>
                    <option value="Normal">Normal</option>
                    <option value="High">High (Active Deal)</option>
                    <option value="Urgent">Urgent (Closing Wire)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Message Details *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Please describe your question or issue in detail..."
                  value={ticketForm.message}
                  onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0070C0] outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowTicketModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0070C0] hover:bg-[#002060] text-white text-xs font-bold rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-[#FFD200]" />
                  <span>Submit Ticket</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
