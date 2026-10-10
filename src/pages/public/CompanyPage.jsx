import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Building2,
  Users,
  ShieldCheck,
  Award,
  Globe,
  Briefcase,
  HeartHandshake,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  FileText,
  TrendingUp,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { VerifyBadge } from '../../components/common/VerifyBadge';
import { useApp } from '../../context/AppContext';

export const CompanyPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'about';
  const { addToast } = useApp();

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    topic: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setSubmitted(true);
    addToast('Message Dispatched', 'Thank you for reaching out to OAL Network. An underwriting specialist will contact you within 24 hours.', 'success');
  };

  const navTabs = [
    { id: 'about', label: 'About Us' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'values', label: 'Our Values' },
    { id: 'press', label: 'Press Room' },
    { id: 'investors', label: 'Investors' },
    { id: 'careers', label: 'Careers' },
    { id: 'culture', label: 'Inclusive Culture' },
    { id: 'contact', label: 'Contact Us' }
  ];

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
              Institutional Commercial Lending
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-white leading-tight">
            Company &amp; Corporate Governance
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl mx-auto">
            OPM ASAP Loans NetWORK — Servicing all 50 states with institutional commercial lending, standardized underwriting, and mediated marketplace integrity.
          </p>

          {/* Tab Navigation Pill Bar */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2">
            {navTabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setSearchParams({ tab: t.id })}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === t.id
                    ? 'bg-[#FFD200] text-[#002060] shadow-md shadow-amber-400/20 scale-105'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TAB 1: ABOUT US */}
        {activeTab === 'about' && (
          <div className="space-y-12 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0070C0] uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-[#00B0F0]" />
                  <span>The OAL Commercial Exchange Standard</span>
                </div>
                <h2 className="text-3xl font-heading font-extrabold text-[#002060]">
                  Re-Engineering Commercial Debt Across All 50 States
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  OAL Network (OPM ASAP Loans NetWORK) is a modern commercial lending exchange that connects business borrowers directly with verified institutional lenders, fiduciaries, and accredited debt underwriters.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Unlike traditional lead aggregators who sell unredacted loan inquiries across the web, OAL Network operates an auditable, closed marketplace governed by strict privacy isolation, the 180-point Investment IQ evaluation engine, and a hard 3-lender concurrency limit on active working deals.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
                  <div className="p-4 rounded-2xl bg-sky-50/70 border border-[#00B0F0]/30 space-y-1">
                    <span className="text-2xl font-extrabold text-[#0070C0] font-heading">$500M+</span>
                    <p className="text-xs font-semibold text-slate-800">Funding Capacity</p>
                    <p className="text-[11px] text-slate-500">$10,000 to $500 Million+ institutional range.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-300 space-y-1">
                    <span className="text-2xl font-extrabold text-amber-700 font-heading">24–72 Hrs</span>
                    <p className="text-xs font-semibold text-slate-800">Funding Speed</p>
                    <p className="text-[11px] text-slate-500">Typical approval in 2-24 hours for fast programs.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-blue-50/70 border border-[#0070C0]/30 space-y-1">
                    <span className="text-2xl font-extrabold text-[#002060] font-heading">50 States</span>
                    <p className="text-xs font-semibold text-slate-800">Nationwide Reach</p>
                    <p className="text-[11px] text-slate-500">Fully compliant commercial debt across all territories.</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-gradient-to-br from-[#002060] to-[#0070C0] text-white p-8 rounded-3xl shadow-xl space-y-6">
                <h3 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#FFD200]" />
                  <span>The Three Pillars of OAL</span>
                </h3>
                <div className="space-y-4 text-xs text-slate-200">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-[#00B0F0]/20 border border-[#00B0F0] text-[#00B0F0] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      1
                    </div>
                    <div>
                      <strong className="text-white block text-sm font-semibold">180-Point Investment IQ</strong>
                      <p className="text-slate-300 mt-0.5">Objective, transparent scoring across Credit (70), Cash Flow (50), Collateral (30), Business Plan (20), and Risk (10).</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-[#FFD200]/20 border border-[#FFD200] text-[#FFD200] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      2
                    </div>
                    <div>
                      <strong className="text-white block text-sm font-semibold">Rule FR-08: Max 3 Working Deals</strong>
                      <p className="text-slate-300 mt-0.5">No application is worked by more than three lenders at once, eliminating predatory bidding and protecting borrower focus.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-[#00B0F0]/20 border border-[#00B0F0] text-[#00B0F0] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      3
                    </div>
                    <div>
                      <strong className="text-white block text-sm font-semibold">Rule FR-09: Mediated Oversight</strong>
                      <p className="text-slate-300 mt-0.5">Assigned OAL Representatives broker communications between lenders and applicants for simple, secured, and quick transactions.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/how-it-works"
                    className="w-full py-3 rounded-xl bg-[#FFD200] hover:bg-[#F5C500] text-[#002060] font-bold text-xs text-center block transition-all shadow-md"
                  >
                    Explore How It Works &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LEADERSHIP / MANAGEMENT TEAM */}
        {activeTab === 'leadership' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="max-w-2xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#0070C0] uppercase tracking-wider">Executive Management</span>
                <VerifyBadge note="Client confirmation pending for official executive biographies and executive roster" />
              </div>
              <h2 className="text-3xl font-heading font-extrabold text-[#002060]">
                Our Leadership &amp; Management Team
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Led by veteran commercial credit executives, underwriting analysts, and fintech platform architects committed to transparent institutional lending.
              </p>
            </div>

            {/* Note banner explaining client content pending */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300/80 text-xs text-amber-900 flex items-start gap-3">
              <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Client Content Notice:</strong> Formal executive headshots and finalized executive biographies will be published upon client sign-off. Below is the operational governance structure.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  role: 'Chief Compliance & Operations Officer',
                  name: 'Victoria Sterling',
                  dept: 'Regulatory Oversight & Governance',
                  focus: 'Enforces international security standards, multi-factor authentication, KYC validation, and SEC Rule 501 compliance across all 50 states.'
                },
                {
                  role: 'Senior Commercial Placement Specialist',
                  name: 'Elena Rostova',
                  dept: 'OAL Representative Brokerage',
                  focus: 'Mediates deal rooms between institutional debt funds and qualified applicants, supervising competitive terms under Rule FR-09.'
                },
                {
                  role: 'Head of Underwriting Support',
                  name: 'Alex Chen',
                  dept: 'Institutional Help Desk Operations',
                  focus: 'Manages multi-channel applicant ticketing, technical support, and automated response routing to lower application abandonment rates.'
                }
              ].map((ldr, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-3 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#002060] to-[#0070C0] text-white flex items-center justify-center font-bold text-base shadow-sm">
                    {ldr.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#002060]">{ldr.name}</h3>
                    <p className="text-xs font-semibold text-[#0070C0]">{ldr.role}</p>
                    <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{ldr.dept}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                    {ldr.focus}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: OUR VALUES */}
        {activeTab === 'values' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold text-[#0070C0] uppercase tracking-wider">Corporate Philosophy</span>
              <h2 className="text-3xl font-heading font-extrabold text-[#002060]">
                The Principles Driving OAL Network
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Commercial lending requires mutual trust, absolute confidentiality, and data-driven fairness. These principles govern every interaction across our exchange.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Transparency in Underwriting',
                  desc: 'No black-box decisioning. The 180-point Investment IQ openly discloses every factor influencing approval readiness.',
                  icon: Award,
                  color: 'border-[#00B0F0] bg-sky-50/50'
                },
                {
                  title: 'Data Privacy First',
                  desc: 'Borrower sensitive PII is shielded from open browsing. Only authenticated, verified lenders under active contract access details.',
                  icon: ShieldCheck,
                  color: 'border-[#0070C0] bg-blue-50/50'
                },
                {
                  title: 'Anti-Predatory Guardrails',
                  desc: 'Enforcing a strict cap of 3 concurrent lenders prevents high-pressure bidding loops and preserves borrower focus.',
                  icon: CheckCircle2,
                  color: 'border-amber-400 bg-amber-50/50'
                },
                {
                  title: 'Inclusive Commercial Access',
                  desc: 'Programs designed for good and bad credit profiles, startups, faith communities, and underserved business sectors.',
                  icon: HeartHandshake,
                  color: 'border-[#002060] bg-slate-50/80'
                }
              ].map((val, idx) => (
                <div key={idx} className={`p-6 rounded-2xl border-2 ${val.color} space-y-3 transition-transform hover:-translate-y-1`}>
                  <div className="w-10 h-10 rounded-xl bg-white shadow-xs flex items-center justify-center text-[#0070C0]">
                    <val.icon className="w-5 h-5 text-[#0070C0]" />
                  </div>
                  <h3 className="text-base font-bold text-[#002060]">{val.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PRESS ROOM */}
        {activeTab === 'press' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="max-w-2xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#0070C0] uppercase tracking-wider">Media &amp; Announcements</span>
                <VerifyBadge note="Client confirmation pending for official press releases" />
              </div>
              <h2 className="text-3xl font-heading font-extrabold text-[#002060]">
                Press Room &amp; Corporate Releases
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Stay updated with announcements, marketplace expansions, and commercial debt underwriting insights from OAL Network.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  date: 'Official Notice',
                  category: 'Platform Launch',
                  title: 'OAL Network Unveils Mediated Commercial Lending Platform with 180-Point Investment IQ™',
                  summary: 'New institutional architecture limits active working deals to three concurrent lenders, protecting business applicants across all 50 states.',
                  readTime: '3 min read'
                },
                {
                  date: 'Program Expansion',
                  category: 'Specialized Debt',
                  title: 'Dedicated Financing Channels Announced for Freight Trucking, Churches, and Healthcare Practices',
                  summary: 'Expanding capital access for specialized sectors with tailored equipment debt, leasehold improvements, and 2-24 hour approvals.',
                  readTime: '2 min read'
                },
                {
                  date: 'Partnership Notice',
                  category: 'Broker & ISO Program',
                  title: 'OAL Network Introduces ISO Broker Partner Portal for Certified Referrals',
                  summary: 'Independent Sales Organizations gain real-time commission tracking, dedicated OAL representative placement, and expedited file processing.',
                  readTime: '4 min read'
                }
              ].map((pr, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center gap-2 text-[11px] font-semibold text-[#0070C0]">
                      <span className="bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">{pr.category}</span>
                      <span>•</span>
                      <span className="text-slate-400">{pr.date}</span>
                    </div>
                    <h3 className="text-base font-bold text-[#002060]">{pr.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{pr.summary}</p>
                  </div>
                  <span className="text-xs font-bold text-[#0070C0] hover:text-[#00B0F0] whitespace-nowrap cursor-pointer inline-flex items-center gap-1">
                    <span>Read Release</span> &rarr;
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: INVESTORS */}
        {activeTab === 'investors' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="max-w-2xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#0070C0] uppercase tracking-wider">Capital Partnerships</span>
                <VerifyBadge note="Client confirmation pending for investor relations terms and SEC documentation" />
              </div>
              <h2 className="text-3xl font-heading font-extrabold text-[#002060]">
                Institutional Investors &amp; Capital Partners
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Connect with the OAL Network debt exchange as an accredited investor, credit fund, family office, or institutional liquidity provider.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
                <h3 className="text-lg font-bold text-[#002060]">The Money Club for Investors</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Join our verified investor community powered by licensed lenders. Access vetted deal flow categorized by 180-point Investment IQ ratings, complete with standardized cash flow analytics.
                </p>
                <div className="pt-2">
                  <Link
                    to="/investment-club"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0070C0] hover:bg-[#002060] text-white text-xs font-bold transition-all shadow-md"
                  >
                    <span>View Investment Club Tiers</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-gradient-to-br from-[#002060] to-[#0070C0] text-white shadow-xl space-y-4">
                <h3 className="text-lg font-bold text-[#FFD200]">Accreditation &amp; SEC Rule 501</h3>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Accredited investor verification requirements: Net worth exceeding $1 Million (excluding primary residence), annual income &ge; $200k individual ($300k joint), or qualifying Series 7, 65, or 82 credentials.
                </p>
                <div className="pt-2">
                  <Link
                    to="/investment-iq"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFD200] hover:bg-[#F5C500] text-[#002060] text-xs font-bold transition-all shadow-md"
                  >
                    <span>Accreditation Guidelines &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: CAREERS */}
        {activeTab === 'careers' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="max-w-2xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#0070C0] uppercase tracking-wider">Join Our Team</span>
                <VerifyBadge note="Client confirmation pending for open career listings" />
              </div>
              <h2 className="text-3xl font-heading font-extrabold text-[#002060]">
                Careers at OAL Network
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Build the future of commercial lending. We are seeking passionate underwriting specialists, fiduciary placement agents, and fintech software engineers.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: 'Commercial Placement Specialist (OAL Representative)',
                  type: 'Full-Time • Remote / Hybrid',
                  location: 'Nationwide (All 50 States)',
                  desc: 'Mediate commercial debt inquiries, interface with institutional lenders, and guide applicants from initial intake through final closing wires.'
                },
                {
                  title: 'Commercial Credit Risk Underwriter',
                  type: 'Full-Time',
                  location: 'New York, NY / Remote',
                  desc: 'Audit financial statements, evaluate 180-point Investment IQ scoring metrics, and verify KYC compliance for commercial loan applications.'
                },
                {
                  title: 'Institutional ISO Relations Manager',
                  type: 'Full-Time',
                  location: 'Remote',
                  desc: 'Support Independent Sales Organizations, broker partnerships, and referral networks utilizing the OAL ISO program portal.'
                }
              ].map((pos, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-[#002060]">{pos.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="font-semibold text-[#0070C0]">{pos.type}</span>
                      <span>•</span>
                      <span>{pos.location}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{pos.desc}</p>
                  </div>
                  <button
                    onClick={() => {
                      setSearchParams({ tab: 'contact' });
                      setContactForm(prev => ({ ...prev, topic: `Career Application: ${pos.title}` }));
                    }}
                    className="px-4 py-2 rounded-xl bg-[#0070C0] hover:bg-[#002060] text-white text-xs font-bold whitespace-nowrap shadow-xs cursor-pointer"
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: INCLUSIVE CULTURE */}
        {activeTab === 'culture' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold text-[#0070C0] uppercase tracking-wider">Diversity &amp; Inclusion</span>
              <h2 className="text-3xl font-heading font-extrabold text-[#002060]">
                An Inclusive Culture for All Borrowers &amp; Partners
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Fair access to commercial capital empowers local communities, minority-owned enterprises, faith institutions, and entrepreneurial visionaries.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0070C0] flex items-center justify-center font-bold">
                  <Globe className="w-5 h-5 text-[#00B0F0]" />
                </div>
                <h3 className="text-base font-bold text-[#002060]">All 50 States &amp; Territories</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Commercial funding opportunities are extended equally across rural, suburban, and urban communities with no geographic bias.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                  <HeartHandshake className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="text-base font-bold text-[#002060]">Good &amp; Bad Credit Flexibility</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Past credit adversity should not permanently lock an enterprise out of growth capital. We structure debt solutions around forward cash flow and collateral strength.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#002060] flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5 text-[#0070C0]" />
                </div>
                <h3 className="text-base font-bold text-[#002060]">Equal Opportunity Financing</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  OAL Network strictly adheres to the Equal Credit Opportunity Act (ECOA) and federal anti-discrimination lending regulations.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: CONTACT US */}
        {activeTab === 'contact' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-xs font-bold text-[#0070C0] uppercase tracking-wider">Direct Communications</span>
                  <h2 className="text-3xl font-heading font-extrabold text-[#002060] mt-1">
                    Contact OAL Network
                  </h2>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    Have questions about the 180-point Investment IQ, specialized loan categories, or becoming a verified lending member? Our underwriting specialists are standing by.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0070C0] flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-[#00B0F0]" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 font-semibold uppercase block">Underwriting Direct Line</span>
                      <strong className="text-sm font-bold text-slate-900">+1 (800) 592-OAL-NET (6256)</strong>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-[#FFD200]" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 font-semibold uppercase block">Inquiries &amp; Submissions</span>
                      <strong className="text-sm font-bold text-slate-900">underwriting@oalnetwork.com</strong>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#002060] flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-[#0070C0]" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 font-semibold uppercase block">Headquarters</span>
                      <strong className="text-sm font-bold text-slate-900">Financial District, New York, NY 10005</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8">
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-400">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Inquiry Dispatched Successfully</h3>
                    <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                      Your inquiry has been assigned ticket routing. An OAL Representative or underwriting director will review and reply within 24 business hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setContactForm({ name: '', email: '', phone: '', topic: 'General Inquiry', message: '' });
                      }}
                      className="px-6 py-2.5 rounded-xl bg-[#0070C0] hover:bg-[#002060] text-white text-xs font-bold transition-all"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <h3 className="text-lg font-bold text-[#002060] pb-2 border-b border-slate-100">
                      Submit an Inquiry
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0070C0] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Business Email <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="name@company.com"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0070C0] outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0070C0] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Topic of Inquiry
                        </label>
                        <select
                          value={contactForm.topic}
                          onChange={(e) => setContactForm({ ...contactForm, topic: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0070C0] outline-none bg-white"
                        >
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Borrower Loan Application">Borrower Loan Application</option>
                          <option value="Lender Membership Program">Lender Membership Program</option>
                          <option value="ISO & Broker Partner Program">ISO &amp; Broker Partner Program</option>
                          <option value="Investment Club / Accreditation">Investment Club / Accreditation</option>
                          <option value="Press / Media">Press / Media</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Message Details <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Please provide details regarding your financing inquiry or institutional partnership..."
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0070C0] outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-[#0070C0] hover:bg-[#002060] text-white text-xs font-bold shadow-md shadow-blue-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4 text-[#FFD200]" />
                      <span>Transmit Inquiry to Underwriting Team</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
