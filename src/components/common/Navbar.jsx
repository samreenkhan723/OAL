import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  User,
  LogIn,
  Building2,
  Sparkles,
  Phone,
  HelpCircle,
  FileText
} from 'lucide-react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, currentRole, logout } = useApp();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Loan Types', path: '/loan-programs' },
    { label: 'The Money Club', path: '/investment-club' },
    { label: 'Company', path: '/company' },
    { label: 'Tools & Resources', path: '/tools' },
    { label: 'ISO Program', path: '/iso-program' },
    { label: 'FAQs & Help', path: '/help' },
  ];

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
    <header className="sticky top-0 z-50 bg-white shadow-xs border-b border-slate-200">
      {/* 1. Client Blueprint Top Strip: OPM ASAP Loans NetWORK */}
      <div className="bg-[#002060] text-white text-[11px] font-medium py-1.5 px-4 sm:px-8 border-b border-[#00B0F0]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4 truncate">
            <span className="font-extrabold tracking-wider text-[#FFD200] uppercase text-[10px] sm:text-[11px]">
              OPM ASAP Loans NetWORK
            </span>
            <span className="text-[#00B0F0] hidden sm:inline">•</span>
            <span className="text-slate-200 hidden sm:inline">Servicing All 50 States</span>
            <span className="text-[#00B0F0] hidden md:inline">•</span>
            <span className="text-slate-300 hidden md:inline">$10k to $500M+ &bull; 24–72 Hr Funding</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/auth/login"
                  className="text-slate-200 hover:text-[#FFD200] transition-colors font-semibold"
                >
                  [ Login ]
                </Link>
                <Link
                  to="/auth/register"
                  className="text-[#FFD200] hover:text-white transition-colors font-bold"
                >
                  [ Create Account ]
                </Link>
              </>
            ) : (
              <span className="text-slate-300">
                Logged in as <strong className="text-[#FFD200] capitalize">{currentRole}</strong>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Navbar */}
      <div className="w-full px-3.5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <Link to="/" className="shrink-0 flex items-center gap-2 sm:gap-3 group">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#002060] via-[#0070C0] to-[#00B0F0] flex items-center justify-center text-white shadow-md shadow-blue-900/15 group-hover:scale-105 transition-transform shrink-0 border border-[#00B0F0]/30">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFD200]" />
            </div>
            <div>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-[#002060]">OAL</span>
                <span className="font-heading font-semibold text-lg sm:text-xl tracking-tight text-[#0070C0]">NETWORK</span>
              </div>
              <p className="hidden sm:block text-[10px] font-bold tracking-wider text-[#00B0F0] uppercase">Commercial Lending Exchange</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center h-20 gap-1 xl:gap-2">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`h-20 flex items-center px-2.5 xl:px-3 text-xs xl:text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'text-[#0070C0] font-bold border-b-2 border-[#0070C0]'
                      : 'text-slate-600 hover:text-[#0070C0]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-2.5 xl:gap-3 shrink-0">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/auth/login"
                  className="shrink-0 whitespace-nowrap inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs xl:text-sm font-bold text-[#002060] hover:text-[#0070C0] bg-sky-50/60 hover:bg-sky-50 border border-[#00B0F0]/30 rounded-xl transition-all shadow-2xs"
                >
                  <LogIn className="w-4 h-4 text-[#0070C0] shrink-0" />
                  <span>Sign In</span>
                </Link>

                <Link
                  to="/apply"
                  className="shrink-0 whitespace-nowrap inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs xl:text-sm font-extrabold text-[#002060] bg-[#FFD200] hover:bg-[#F5C500] active:scale-95 shadow-md shadow-amber-400/20 transition-all hover:shadow-lg hover:shadow-amber-400/30 hover:-translate-y-0.5 border border-amber-300"
                >
                  <span>Apply for a Loan</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={getDashboardRoute()}
                  className="shrink-0 whitespace-nowrap inline-flex items-center gap-2 px-4 py-2.5 text-xs xl:text-sm font-semibold text-slate-800 hover:text-[#0070C0] bg-white hover:bg-slate-50 rounded-xl transition-all border border-slate-300 shadow-xs"
                >
                  <User className="w-4 h-4 text-[#0070C0] shrink-0" />
                  <span>Dashboard</span>
                </Link>

                <Link
                  to="/borrower/applications/new"
                  className="shrink-0 whitespace-nowrap inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-[#002060] bg-[#FFD200] hover:bg-[#F5C500] rounded-xl transition-colors shadow-xs"
                >
                  <span>New Loan</span>
                </Link>

                <button
                  onClick={logout}
                  className="shrink-0 px-3 py-2 text-xs font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2 shrink-0">
            {!isAuthenticated ? (
              <Link
                to="/auth/login"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#002060] bg-sky-50 border border-[#00B0F0]/30 rounded-lg whitespace-nowrap"
              >
                <LogIn className="w-3.5 h-3.5 text-[#0070C0] shrink-0" />
                <span>Sign In</span>
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
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg max-h-[calc(100vh-5rem)] overflow-y-auto">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:bg-sky-50 hover:text-[#0070C0] transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/auth/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-800 bg-slate-50 hover:bg-slate-100"
                >
                  <LogIn className="w-4 h-4 text-[#0070C0]" />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/apply"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#FFD200] hover:bg-[#F5C500] text-[#002060] text-sm font-bold shadow-md"
                >
                  <span>Apply for a Loan</span>
                  <ArrowRight className="w-4 h-4" />
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

