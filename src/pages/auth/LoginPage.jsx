import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
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
  Check
} from 'lucide-react';

export const LoginPage = () => {
  const { login } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  // Destination intended before redirect
  const fromLocation = location.state?.from;

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
      role: 'Borrower',
      name: 'Marcus Vance',
      email: 'marcus@blueharborseafood.com',
      description: 'Commercial loan applicant',
      badgeClass: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      role: 'Lender',
      name: 'Apex Horizon Capital LLC',
      email: 'underwriting@apexhorizoncap.com',
      description: 'Institutional capital partner',
      badgeClass: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      role: 'OAL Rep',
      name: 'Elena Rostova',
      email: 'elena.rostova@oalnetwork.com',
      description: 'Fiduciary placement agent',
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      role: 'Admin',
      name: 'Victoria Sterling',
      email: 'v.sterling@oalnetwork.com',
      description: 'Compliance & super operations',
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-200'
    },
    {
      role: 'Support',
      name: 'Alex Chen',
      email: 'support@oalnetwork.com',
      description: 'Help Desk ticket specialist',
      badgeClass: 'bg-teal-50 text-teal-700 border-teal-200'
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
          if (fromLocation && fromLocation.pathname.startsWith('/borrower')) {
            navigate(fromLocation.pathname + (fromLocation.search || ''), { replace: true });
          } else {
            navigate('/borrower/dashboard', { replace: true });
          }
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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Back to Landing Page Button */}
      <div className="absolute top-5 left-5 sm:top-8 sm:left-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-blue-600 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs hover:shadow-sm transition-all group"
          title="Back to Landing Page"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5 text-slate-500 group-hover:text-blue-600" />
          <span>Back to</span>
        </Link>
      </div>

      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        <Link to="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0B1730] to-[#172B4D] flex items-center justify-center text-white shadow-md shadow-blue-900/15 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-6 h-6 text-[#D5B66A]" />
          </div>
          <span className="font-heading font-extrabold text-2xl tracking-tight text-[#0B1730]">
            OAL <span className="text-blue-600">NETWORK</span>
          </span>
        </Link>
        <h1 className="text-2xl font-heading font-extrabold text-slate-900">
          Sign In to Your Account
        </h1>
        <p className="text-xs text-slate-500">
          Secure access to your commercial lending and underwriting portal.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md space-y-4">
        {/* Main Card */}
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-slate-200/90 sm:px-8 space-y-6">
          
          {/* Notice when redirected from protected destination (e.g. Apply for a Loan) */}
          {fromLocation && (
            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-2.5 text-xs text-blue-900">
              <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold block">Authentication Required</strong>
                <span>Please sign in to proceed directly to your commercial loan application.</span>
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

            <div className="grid grid-cols-5 gap-1.5">
              {demoAccounts.map((acc) => {
                const isSelected = selectedDemoEmail === acc.email;
                return (
                  <button
                    key={acc.role}
                    type="button"
                    onClick={() => handleSelectDemoAccount(acc)}
                    className={`py-1.5 px-1 rounded-lg text-[11px] font-bold text-center transition-all border ${
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
                  className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 hover:underline"
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
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs text-slate-600">Remember this device</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
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
              state={{ from: fromLocation }}
              className="font-bold text-blue-600 hover:text-blue-700 hover:underline"
            >
              Create an Account
            </Link>
          </div>
        </div>

        {/* Security badge footer */}
        <div className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-2 pt-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>256-Bit TLS Encryption • SOC2 Security Standards</span>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4">
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
