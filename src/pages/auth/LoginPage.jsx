import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { LOAN_PROGRAMS } from '../../data/loanPrograms';
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  X,
  Info,
  KeyRound,
  Check,
  Sparkles,
  Eye,
  EyeOff,
  Building2,
  Scale
} from 'lucide-react';

export const LoginPage = () => {
  const { login } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  // Destination intended before redirect
  const fromLocation = location.state?.from;
  const searchParams = new URLSearchParams(location.search);
  const programSlug = location.state?.program || searchParams.get('program');
  const programTitle =
    location.state?.programTitle ||
    LOAN_PROGRAMS.find((p) => p.id === programSlug || p.slug === programSlug)?.title;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  const [selectedDemoEmail, setSelectedDemoEmail] = useState('');

  const demoAccounts = [
    {
      role: 'Admin',
      name: 'Victoria Sterling',
      email: 'v.sterling@oalnetwork.com',
      description: 'Compliance & super operations'
    },
    {
      role: 'OAL Rep',
      name: 'Elena Rostova',
      email: 'elena.rostova@oalnetwork.com',
      description: 'Fiduciary placement agent'
    },
    {
      role: 'Support',
      name: 'Alex Chen',
      email: 'support@oalnetwork.com',
      description: 'Help Desk ticket specialist'
    },
    {
      role: 'Lender',
      name: 'Apex Horizon Capital LLC',
      email: 'underwriting@apexhorizoncap.com',
      description: 'Institutional capital partner'
    },
    {
      role: 'Borrower',
      name: 'Marcus Vance',
      email: 'marcus@blueharborseafood.com',
      description: 'Commercial loan applicant'
    }
  ];

  const handleSelectDemoAccount = (acc) => {
    setEmail(acc.email);
    setPassword('Password123!');
    setSelectedDemoEmail(acc.email);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please provide both your registered email address and password.');
      return;
    }

    setLoading(true);

    // Mock authentication
    setTimeout(() => {
      const result = login(email, password);
      setLoading(false);

      if (result.success) {
        const userRole = result.user?.role;

        // Redirect logic preserving intended destination
        if (userRole === 'borrower') {
          let dest = '/borrower/dashboard';

          if (typeof fromLocation === 'string' && fromLocation.startsWith('/borrower')) {
            dest = fromLocation;
          } else if (fromLocation?.pathname && fromLocation.pathname.startsWith('/borrower')) {
            dest = fromLocation.pathname + (fromLocation.search || '');
          } else if (programSlug) {
            dest = `/borrower/applications/new?program=${programSlug}`;
          }

          if (programSlug && !dest.includes('program=')) {
            dest += (dest.includes('?') ? '&' : '?') + `program=${programSlug}`;
          }

          navigate(dest, { replace: true });
        } else if (userRole === 'lender') {
          navigate('/lender/dashboard', { replace: true });
        } else if (userRole === 'rep') {
          navigate('/rep/dashboard', { replace: true });
        } else if (userRole === 'admin') {
          navigate('/admin/dashboard', { replace: true });
        } else if (userRole === 'support') {
          navigate('/support/tickets', { replace: true });
        } else {
          navigate('/borrower/dashboard', { replace: true });
        }
      } else {
        setError(result.error || 'Authentication failed. Please verify your credentials.');
      }
    }, 250);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (forgotEmail.trim()) {
      setForgotSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F9FF] flex flex-col lg:flex-row antialiased">
      {/* LEFT COLUMN: Visual Brand Showcase (Split 50% on desktop) */}
      <div className="relative hidden lg:flex lg:w-1/2 bg-[#002060] flex-col justify-between p-10 xl:p-14 text-white overflow-hidden shrink-0">
        {/* Background Image with Luminous Corporate Gradient (Image remains clearly visible) */}
        <div className="absolute inset-0 z-0">
          <img
            src="/login_hero.jpg"
            alt="OAL Commercial Debt Exchange"
            className="w-full h-full object-cover object-center filter brightness-105 contrast-105"
          />
          {/* Luminous Brand Gradient Overlay — Navy depth with light-blue glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#001744]/95 via-[#002060]/75 to-[#0070C0]/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002060]/90 via-[#003B8E]/65 to-transparent" />
          {/* Subtle cyan glow for depth */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00B0F0]/20 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Top Header / Logo */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#002060] to-[#0070C0] border border-[#FFD200]/70 flex items-center justify-center text-white shadow-xl group-hover:border-[#FFD200] transition-colors">
              <ShieldCheck className="w-6 h-6 text-[#FFD200]" />
            </div>
            <div>
              <span className="font-heading font-extrabold text-2xl tracking-tight text-white block leading-none">
                OPM <span className="text-[#00B0F0]">ASAP</span>
              </span>
              <span className="text-[11px] uppercase font-bold tracking-widest text-[#FFD200] block mt-1">
                Commercial Lending NetWORK
              </span>
            </div>
          </Link>
        </div>

        {/* Center Content / Value Proposition */}
        <div className="relative z-10 space-y-7 my-auto py-8 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[#FFD200] text-xs font-bold tracking-wide shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#00B0F0]" />
            <span>24–72 Hr Funding &bull; $10k to $500M+ &bull; All 50 States</span>
          </div>

          <h1 className="text-3xl sm:text-4xl xl:text-5xl font-heading font-extrabold text-white leading-[1.15] tracking-tight">
            Institutional Commercial Lending &amp; Debt Exchange
          </h1>

          <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-normal">
            Secure multi-role clearinghouse connecting verified business borrowers with institutional underwriters, fiduciaries, and accredited debt capital partners.
          </p>

          {/* 3 Frosted Glass Trust Cards */}
          <div className="space-y-3 pt-1">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-start gap-3.5 hover:bg-white/15 transition-all">
              <div className="w-8 h-8 rounded-xl bg-[#00B0F0]/25 border border-[#00B0F0]/50 flex items-center justify-center shrink-0 mt-0.5">
                <Building2 className="w-4 h-4 text-[#00B0F0]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white">Live Marketplace Deal Feed</h4>
                <p className="text-xs text-slate-200 mt-0.5 leading-snug">Instant anonymized borrower profiles with verified financial underwriting data.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-start gap-3.5 hover:bg-white/15 transition-all">
              <div className="w-8 h-8 rounded-xl bg-amber-400/25 border border-amber-400/50 flex items-center justify-center shrink-0 mt-0.5">
                <Scale className="w-4 h-4 text-[#FFD200]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white">Rule FR-08: Max 3 Working Deals</h4>
                <p className="text-xs text-slate-200 mt-0.5 leading-snug">Strict 3-lender concurrency limit protecting borrower credit and eliminating predatory bidding.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-start gap-3.5 hover:bg-white/15 transition-all">
              <div className="w-8 h-8 rounded-xl bg-[#00B0F0]/25 border border-[#00B0F0]/50 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-[#00B0F0]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white">180-Point Investment IQ Formula</h4>
                <p className="text-xs text-slate-200 mt-0.5 leading-snug">Standardized 5-pillar mathematical scoring across Credit, Cash Flow, and Collateral.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust & Compliance Bar */}
        <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-slate-200">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#FFD200]" />
            <span className="font-semibold text-white">USA Patriot Act Compliant</span>
          </div>
          <span className="text-[11px] text-slate-300 font-mono tracking-wider uppercase">256-Bit TLS Bank Encryption</span>
        </div>
      </div>

      {/* RIGHT COLUMN: The Sign In Form (Split 50% on desktop) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16 relative overflow-y-auto bg-gradient-to-b from-[#F0F9FF] to-white">
        {/* Top bar with Back button and Mobile Logo */}
        <div className="flex items-center justify-between w-full max-w-[460px] mx-auto mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#002060] hover:text-[#0070C0] bg-white hover:bg-sky-50/80 border border-slate-200/90 shadow-xs hover:shadow-sm transition-all group"
            title="Back to Homepage"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5 text-[#0070C0]" />
            <span>Back to Home</span>
          </Link>

          {/* Mobile Logo (Visible on mobile & tablet) */}
          <div className="lg:hidden">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#002060] flex items-center justify-center text-white shadow-sm border border-[#FFD200]/50">
                <ShieldCheck className="w-4 h-4 text-[#FFD200]" />
              </div>
              <span className="font-heading font-extrabold text-base text-[#002060]">
                OAL <span className="text-[#00B0F0]">NETWORK</span>
              </span>
            </Link>
          </div>
        </div>

        {/* Center Form Card */}
        <div className="w-full max-w-[460px] mx-auto my-auto py-2">
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/60 p-7 sm:p-9 space-y-6">
            <div>
              <div className="inline-block px-2.5 py-0.5 rounded-md bg-sky-50 text-[#0070C0] text-[11px] font-bold uppercase tracking-wider mb-2">
                Authentication Portal
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#002060] tracking-tight">
                Sign In to Your Account
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Secure access to your commercial debt underwriting &amp; lending exchange.
              </p>
            </div>

            {/* Selected Program Announcement Banner */}
            {programSlug && (
              <div className="p-4 rounded-2xl bg-sky-50 border border-[#00B0F0]/40 flex items-start gap-3 text-xs text-[#002060]">
                <ShieldCheck className="w-5 h-5 text-[#0070C0] shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold block text-[#002060] text-sm">
                    Applying for {programTitle || programSlug}
                  </strong>
                  <span className="text-slate-600 mt-0.5 block leading-relaxed">
                    Sign in below to proceed directly into the 6-step application wizard with this loan program pre-selected.
                  </span>
                </div>
              </div>
            )}

            {/* Notice when redirected from protected destination */}
            {fromLocation && !programSlug && (
              <div className="p-4 rounded-2xl bg-sky-50 border border-[#00B0F0]/30 flex items-start gap-3 text-xs text-[#002060]">
                <Info className="w-5 h-5 text-[#0070C0] shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold block text-sm">Authentication Required</strong>
                  <span className="text-slate-600 leading-relaxed">
                    {location.state?.message || 'Please sign in to proceed directly to your commercial loan application.'}
                  </span>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-xs text-rose-800">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{error}</span>
              </div>
            )}

            {/* Quick Demo Credentials Autofill Selector */}
            <div className="p-4 bg-slate-50/90 rounded-2xl border border-slate-200/90 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#002060] flex items-center gap-1.5 text-xs">
                  <KeyRound className="w-4 h-4 text-[#0070C0]" />
                  <span>Demo Access (Click to auto-fill)</span>
                </span>
                <span className="text-[11px] text-slate-500 font-mono">PW: Password123!</span>
              </div>

              <div className="grid grid-cols-6 gap-2">
                {demoAccounts.map((acc, idx) => {
                  const isSelected = selectedDemoEmail === acc.email;
                  const colSpanClass = idx < 3 ? 'col-span-2' : 'col-span-3';
                  return (
                    <button
                      key={acc.role}
                      type="button"
                      onClick={() => handleSelectDemoAccount(acc)}
                      className={`${colSpanClass} py-2 px-2.5 rounded-xl text-xs font-bold text-center transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-[#002060] text-white border-[#002060] shadow-sm'
                          : 'bg-white hover:bg-sky-50/80 text-slate-700 hover:text-[#0070C0] border-slate-200 shadow-2xs hover:border-[#00B0F0]/40'
                      }`}
                      title={`${acc.role}: ${acc.name} (${acc.email})`}
                    >
                      {acc.role}
                    </button>
                  );
                })}
              </div>

              {selectedDemoEmail && (
                <div className="text-[11px] text-slate-600 flex items-center justify-between pt-1.5 border-t border-slate-200">
                  <span className="truncate">
                    Active: <strong className="text-[#002060]">{demoAccounts.find(a => a.email === selectedDemoEmail)?.name}</strong>
                  </span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1 shrink-0">
                    <Check className="w-3.5 h-3.5" /> Filled
                  </span>
                </div>
              )}
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#002060] mb-1.5">
                  Business Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setSelectedDemoEmail('');
                    }}
                    className="w-full pl-11 pr-4 h-12 text-sm sm:text-base border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0070C0] focus:border-[#0070C0] outline-none transition-all placeholder:text-slate-400 bg-white"
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs sm:text-sm font-bold text-[#002060]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotModal(true);
                      setForgotSubmitted(false);
                    }}
                    className="text-xs sm:text-sm font-semibold text-[#0070C0] hover:text-[#002060] hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-11 h-12 text-sm sm:text-base border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0070C0] focus:border-[#0070C0] outline-none transition-all placeholder:text-slate-400 bg-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-[#0070C0] focus:ring-[#0070C0] cursor-pointer"
                  />
                  <span className="text-xs sm:text-sm text-slate-700 font-medium">Remember this device</span>
                </label>
              </div>

              {/* Primary Sign In CTA Button with Signature High-Contrast OAL Yellow (#FFD200) */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl text-sm sm:text-base font-heading font-extrabold text-[#002060] bg-[#FFD200] hover:bg-[#F5C500] active:bg-[#E5B500] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
              >
                {loading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Sign In to Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Registration link */}
            <div className="text-center text-xs sm:text-sm text-slate-600 pt-3 border-t border-slate-100">
              Don't have an account yet?{' '}
              <Link
                to="/auth/register"
                state={{ from: fromLocation, program: programSlug, programTitle }}
                className="font-bold text-[#0070C0] hover:text-[#002060] hover:underline"
              >
                Create an Account &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Security badge footer */}
        <div className="w-full max-w-[460px] mx-auto mt-6 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>256-Bit TLS Encryption &bull; SOC2 Certified &bull; OAL Network</span>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-7 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0070C0] flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#002060]">Reset Your Password</h3>
                  <p className="text-xs text-slate-500">OAL Identity Access</p>
                </div>
              </div>
              <button
                onClick={() => setShowForgotModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {forgotSubmitted ? (
              <div className="py-4 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-[#002060]">Recovery Instructions Dispatched</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  If an account exists for <strong className="text-slate-900">{forgotEmail}</strong>, password reset instructions have been forwarded to your email.
                </p>
                <button
                  onClick={() => setShowForgotModal(false)}
                  className="mt-3 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Back to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Enter your registered institutional or borrower business email address. We will send a secure password reset link.
                </p>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#002060] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full px-4 h-12 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0070C0] outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#FFD200] hover:bg-[#F5C500] text-[#002060] text-xs sm:text-sm font-extrabold rounded-xl shadow-xs cursor-pointer"
                  >
                    Send Recovery Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
