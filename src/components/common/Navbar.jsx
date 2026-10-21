import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ShieldCheck,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  UserPlus,
  LogIn,
  Building2,
  Building,
  UtensilsCrossed,
  Truck,
  Store,
  Smile,
  Container,
  Landmark,
  Hammer,
  Users,
  Compass,
  Award,
  Newspaper,
  TrendingUp,
  Briefcase,
  HeartHandshake,
  Mail,
  Coins,
  Boxes,
  Radio,
  Factory,
  Heart,
  Cpu,
  ShoppingBag,
  CreditCard,
  Banknote,
  Wrench,
  Zap,
  Rocket,
  CheckCircle2,
  Sun,
  Wind,
  Plane,
  Repeat,
  FileText,
  Layers,
  Hotel,
  HeartPulse,
  Clapperboard,
  Car,
  GraduationCap,
  Sprout
} from 'lucide-react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'loan-types' | 'industries' | 'company' | null
  const [mobileExpandedSection, setMobileExpandedSection] = useState(null); // 'loan-types' | 'industries' | 'company' | null

  const location = useLocation();
  const navContainerRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);

  // Close menus when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setMobileExpandedSection(null);
  }, [location.pathname, location.search]);

  // Click outside and Escape key listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navContainerRef.current && !navContainerRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // All 34 Loan Types strictly aligned with Client requirement doc: "Loan Types – Home Page - OAL website .docx"
  const all34LoanTypes = [
    { label: 'Alternative Energy Loans', path: '/loantypes/alternative-energy', icon: Zap },
    { label: 'Asset Based Loans', path: '/loantypes/asset-based', icon: ShieldCheck },
    { label: 'Bad Credit Business Loans', path: '/loantypes/bad-credit', icon: CheckCircle2 },
    { label: 'Business Acquisition Loans', path: '/loantypes/business-acquisition', icon: Briefcase },
    { label: 'Business Line Of Credit', path: '/loantypes/business-line-of-credit', icon: CreditCard },
    { label: 'Cash Advance Loans', path: '/loantypes/cash-advance', icon: Coins },
    { label: 'Church Financing Loans', path: '/loantypes/church-facility', icon: Landmark },
    { label: 'Commercial Bridge Loans', path: '/loantypes/commercial-bridge', icon: TrendingUp },
    { label: 'Construction Equipment Loans', path: '/loantypes/construction-equipment', icon: Hammer },
    { label: 'Debt Restructuring Loans', path: '/loantypes/debt-restructuring', icon: FileText },
    { label: 'Dental Practice Loans', path: '/loantypes/dental-practice', icon: Smile },
    { label: 'Doctors Loans', path: '/loantypes/doctors-loans', icon: Heart },
    { label: 'Equipment Leasing Loans', path: '/loantypes/equipment-leasing', icon: Wrench },
    { label: 'Fix & Flip Loans', path: '/loantypes/fix-and-flip', icon: Building },
    { label: 'Fleet Truck Loans', path: '/loantypes/fleet-truck', icon: Truck },
    { label: 'Food Truck Loans', path: '/loantypes/food-truck', icon: Truck },
    { label: 'Franchise Loans', path: '/loantypes/franchise', icon: Store },
    { label: 'Full-Service Restaurants Loans', path: '/loantypes/restaurant', icon: UtensilsCrossed },
    { label: 'Medical Equipment Loans', path: '/loantypes/medical-equipment', icon: ShieldCheck },
    { label: 'Medical Working Capital Loans', path: '/loantypes/medical-working-capital', icon: Banknote },
    { label: 'Merchant Cash Advance Loans', path: '/loantypes/merchant-cash-advance', icon: Zap },
    { label: 'Owner-Operator Truck Loans', path: '/loantypes/owner-operator-truck', icon: Container },
    { label: 'Real Estate Loans', path: '/loantypes/real-estate', icon: Building2 },
    { label: 'Revenue-Based Loans', path: '/loantypes/revenue-based', icon: TrendingUp },
    { label: 'Sale and Leaseback Loans', path: '/loantypes/sale-and-leaseback', icon: Repeat },
    { label: 'SBA Loans – Financing', path: '/loantypes/sba-loans', icon: Landmark },
    { label: 'Securities-Based Loans', path: '/loantypes/securities-based', icon: Coins },
    { label: 'Solar Energy Loans', path: '/loantypes/solar-energy', icon: Sun },
    { label: 'Startup Loans', path: '/loantypes/startup-loans', icon: Rocket },
    { label: 'Unsecured Business Loans', path: '/loantypes/unsecured-business', icon: ShieldCheck },
    { label: 'Used Aircraft Loans', path: '/loantypes/used-aircraft', icon: Plane },
    { label: 'Veterinarians Loans', path: '/loantypes/veterinarians', icon: Heart },
    { label: 'Wind Energy Loans', path: '/loantypes/wind-energy', icon: Wind },
    { label: 'Working Capital Loans', path: '/loantypes/working-capital', icon: Banknote },
  ];

  // All 20 Commercial Loans by Industry strictly per Client Requirement Documents
  const coreIndustries = [
    { label: 'Agriculture', path: '/industries/agriculture', icon: Sprout },
    { label: 'Automotive', path: '/industries/automotive', icon: Car },
    { label: 'Construction', path: '/industries/construction', icon: Hammer },
    { label: 'E-commerce', path: '/industries/ecommerce', icon: ShoppingBag },
    { label: 'Education', path: '/industries/education', icon: GraduationCap },
    { label: 'Energy', path: '/industries/energy', icon: Zap },
    { label: 'Entertainment', path: '/industries/entertainment', icon: Clapperboard },
    { label: 'Financial Services', path: '/industries/financial-services', icon: Landmark },
    { label: 'Food and Beverage', path: '/industries/food-beverage', icon: UtensilsCrossed },
    { label: 'Healthcare', path: '/industries/healthcare', icon: HeartPulse },
    { label: 'Hospitality', path: '/industries/hospitality', icon: Hotel },
    { label: 'Logistics', path: '/industries/logistics', icon: Boxes },
    { label: 'Manufacturing', path: '/industries/manufacturing', icon: Factory },
    { label: 'Nonprofit', path: '/industries/nonprofit', icon: Heart },
    { label: 'Professional Services', path: '/industries/professional-services', icon: Briefcase },
    { label: 'Real Estate', path: '/industries/real-estate', icon: Building },
    { label: 'Retail', path: '/industries/retail', icon: ShoppingBag },
    { label: 'Technology', path: '/industries/technology', icon: Cpu },
    { label: 'Telecom', path: '/industries/telecom', icon: Radio },
    { label: 'Transportation', path: '/industries/transportation', icon: Truck },
  ];

  // Company Section strictly per doc: "Sitemap – OAL Network website (1).docx"
  // COMPANY: About Us, Our Leadership, How it Works, Our Values, Press, Investors, Careers, Inclusive Culture, Contact Us
  const companyPages = [
    { label: 'About Us', path: '/company?tab=about', icon: ShieldCheck },
    { label: 'Our Leadership', path: '/company?tab=leadership', icon: Users },
    { label: 'How it Works', path: '/how-it-works', icon: Compass },
    { label: 'Our Values', path: '/company?tab=values', icon: Award },
    { label: 'Press', path: '/company?tab=press', icon: Newspaper },
    { label: 'Investors', path: '/company?tab=investors', icon: TrendingUp },
    { label: 'Careers', path: '/company?tab=careers', icon: Briefcase },
    { label: 'Inclusive Culture', path: '/company?tab=culture', icon: HeartHandshake },
    { label: 'Contact Us', path: '/company?tab=contact', icon: Mail },
  ];

  const handleMouseEnter = (name) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  return (
    <header ref={navContainerRef} className="sticky top-0 z-50 bg-white shadow-xs border-b border-slate-200">
      {/* 1. Client Blueprint Top Strip: OPM ASAP Loans NetWORK */}
      <div className="bg-[#002060] text-white text-[11px] font-medium py-1.5 px-4 sm:px-8 border-b border-[#00B0F0]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4 truncate">
            <span className="font-extrabold tracking-wider text-[#FFD200] uppercase text-[10px] sm:text-[11px]">
              OPM ASAP Loans NetWORK
            </span>
            <span className="text-[#00B0F0] hidden sm:inline">•</span>
            <span className="text-[#00B0F0] font-extrabold hidden sm:inline">Servicing All 50 States</span>
            <span className="text-[#00B0F0] hidden md:inline">•</span>
            <span className="text-slate-300 hidden md:inline">$10k to $500M+ &bull; 24–72 Hr Funding</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <Link
              to="/auth/login"
              className="inline-flex items-center gap-1 px-2.5 py-1 sm:py-0.5 rounded-md text-[11px] font-black text-[#002060] bg-[#FFD200] hover:bg-[#ffe040] transition-all shadow-xs border border-amber-300"
            >
              <LogIn className="w-3 h-3 text-[#002060] shrink-0" />
              <span>Login</span>
            </Link>

            <Link
              to="/auth/register"
              className="inline-flex items-center gap-1 px-2.5 py-1 sm:py-0.5 rounded-md text-[11px] font-black text-[#002060] bg-[#FFD200] hover:bg-[#ffe040] transition-all shadow-xs border border-amber-300"
            >
              <UserPlus className="w-3 h-3 text-[#002060] shrink-0" />
              <span>Create Account</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Navbar Row strictly per client blueprint & sitemap */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="shrink-0 flex items-center gap-2 sm:gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#002060] via-[#0070C0] to-[#00B0F0] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform shrink-0 border border-[#00B0F0]/30">
              <ShieldCheck className="w-5 h-5 text-[#FFD200]" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-heading font-extrabold text-base sm:text-lg tracking-tight text-[#002060]">OAL</span>
                <span className="font-heading font-semibold text-base sm:text-lg tracking-tight text-[#0070C0]">NETWORK</span>
              </div>
              <p className="hidden sm:block text-[11px] font-bold tracking-wide text-[#0070C0]">Shop for Money, Get Approved</p>
            </div>
          </Link>

          {/* Desktop Navigation Row: HOME | Loan Types | Industries | On the Money | FAQs | COMPANY */}
          <nav className="hidden lg:flex items-center h-16 gap-0.5 xl:gap-1.5">

            {/* 1. HOME */}
            <Link
              to="/"
              onMouseEnter={() => setActiveDropdown(null)}
              className={`h-16 flex items-center px-2.5 xl:px-3 text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors ${location.pathname === '/'
                  ? 'text-[#0070C0] font-bold'
                  : 'text-slate-700 hover:text-[#0070C0]'
                }`}
            >
              Home
            </Link>

            {/* 2. Loan Types (Click to Toggle / Hover to Open Dropdown Window) */}
            <div
              className="relative h-16 flex items-center"
              onMouseEnter={() => handleMouseEnter('loan-types')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'loan-types' ? null : 'loan-types')}
                className={`h-16 flex items-center gap-1 px-2.5 xl:px-3 text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${location.pathname === '/loantypes' || location.pathname === '/loan-types' || location.pathname === '/loan-programs' || location.pathname.startsWith('/loan-programs/') || location.pathname.startsWith('/loantypes/')
                    ? 'text-[#0070C0] font-bold'
                    : 'text-slate-700 hover:text-[#0070C0]'
                  }`}
              >
                <span>Loan Types</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${activeDropdown === 'loan-types' ? 'rotate-180 text-[#0070C0]' : ''}`} />
              </button>

              {/* Loan Types Dropdown Card strictly styled matching Industries */}
              {activeDropdown === 'loan-types' && (
                <div
                  className="absolute top-full left-0 mt-1 bg-white rounded-2xl shadow-2xl border border-slate-200/90 py-3.5 px-3.5 z-50"
                  style={{ width: '580px', minWidth: '540px' }}
                  onMouseEnter={() => handleMouseEnter('loan-types')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="px-2 pb-2.5 mb-2 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-[#002060]">
                        Commercial Loan Types
                      </span>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#00B0F0]/15 text-[#0070C0] border border-[#00B0F0]/30">
                        34 Programs
                      </span>
                    </div>
                    <Link
                      to="/loantypes"
                      onClick={() => setActiveDropdown(null)}
                      className="text-xs font-bold text-[#0070C0] hover:text-[#002060] transition-colors"
                    >
                      All 34 Loan Types &rarr;
                    </Link>
                  </div>

                  {/* Scrollable 2-Column Grid of All 34 Loan Types strictly per Client Requirement Document */}
                  <div className="max-h-[380px] overflow-y-auto pr-1.5" style={{ scrollbarWidth: 'thin' }}>
                    <div className="grid grid-cols-2 gap-1.5">
                      {all34LoanTypes.map((prog) => {
                        const Icon = prog.icon;
                        return (
                          <Link
                            key={prog.path}
                            to={prog.path}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-sky-50 text-slate-700 hover:text-[#002060] transition-colors group"
                          >
                            <div className="w-7 h-7 rounded-lg bg-sky-50 text-[#0070C0] group-hover:bg-[#002060] group-hover:text-[#FFD200] flex items-center justify-center shrink-0 transition-colors border border-[#00B0F0]/15">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs font-bold text-slate-800 group-hover:text-[#002060] truncate" title={prog.label}>
                              {prog.label}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 px-2 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-medium">$10K to $500M+ • 24–72 Hr Funding</span>
                    <Link
                      to="/loantypes"
                      onClick={() => setActiveDropdown(null)}
                      className="text-[#0070C0] font-bold hover:underline"
                    >
                      Explore Directory & Matrix &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Industries (Click to Toggle / Hover to Open) */}
            <div
              className="relative h-16 flex items-center"
              onMouseEnter={() => handleMouseEnter('industries')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'industries' ? null : 'industries')}
                className={`h-16 flex items-center gap-1 px-2.5 xl:px-3 text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${location.pathname === '/industries' || location.pathname.startsWith('/industries/')
                    ? 'text-[#0070C0] font-bold'
                    : 'text-slate-700 hover:text-[#0070C0]'
                  }`}
              >
                <span>Industries</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${activeDropdown === 'industries' ? 'rotate-180 text-[#0070C0]' : ''}`} />
              </button>

              {/* Industries Dropdown Card */}
              {activeDropdown === 'industries' && (
                <div
                  className="absolute top-full left-0 mt-1 bg-white rounded-2xl shadow-2xl border border-slate-200/90 py-3.5 px-3.5 z-50"
                  style={{ width: '540px', minWidth: '500px' }}
                  onMouseEnter={() => handleMouseEnter('industries')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="px-2 pb-2.5 mb-2 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-[#002060]">
                        Commercial Loans by Industry
                      </span>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#00B0F0]/15 text-[#0070C0] border border-[#00B0F0]/30">
                        20 Industries
                      </span>
                    </div>
                    <Link
                      to="/industries"
                      onClick={() => setActiveDropdown(null)}
                      className="text-xs font-bold text-[#0070C0] hover:text-[#002060] transition-colors"
                    >
                      All 20 Industries &rarr;
                    </Link>
                  </div>

                  {/* Scrollable 2-Column Grid of All 20 Industries */}
                  <div className="max-h-[380px] overflow-y-auto pr-1.5" style={{ scrollbarWidth: 'thin' }}>
                    <div className="grid grid-cols-2 gap-1.5">
                      {coreIndustries.map((prog) => {
                        const Icon = prog.icon;
                        return (
                          <Link
                            key={prog.path}
                            to={prog.path}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-sky-50 text-slate-700 hover:text-[#002060] transition-colors group"
                          >
                            <div className="w-7 h-7 rounded-lg bg-sky-50 text-[#0070C0] group-hover:bg-[#002060] group-hover:text-[#FFD200] flex items-center justify-center shrink-0 transition-colors border border-[#00B0F0]/15">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs font-bold whitespace-nowrap text-slate-800 group-hover:text-[#002060] truncate" title={prog.label}>
                              {prog.label}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 px-2 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-medium">$10K to $500M+ • Industry-Specific Debt</span>
                    <Link
                      to="/industries"
                      onClick={() => setActiveDropdown(null)}
                      className="text-[#0070C0] font-bold hover:underline"
                    >
                      Industry Directory & Matrix &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 4. The Money Club strictly per Sitemap Blueprint */}
            <Link
              to="/investment-club"
              onMouseEnter={() => setActiveDropdown(null)}
              className={`h-16 flex items-center gap-1.5 px-2.5 xl:px-3 text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors ${location.pathname === '/investment-club'
                  ? 'text-[#0070C0] font-bold'
                  : 'text-slate-700 hover:text-[#0070C0]'
                }`}
            >
              <Coins className="w-3.5 h-3.5 text-[#00B0F0]" />
              <span>The Money Club</span>
            </Link>

            {/* 5. FAQs - Hover immediately closes dropdowns */}
            <Link
              to="/faqs"
              onMouseEnter={() => setActiveDropdown(null)}
              className={`h-16 flex items-center px-2.5 xl:px-3 text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors ${location.pathname === '/faqs' || location.pathname === '/faq' || (location.pathname === '/help' && location.search.includes('tab=faqs'))
                  ? 'text-[#0070C0] font-bold'
                  : 'text-slate-700 hover:text-[#0070C0]'
                }`}
            >
              FAQs
            </Link>

            {/* 6. COMPANY (Click to Toggle / Hover to Open) */}
            {/* Starts at left-0 of Company button, extends to the right so it NEVER touches FAQs on the left */}
            <div
              className="relative h-16 flex items-center"
              onMouseEnter={() => handleMouseEnter('company')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'company' ? null : 'company')}
                className={`h-16 flex items-center gap-1 px-2.5 xl:px-3 text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${location.pathname === '/company' || location.pathname === '/how-it-works' || location.pathname === '/about' || location.pathname === '/leadership'
                    ? 'text-[#0070C0] font-bold'
                    : 'text-slate-700 hover:text-[#0070C0]'
                  }`}
              >
                <span>COMPANY</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${activeDropdown === 'company' ? 'rotate-180 text-[#0070C0]' : ''}`} />
              </button>

              {/* COMPANY Dropdown Card: 9 items strictly per doc */}
              {activeDropdown === 'company' && (
                <div
                  className="absolute top-full right-0 xl:right-auto xl:left-0 mt-1 bg-white rounded-2xl shadow-2xl border border-slate-200/90 py-3.5 px-3.5 z-50"
                  style={{ width: '420px', minWidth: '400px' }}
                  onMouseEnter={() => handleMouseEnter('company')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="px-2 pb-2.5 mb-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#002060]">
                      COMPANY DEPARTMENTS
                    </span>
                    <Link
                      to="/company"
                      onClick={() => setActiveDropdown(null)}
                      className="text-xs font-bold text-[#0070C0] hover:text-[#002060] transition-colors"
                    >
                      Hub Overview &rarr;
                    </Link>
                  </div>

                  {/* 2-Column Grid: 9 items with full labels, zero truncation */}
                  <div className="grid grid-cols-2 gap-1.5">
                    {companyPages.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.label}
                          to={item.path}
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-sky-50 text-slate-700 hover:text-[#002060] transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-sky-50 text-[#0070C0] group-hover:bg-[#002060] group-hover:text-[#FFD200] flex items-center justify-center shrink-0 transition-colors border border-[#00B0F0]/15">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-bold whitespace-nowrap text-slate-800 group-hover:text-[#002060]">
                            {item.label}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>


          </nav>

          {/* Action CTAs: Apply Button (Login & Create Account moved to top bar) */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-2.5 shrink-0">
            <Link
              to="/apply"
              onMouseEnter={() => setActiveDropdown(null)}
              className="shrink-0 whitespace-nowrap inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs xl:text-sm font-black text-[#002060] bg-[#FFD200] hover:bg-[#ffe040] active:scale-95 shadow-md shadow-amber-400/25 transition-all hover:scale-[1.02] border border-amber-300 cursor-pointer"
            >
              <span>Apply</span>
              <ArrowRight className="w-4 h-4 text-[#002060] shrink-0" />
            </Link>
          </div>

          {/* Mobile menu hamburger button */}
          <div className="lg:hidden flex items-center gap-2 shrink-0">
            <Link
              to="/apply"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-black text-[#002060] bg-[#FFD200] border border-amber-300 rounded-lg whitespace-nowrap shadow-xs"
            >
              <span>Apply</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#002060]" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* 3. Mobile Navigation Drawer strictly aligned */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg max-h-[calc(100vh-5rem)] overflow-y-auto">

          {/* Home */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-bold text-slate-800 hover:bg-sky-50 hover:text-[#0070C0] transition-colors"
          >
            Home
          </Link>

          {/* Loan Types Accordion */}
          <div className="border border-slate-100 rounded-xl overflow-hidden bg-slate-50/50">
            <button
              type="button"
              onClick={() => setMobileExpandedSection(mobileExpandedSection === 'loan-types' ? null : 'loan-types')}
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-bold text-slate-800 hover:text-[#0070C0] cursor-pointer"
            >
              <span>Loan Types</span>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${mobileExpandedSection === 'loan-types' ? 'rotate-180 text-[#0070C0]' : ''}`} />
            </button>

            {mobileExpandedSection === 'loan-types' && (
              <div className="px-2 pt-1 pb-2 space-y-1 bg-white border-t border-slate-100">
                <Link
                  to="/loantypes"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-2.5 py-1.5 text-xs font-extrabold text-[#0070C0] bg-sky-50/50 rounded-lg mb-1"
                >
                  All 34 Loan Types Directory &rarr;
                </Link>
                <div className="max-h-72 overflow-y-auto space-y-1 pr-1" style={{ scrollbarWidth: 'thin' }}>
                  {all34LoanTypes.map((prog) => (
                    <Link
                      key={prog.path}
                      to={prog.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-[#0070C0] hover:bg-sky-50 rounded-lg transition-colors"
                    >
                      {prog.label}
                    </Link>
                  ))}
                </div>
                <Link
                  to="/loantypes"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-2.5 py-1.5 text-xs font-semibold text-slate-500 hover:text-[#0070C0] border-t border-slate-100 pt-2"
                >
                  Specialty Programs (Restaurants, Churches...) &rarr;
                </Link>
              </div>
            )}
          </div>

          {/* Industries Accordion */}
          <div className="border border-slate-100 rounded-xl overflow-hidden bg-slate-50/50">
            <button
              type="button"
              onClick={() => setMobileExpandedSection(mobileExpandedSection === 'industries' ? null : 'industries')}
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-bold text-slate-800 hover:text-[#0070C0] cursor-pointer"
            >
              <span>Industries</span>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${mobileExpandedSection === 'industries' ? 'rotate-180 text-[#0070C0]' : ''}`} />
            </button>

            {mobileExpandedSection === 'industries' && (
              <div className="px-2 pt-1 pb-2 space-y-1 bg-white border-t border-slate-100">
                <Link
                  to="/industries"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-2.5 py-1.5 text-xs font-extrabold text-[#0070C0] bg-sky-50/50 rounded-lg mb-1"
                >
                  All 20 Industries Directory &rarr;
                </Link>
                <div className="max-h-72 overflow-y-auto space-y-1 pr-1" style={{ scrollbarWidth: 'thin' }}>
                  {coreIndustries.map((prog) => (
                    <Link
                      key={prog.path}
                      to={prog.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-[#0070C0] hover:bg-sky-50 rounded-lg transition-colors"
                    >
                      {prog.label}
                    </Link>
                  ))}
                </div>
                <Link
                  to="/industries"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-2.5 py-1.5 text-xs font-semibold text-slate-500 hover:text-[#0070C0] border-t border-slate-100 pt-2"
                >
                  Explore Industry Matrix & Underwriting &rarr;
                </Link>
              </div>
            )}
          </div>

          {/* The Money Club */}
          <Link
            to="/investment-club"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-slate-800 hover:bg-sky-50 hover:text-[#0070C0] transition-colors"
          >
            <Coins className="w-4 h-4 text-[#00B0F0]" />
            <span>The Money Club</span>
          </Link>

          {/* FAQs */}
          <Link
            to="/faqs"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-bold text-slate-800 hover:bg-sky-50 hover:text-[#0070C0] transition-colors"
          >
            FAQs
          </Link>

          {/* COMPANY Accordion (9 items strictly per doc) */}
          <div className="border border-slate-100 rounded-xl overflow-hidden bg-slate-50/50">
            <button
              type="button"
              onClick={() => setMobileExpandedSection(mobileExpandedSection === 'company' ? null : 'company')}
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-bold text-slate-800 hover:text-[#0070C0] cursor-pointer"
            >
              <span>COMPANY</span>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${mobileExpandedSection === 'company' ? 'rotate-180 text-[#0070C0]' : ''}`} />
            </button>

            {mobileExpandedSection === 'company' && (
              <div className="px-2 pt-1 pb-2 space-y-1 bg-white border-t border-slate-100">
                <Link
                  to="/company"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-2.5 py-1.5 text-xs font-extrabold text-[#0070C0] bg-sky-50/50 rounded-lg mb-1"
                >
                  Company Overview &rarr;
                </Link>
                {companyPages.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-[#0070C0] hover:bg-sky-50 rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>


          {/* Mobile Bottom Actions */}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            <Link
              to="/apply"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#FFD200] hover:bg-[#ffe040] text-[#002060] text-sm font-black shadow-md border border-amber-300"
            >
              <span>Apply</span>
              <ArrowRight className="w-4 h-4 text-[#002060]" />
            </Link>

            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/auth/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#FFD200] hover:bg-[#ffe040] text-xs font-black text-[#002060] border border-amber-300 shadow-xs"
              >
                <LogIn className="w-3.5 h-3.5 text-[#002060]" />
                <span>Login</span>
              </Link>
              <Link
                to="/auth/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#002060] text-white text-xs font-bold hover:bg-[#001744]"
              >
                <UserPlus className="w-3.5 h-3.5 text-[#FFD200]" />
                <span>Create Account</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
