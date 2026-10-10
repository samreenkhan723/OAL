import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, Phone, MapPin, ExternalLink, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#001744] text-slate-300 pt-12 pb-10 border-t border-[#00B0F0]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Brand & Nationwide Summary Bar */}
        <div className="pb-10 mb-10 border-b border-slate-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#002060] via-[#0070C0] to-[#00B0F0] flex items-center justify-center text-white shadow-md border border-[#00B0F0]/40">
              <ShieldCheck className="w-6 h-6 text-[#FFD200]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-2xl tracking-tight text-white">OAL</span>
                <span className="font-heading font-semibold text-2xl tracking-tight text-[#00B0F0]">NETWORK</span>
              </div>
              <p className="text-[10px] font-bold tracking-widest text-[#FFD200] uppercase">
                OPM ASAP Loans NetWORK • Servicing All 50 States
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#FFD200]" />
              <span>+1 (800) 592-OAL-NET (6256)</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#00B0F0]" />
              <span>underwriting@oalnetwork.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#FFD200]" />
              <span>Financial District, New York, NY 10005</span>
            </div>
          </div>
        </div>

        {/* 4 Exact Blueprint Columns from Sitemap DOCX */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
          
          {/* Column 1: Help Center */}
          <div className="space-y-3">
            <h4 className="text-[#FFD200] font-extrabold text-xs uppercase tracking-wider mb-2">
              Help Center
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px] text-slate-300">
              <li><Link to="/help?tab=kb" className="hover:text-[#00B0F0] transition-colors">Knowledge Base</Link></li>
              <li><Link to="/help?tab=academy" className="hover:text-[#00B0F0] transition-colors">Academy</Link></li>
              <li><Link to="/help?tab=faqs" className="hover:text-[#00B0F0] transition-colors">FAQs</Link></li>
              <li><Link to="/help?tab=training" className="hover:text-[#00B0F0] transition-colors">Training</Link></li>
              <li><Link to="/help?tab=definitions" className="hover:text-[#00B0F0] transition-colors">Definitions</Link></li>
              <li><Link to="/tools?tab=analyzer" className="hover:text-[#00B0F0] transition-colors">Biz Analyzer</Link></li>
              <li><Link to="/help?tab=resources" className="hover:text-[#00B0F0] transition-colors">Resources</Link></li>
              <li><Link to="/help?tab=privacy" className="hover:text-[#00B0F0] transition-colors">Privacy and security</Link></li>
              <li><Link to="/help?tab=terms" className="hover:text-[#00B0F0] transition-colors">Terms</Link></li>
              <li><Link to="/apply" className="text-[#FFD200] font-bold hover:underline">Apply for A Loan</Link></li>
              <li><Link to="/tools?tab=videos" className="hover:text-[#00B0F0] transition-colors">Case studies</Link></li>
              <li><Link to="/tools?tab=reviews" className="hover:text-[#00B0F0] transition-colors">Testimonials</Link></li>
            </ul>
          </div>

          {/* Column 2: Check It Out */}
          <div className="space-y-3">
            <h4 className="text-[#00B0F0] font-extrabold text-xs uppercase tracking-wider mb-2">
              Check It Out
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px] text-slate-300">
              <li><Link to="/investment-club" className="hover:text-[#FFD200] transition-colors">The Money Club</Link></li>
              <li><Link to="/investment-iq" className="hover:text-[#FFD200] transition-colors">Investors IQ</Link></li>
              <li><Link to="/tools?tab=calculators" className="hover:text-[#FFD200] transition-colors">Financial Calculators</Link></li>
              <li><Link to="/tools?tab=videos" className="hover:text-[#FFD200] transition-colors">Videos</Link></li>
              <li><Link to="/company?tab=press" className="hover:text-[#FFD200] transition-colors">Press Room</Link></li>
              <li><Link to="/loan-programs" className="hover:text-[#FFD200] transition-colors">Small Business Loans</Link></li>
              <li><Link to="/loan-programs" className="hover:text-[#FFD200] transition-colors">Startup Loans</Link></li>
              <li><Link to="/loan-programs" className="hover:text-[#FFD200] transition-colors">Inventory Loans</Link></li>
              <li><Link to="/loan-programs" className="hover:text-[#FFD200] transition-colors">Payroll Loans</Link></li>
              <li><Link to="/tools?tab=partners" className="hover:text-[#FFD200] transition-colors">CRM nErgy Events</Link></li>
              <li><Link to="/tools?tab=reviews" className="hover:text-[#FFD200] transition-colors">Reviews</Link></li>
            </ul>
          </div>

          {/* Column 3: Product */}
          <div className="space-y-3">
            <h4 className="text-[#FFD200] font-extrabold text-xs uppercase tracking-wider mb-2">
              Product
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px] text-slate-300">
              <li><Link to="/loan-programs" className="hover:text-[#00B0F0] transition-colors">Loan Types</Link></li>
              <li><Link to="/loan-programs" className="hover:text-[#00B0F0] transition-colors">Loans by Industry</Link></li>
              <li><Link to="/tools" className="hover:text-[#00B0F0] transition-colors">Marketing Genius</Link></li>
              <li><Link to="/loan-programs" className="hover:text-[#00B0F0] transition-colors">Financing</Link></li>
              <li><Link to="/loan-programs/restaurant" className="hover:text-[#00B0F0] transition-colors">Restaurant Loans</Link></li>
              <li><Link to="/loan-programs/food-truck" className="hover:text-[#00B0F0] transition-colors">Food Trucks Loans</Link></li>
              <li><Link to="/loan-programs/franchise" className="hover:text-[#00B0F0] transition-colors">Buy A Franchise</Link></li>
              <li><Link to="/loan-programs/dental-practice" className="hover:text-[#00B0F0] transition-colors">Dental Practice</Link></li>
              <li><Link to="/loan-programs/freight-trucking" className="hover:text-[#00B0F0] transition-colors">Truck Loans</Link></li>
              <li><Link to="/loan-programs/hotel-motel-airbnb" className="hover:text-[#00B0F0] transition-colors">Hotel / Motel Loans</Link></li>
              <li><Link to="/loan-programs/church-facility" className="hover:text-[#00B0F0] transition-colors">Church Loans</Link></li>
              <li><Link to="/loan-programs/fix-and-flip" className="hover:text-[#00B0F0] transition-colors">Fix and Flip Loans</Link></li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="space-y-3">
            <h4 className="text-[#00B0F0] font-extrabold text-xs uppercase tracking-wider mb-2">
              Company
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px] text-slate-300">
              <li><Link to="/company?tab=about" className="hover:text-[#FFD200] transition-colors">About</Link></li>
              <li><Link to="/how-it-works" className="hover:text-[#FFD200] transition-colors">How OAL Works</Link></li>
              <li><Link to="/company?tab=values" className="hover:text-[#FFD200] transition-colors">OAL Values</Link></li>
              <li><Link to="/company?tab=leadership" className="hover:text-[#FFD200] transition-colors">Management Team</Link></li>
              <li><Link to="/tools?tab=partners" className="hover:text-[#FFD200] transition-colors">Affiliates</Link></li>
              <li><Link to="/company?tab=careers" className="hover:text-[#FFD200] transition-colors">Careers</Link></li>
              <li><Link to="/company?tab=press" className="hover:text-[#FFD200] transition-colors">Blog</Link></li>
              <li><Link to="/company?tab=investors" className="hover:text-[#FFD200] transition-colors">Investors</Link></li>
              <li><Link to="/company?tab=culture" className="hover:text-[#FFD200] transition-colors">Inclusive Culture</Link></li>
              <li><Link to="/company?tab=contact" className="hover:text-[#FFD200] transition-colors">Contact</Link></li>
              <li><Link to="/borrower/referrals" className="hover:text-[#FFD200] transition-colors">Referral program</Link></li>
              <li><Link to="/iso-program" className="hover:text-[#FFD200] transition-colors">Partners</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} OAL Network Inc. (OPM ASAP Loans NetWORK). Servicing All 50 States.</p>
          <div className="flex items-center gap-6">
            <Link to="/help?tab=privacy" className="hover:text-slate-300">Privacy Policy</Link>
            <Link to="/help?tab=terms" className="hover:text-slate-300">Terms of Service</Link>
            <Link to="/help?tab=privacy" className="hover:text-slate-300">Patriot Act Notice</Link>
            <span className="text-slate-500">Equal Credit Opportunity</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

