import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  User,
  UserPlus,
  LogIn,
  Building2,
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
  Coins
} from 'lucide-react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'industries' | 'company' | null
  const [mobileExpandedSection, setMobileExpandedSection] = useState(null); // 'industries' | 'company' | null

  const location = useLocation();
  const { isAuthenticated, currentRole, logout } = useApp();
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

  // Industry Loan Programs strictly per Client Sitemap Blueprint
  const industryPrograms = [
    { label: 'Restaurant Loans', path: '/loan-programs/restaurant', icon: UtensilsCrossed },
    { label: 'Food Truck Loans', path: '/loan-programs/food-truck', icon: Truck },
    { label: 'Buy A Franchise', path: '/loan-programs/franchise', icon: Store },
    { label: 'Dental Practice Financing', path: '/loan-programs/dental-practice', icon: Smile },
    { label: 'Freight & Trucking Loans', path: '/loan-programs/freight-trucking', icon: Container },
    { label: 'Hotels / Motels / Airbnb', path: '/loan-programs/hotel-motel-airbnb', icon: Building2 },
    { label: 'Church Loans', path: '/loan-programs/church-facility', icon: Landmark },
    { label: 'Fix & Flip Loans', path: '/loan-programs/fix-and-flip', icon: Hammer },
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

  const getDashboardRoute = () => {
    switch (currentRole) {
      case 'lender': return '/lender/dashboard';
      case 'rep': return '/rep/dashboard';
      case 'admin': return '/admin/dashboard';
      case 'support': return '/support/tickets';
      default: return '/borrower/dashboard';
    }
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

          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {!isAuthenticated ? (
              <span className="text-[#00B0F0] text-[10px] sm:text-[11px] font-semibold hidden sm:inline">
                Institutional Commercial Exchange
              </span>
            ) : (
              <span className="text-slate-300">
                Logged in as <strong className="text-[#FFD200] capitalize">{currentRole}</strong>
              </span>
            )}
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
              <p className="hidden sm:block text-[11px] font-bold tracking-wider text-[#0070C0] uppercase">Commercial Lending Exchange</p>
            </div>
          </Link>

          {/* Desktop Navigation Row: HOME | Loan Types | Industries | On the Money | FAQs | COMPANY */}
          <nav className="hidden lg:flex items-center h-16 gap-0.5 xl:gap-1.5">
            
            {/* 1. HOME */}
            <Link
              to="/"
              onMouseEnter={() => setActiveDropdown(null)}
              className={`h-16 flex items-center px-2.5 xl:px-3 text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors ${
                location.pathname === '/'
                  ? 'text-[#0070C0] font-bold border-b-2 border-[#0070C0]'
                  : 'text-slate-700 hover:text-[#0070C0]'
              }`}
            >
              Home
            </Link>

            {/* 2. Loan Types */}
            <Link
              to="/loan-programs"
              onMouseEnter={() => setActiveDropdown(null)}
              className={`h-16 flex items-center px-2.5 xl:px-3 text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors ${
                location.pathname === '/loan-programs' && !location.pathname.startsWith('/loan-programs/')
                  ? 'text-[#0070C0] font-bold border-b-2 border-[#0070C0]'
                  : 'text-slate-700 hover:text-[#0070C0]'
              }`}
            >
              Loan Types
            </Link>

            {/* 3. Industries (Click to Toggle / Hover to Open) */}
            <div
              className="relative h-16 flex items-center"
              onMouseEnter={() => handleMouseEnter('industries')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'industries' ? null : 'industries')}
                className={`h-16 flex items-center gap-1 px-2.5 xl:px-3 text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  location.pathname === '/industries' || location.pathname.startsWith('/loan-programs/')
                    ? 'text-[#0070C0] font-bold border-b-2 border-[#0070C0]'
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
                  style={{ width: '420px', minWidth: '400px' }}
                  onMouseEnter={() => handleMouseEnter('industries')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="px-2 pb-2.5 mb-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#002060]">
                      Commercial Loans by Industry
                    </span>
                    <Link
                      to="/industries"
                      onClick={() => setActiveDropdown(null)}
                      className="text-xs font-bold text-[#0070C0] hover:text-[#002060] transition-colors"
                    >
                      All 8 Programs &rarr;
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    {industryPrograms.map((prog) => {
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
                          <span className="text-xs font-bold whitespace-nowrap text-slate-800 group-hover:text-[#002060]">
                            {prog.label}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 4. On the Money strictly per Sitemap doc */}
            <Link
              to="/investment-club"
              onMouseEnter={() => setActiveDropdown(null)}
              className={`h-16 flex items-center gap-1.5 px-2.5 xl:px-3 text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors ${
                location.pathname === '/investment-club'
                  ? 'text-[#0070C0] font-bold border-b-2 border-[#0070C0]'
                  : 'text-slate-700 hover:text-[#0070C0]'
              }`}
            >
              <Coins className="w-3.5 h-3.5 text-[#00B0F0]" />
              <span>On the Money</span>
            </Link>

            {/* 5. FAQs - Hover immediately closes dropdowns */}
            <Link
              to="/faqs"
              onMouseEnter={() => setActiveDropdown(null)}
              className={`h-16 flex items-center px-2.5 xl:px-3 text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors ${
                location.pathname === '/faqs' || location.pathname === '/faq' || (location.pathname === '/help' && location.search.includes('tab=faqs'))
                  ? 'text-[#0070C0] font-bold border-b-2 border-[#0070C0]'
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
                className={`h-16 flex items-center gap-1 px-2.5 xl:px-3 text-xs xl:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  location.pathname === '/company' || location.pathname === '/how-it-works' || location.pathname === '/about' || location.pathname === '/leadership'
                    ? 'text-[#0070C0] font-bold border-b-2 border-[#0070C0]'
                    : 'text-slate-700 hover:text-[#0070C0]'
                }`}
              >
                <span>COMPANY</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${activeDropdown === 'company' ? 'rotate-180 text-[#0070C0]' : ''}`} />
              </button>

              {/* COMPANY Dropdown Card: 9 items strictly per doc */}
              {activeDropdown === 'company' && (
                <div
                  className="absolute top-full left-0 mt-1 bg-white rounded-2xl shadow-2xl border border-slate-200/90 py-3.5 px-3.5 z-50"
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

          {/* Action CTAs: Only Login & Create Account */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-2.5 shrink-0">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/auth/login"
                  onMouseEnter={() => setActiveDropdown(null)}
                  className="shrink-0 whitespace-nowrap inline-flex items-center gap-1.5 px-3.5 py-2 text-xs xl:text-sm font-bold text-[#002060] hover:text-[#0070C0] bg-sky-50/70 hover:bg-sky-100 border border-[#00B0F0]/40 rounded-xl transition-all shadow-xs"
                >
                  <LogIn className="w-4 h-4 text-[#0070C0] shrink-0" />
                  <span>Login</span>
                </Link>

                <Link
                  to="/auth/register"
                  onMouseEnter={() => setActiveDropdown(null)}
                  className="shrink-0 whitespace-nowrap inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs xl:text-sm font-extrabold text-[#002060] bg-[#FFD200] hover:bg-[#ffe040] active:scale-95 shadow-xs transition-all hover:scale-[1.01] border border-amber-300"
                >
                  <UserPlus className="w-4 h-4 shrink-0 text-[#002060]" />
                  <span>Create Account</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={getDashboardRoute()}
                  className="shrink-0 whitespace-nowrap inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-800 hover:text-[#0070C0] bg-white hover:bg-slate-50 rounded-xl transition-all border border-slate-300 shadow-xs"
                >
                  <User className="w-4 h-4 text-[#0070C0] shrink-0" />
                  <span>Dashboard</span>
                </Link>

                <Link
                  to="/borrower/applications/new"
                  className="shrink-0 whitespace-nowrap inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#002060] bg-[#FFD200] hover:bg-[#F5C500] rounded-xl transition-colors shadow-xs"
                >
                  <span>New Loan</span>
                </Link>

                <button
                  onClick={logout}
                  className="shrink-0 px-2.5 py-1.5 text-xs font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>

          {/* Mobile menu hamburger button */}
          <div className="lg:hidden flex items-center gap-2 shrink-0">
            {!isAuthenticated ? (
              <Link
                to="/auth/login"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-[#002060] bg-sky-50 border border-[#00B0F0]/30 rounded-lg whitespace-nowrap"
              >
                <LogIn className="w-3.5 h-3.5 text-[#0070C0] shrink-0" />
                <span>Login</span>
              </Link>
            ) : (
              <Link
                to={getDashboardRoute()}
                className="p-1.5 text-slate-600 hover:text-[#0070C0] rounded-lg"
                title="Dashboard"
              >
                <User className="w-5 h-5 text-[#0070C0]" />
              </Link>
            )}
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

          {/* Loan Types */}
          <Link
            to="/loan-programs"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-bold text-slate-800 hover:bg-sky-50 hover:text-[#0070C0] transition-colors"
          >
            Loan Types
          </Link>

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
                  All Industries Overview &rarr;
                </Link>
                {industryPrograms.map((prog) => (
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
            )}
          </div>

          {/* On the Money */}
          <Link
            to="/investment-club"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-slate-800 hover:bg-sky-50 hover:text-[#0070C0] transition-colors"
          >
            <Coins className="w-4 h-4 text-[#00B0F0]" />
            <span>On the Money</span>
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
            {!isAuthenticated ? (
              <>
                <Link
                  to="/auth/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-800 bg-slate-50 hover:bg-slate-100"
                >
                  <LogIn className="w-4 h-4 text-[#0070C0]" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/auth/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#FFD200] hover:bg-[#ffe040] text-[#002060] text-sm font-extrabold shadow-md border border-amber-300"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Create Account</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={getDashboardRoute()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-[#0070C0] text-white text-sm font-semibold shadow-md"
                >
                  Open Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 cursor-pointer"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
