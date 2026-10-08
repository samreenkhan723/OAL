import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, ChevronDown, Menu, X, ArrowRight, User, LogIn } from 'lucide-react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, currentRole, currentUser, logout } = useApp();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Loan Programs', path: '/loan-programs' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'Investment IQ', path: '/investment-iq' },
    { label: 'Investment Club', path: '/investment-club' },
    { label: 'Help Desk / FAQ', path: '/help' },
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="shrink-0 flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0B1730] to-[#172B4D] flex items-center justify-center text-white shadow-md shadow-blue-900/10 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 text-[#D5B66A]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-xl tracking-tight text-[#0B1730]">OAL</span>
                <span className="font-heading font-semibold text-xl tracking-tight text-blue-600">NETWORK</span>
              </div>
              <p className="text-[10px] font-medium tracking-wider text-slate-500 uppercase">Commercial Lending Exchange</p>
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
                  className={`h-20 flex items-center px-2.5 xl:px-3.5 text-xs xl:text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'text-blue-600 font-bold'
                      : 'text-slate-600 hover:text-blue-600'
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
                  className="shrink-0 whitespace-nowrap inline-flex items-center gap-2 px-4 py-2.5 text-xs xl:text-sm font-bold text-slate-800 bg-white hover:bg-slate-50 hover:text-blue-600 border border-slate-300 hover:border-blue-400 rounded-xl transition-all shadow-xs hover:shadow-sm"
                >
                  <LogIn className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Sign In</span>
                </Link>

                <Link
                  to="/apply"
                  className="shrink-0 whitespace-nowrap inline-flex items-center gap-2 px-4.5 xl:px-5 py-2.5 rounded-xl text-xs xl:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-600/20 transition-all hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5"
                >
                  <span>Apply for a Loan</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={getDashboardRoute()}
                  className="shrink-0 whitespace-nowrap inline-flex items-center gap-2 px-4 py-2.5 text-xs xl:text-sm font-semibold text-slate-800 hover:text-blue-600 bg-white hover:bg-slate-50 rounded-xl transition-all border border-slate-300 shadow-xs"
                >
                  <User className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Dashboard</span>
                </Link>

                <Link
                  to="/borrower/applications/new"
                  className="shrink-0 whitespace-nowrap inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-xs"
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
          <div className="lg:hidden flex items-center gap-2">
            {!isAuthenticated ? (
              <Link
                to="/auth/login"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-800 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
              >
                <LogIn className="w-3.5 h-3.5 text-blue-600" />
                <span>Sign In</span>
              </Link>
            ) : (
              <Link
                to={getDashboardRoute()}
                className="p-2 text-slate-600 hover:text-blue-600 rounded-lg"
                title="Dashboard"
              >
                <User className="w-5 h-5 text-blue-600" />
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100 hover:text-blue-600 transition-colors"
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
                  <LogIn className="w-4 h-4 text-blue-600" />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/borrower/applications/new"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-600/20"
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
                  className="w-full text-center py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-md"
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
