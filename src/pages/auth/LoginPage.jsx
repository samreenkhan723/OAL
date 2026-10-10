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
  Sparkles
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
      description: 'Compliance & super operations',
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-200'
    },
    {
      role: 'OAL Rep',
      name: 'Elena Rostova',
      email: 'elena.rostova@oalnetwork.com',
      description: 'Fiduciary placement agent',
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      role: 'Support',
      name: 'Alex Chen',
      email: 'support@oalnetwork.com',
      description: 'Help Desk ticket specialist',
      badgeClass: 'bg-teal-50 text-teal-700 border-teal-200'
    },
    {
      role: 'Lender',
      name: 'Apex Horizon Capital LLC',
      email: 'underwriting@apexhorizoncap.com',
      description: 'Institutional capital partner',
      badgeClass: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      role: 'Borrower',
      name: 'Marcus Vance',
      email: 'marcus@blueharborseafood.com',
      description: 'Commercial loan applicant',
      badgeClass: 'bg-blue-50 text-blue-700 border-blue-200'
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
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* LEFT COLUMN: Visual Brand Showcase with Distinct Nighttime Global Debt Exchange Imagery (Balanced 50%) */}
      <div className="relative hidden md:flex md:w-1/2 bg-[#002060] flex-col justify-between p-8 lg:p-12 xl:p-16 text-white overflow-hidden shrink-0">
        {/* Background Image with Cinematic Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/login_hero.jpg"
            alt="OAL Global Debt Exchange"
            className="w-full h-full object-cover object-center filter brightness-95"
          />
          {/* Deep Navy/Black Luxury Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#002060] via-[#002060]/90 to-[#002060]/80" />
          <div className="absolute inset-0 bg-radial-at-t from-[#00B0F0]/25 via-transparent to-transparent" />
        </div>

        {/* Top Header / Logo */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#002060] to-[#0070C0] border border-[#FFD200]/50 flex items-center justify-center text-white shadow-lg">
              <ShieldCheck className="w-5 h-5 text-[#FFD200]" />
            </div>
            <div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-white block">
                OPM <span className="text-[#00B0F0]">ASAP</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#FFD200] block -mt-1">
                Commercial Lending NetWORK
              </span>
            </div>
          </Link>
        </div>

        {/* Center Content / Value Propositions */}
        <div className="relative z-10 space-y-6 my-auto py-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#00B0F0]/30 text-[#FFD200] text-xs font-bold tracking-wide backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#00B0F0]" />
            <span>24–72 Hr Funding &bull; $10k to $500M+ &bull; All 50 States</span>
          </div>

          <h1 className="text-3xl xl:text-4xl font-heading font-extrabold text-white leading-tight">
            Institutional Commercial Lending & Debt Exchange
          </h1>

          <p className="text-sm text-slate-200 leading-relaxed max-w-md">
            Secure multi-role portal connecting verified business borrowers with institutional underwriters, fiduciaries, and debt capital partners.
          </p>

          {/* Feature Highlights */}
          <div className="space-y-3.5 pt-2">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#00B0F0]/20 border border-[#00B0F0]/40 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00B0F0]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Live Marketplace Deal Feed</h4>
                <p className="text-[11px] text-slate-300 mt-0.5">Instant anonymized borrower profiles with verified financial underwriting data.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Strict Working Deal Exclusivity</h4>
                <p className="text-[11px] text-slate-300 mt-0.5">Capped at maximum 3 lenders per deal under Rule FR-08.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FFD200]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">180-Point Investment IQ</h4>
                <p className="text-[11px] text-slate-300 mt-0.5">Standardized 5-pillar scoring for rapid underwriter eligibility matching.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Card */}
        <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#FFD200]" />
            <span className="text-[11px] font-semibold text-slate-300">USA Patriot Act Compliant</span>
          </div>
          <span className="text-[10px] text-slate-400 uppercase font-mono">256-Bit TLS</span>
        </div>
      </div>

      {/* RIGHT COLUMN: The Sign In Form (Balanced 50%) */}
      <div className="w-full md:w-1/2 flex flex-col justify-between p-6 sm:p-8 lg:p-10 relative overflow-y-auto">
        {/* Top bar with Back button */}
        <div className="flex items-center justify-between w-full max-w-md mx-auto mb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-blue-600 bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs hover:shadow-xs transition-all group"
            title="Back to Landing Page"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5 text-slate-500 group-hover:text-blue-600" />
            <span>Back to</span>
          </Link>

          {/* Mobile Logo */}
          <div className="md:hidden">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#0B1730] flex items-center justify-center text-white">
                <ShieldCheck className="w-4 h-4 text-[#D5B66A]" />
              </div>
              <span className="font-heading font-extrabold text-sm text-[#0B1730]">
                OAL <span className="text-blue-600">NETWORK</span>
              </span>
            </Link>
          </div>
        </div>

        {/* Center Form Card */}
        <div className="w-full max-w-md mx-auto my-auto">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl p-6 sm:p-7 space-y-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
                Sign In to Your Account
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Secure access to your commercial lending and underwriting portal.
              </p>
            </div>

            {/* Selected Program Announcement Banner */}
            {programSlug && (
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-2.5 text-xs text-blue-900">
                <ShieldCheck className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold block text-blue-950">
                    Applying for {programTitle || programSlug}
                  </strong>
                  <span className="text-blue-800">
                    Sign in below to proceed directly into the 6-step application wizard with this loan program pre-selected.
                  </span>
                </div>
              </div>
            )}

            {/* Notice when redirected from protected destination (e.g. Apply for a Loan) */}
            {fromLocation && !programSlug && (
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-2.5 text-xs text-blue-900">
                <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold block">Authentication Required</strong>
                  <span>{location.state?.message || 'Please sign in to proceed directly to your commercial loan application.'}</span>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-800">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Quick Demo Credentials Autofill Selector */}
            <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5 text-[11px]">
                  <KeyRound className="w-3.5 h-3.5 text-blue-600" />
                  Demo Credentials (Click to fill)
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Password: Password123!</span>
              </div>

              <div className="grid grid-cols-6 gap-1.5">
                {demoAccounts.map((acc, idx) => {
                  const isSelected = selectedDemoEmail === acc.email;
                  const colSpanClass = idx < 3 ? 'col-span-2' : 'col-span-3';
                  return (
                    <button
                      key={acc.role}
                      type="button"
                      onClick={() => handleSelectDemoAccount(acc)}
                      className={`${colSpanClass} py-2 px-2.5 rounded-lg text-xs font-semibold text-center transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border-slate-200 shadow-2xs'
                      }`}
                      title={`${acc.role}: ${acc.name} (${acc.email})`}
                    >
                      {acc.role}
                    </button>
                  );
                })}
              </div>

              {selectedDemoEmail && (
                <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-200/60">
                  <span className="truncate">Active: <strong className="text-slate-800">{demoAccounts.find(a => a.email === selectedDemoEmail)?.name}</strong></span>
                  <span className="text-emerald-600 font-semibold flex items-center gap-1 shrink-0">
                    <Check className="w-3 h-3" /> Credentials Filled
                  </span>
                </div>
              )}
            </div>

            {/* Clean Professional Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setSelectedDemoEmail('');
                    }}
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotModal(true);
                      setForgotSubmitted(false);
                    }}
                    className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-xs text-slate-600">Remember this device</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer hover:shadow-lg hover:shadow-blue-600/35"
              >
                {loading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Registration link */}
            <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
              Don't have an account yet?{' '}
              <Link
                to="/auth/register"
                state={{ from: fromLocation, program: programSlug, programTitle }}
                className="font-bold text-blue-600 hover:text-blue-700 hover:underline"
              >
                Create an Account
              </Link>
            </div>
          </div>
        </div>

        {/* Security badge footer */}
        <div className="w-full max-w-md mx-auto mt-6 text-center text-[11px] text-slate-400 flex items-center justify-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>256-Bit TLS Encryption &bull; SOC2 Certified &bull; OAL Network</span>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Reset Your Password</h3>
              </div>
              <button
                onClick={() => setShowForgotModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {forgotSubmitted ? (
              <div className="py-4 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Recovery Instructions Dispatched</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  If an account exists for <strong className="text-slate-900">{forgotEmail}</strong>, password reset instructions have been forwarded to your email.
                </p>
                <button
                  onClick={() => setShowForgotModal(false)}
                  className="mt-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors"
                >
                  Back to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Enter your registered institutional or borrower email address. We will send a secure password reset link.
                </p>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs"
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
