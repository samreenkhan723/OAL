import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  User,
  Mail,
  Phone,
  Lock,
  Building,
  TrendingUp,
  Sparkles
} from 'lucide-react';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { switchRole, addToast } = useApp();

  const fromLocation = location.state?.from;

  const [form, setForm] = useState({
    role: 'borrower',
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    password: '',
    agree: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    switchRole(form.role);
    addToast('Account Created', 'Please verify your email and phone to complete onboarding.', 'success');
    navigate('/auth/verify', { state: { from: fromLocation } });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* LEFT COLUMN: Visual Brand Showcase with High-End Imagery */}
      <div className="relative hidden lg:flex lg:w-1/2 xl:w-5/12 bg-[#0B1730] flex-col justify-between p-10 xl:p-14 text-white overflow-hidden">
        {/* Background Image with Cinematic Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/signup_hero.jpg"
            alt="OAL Commercial Lending Exchange"
            className="w-full h-full object-cover object-center filter brightness-95"
          />
          {/* Deep Navy/Black Luxury Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1730] via-[#0B1730]/85 to-[#0B1730]/75" />
          <div className="absolute inset-0 bg-radial-at-t from-blue-600/20 via-transparent to-transparent" />
        </div>

        {/* Top Header / Logo */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B1730] to-[#172B4D] border border-[#D5B66A]/40 flex items-center justify-center text-white shadow-lg">
              <ShieldCheck className="w-5 h-5 text-[#D5B66A]" />
            </div>
            <div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-white block">
                OAL <span className="text-blue-400">NETWORK</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#D5B66A] block -mt-1">
                Commercial Lending Exchange
              </span>
            </div>
          </Link>
        </div>

        {/* Center Content / Value Propositions */}
        <div className="relative z-10 space-y-6 my-auto py-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#D5B66A] text-xs font-bold tracking-wide backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Servicing All 50 States &bull; $10k to $500M+</span>
          </div>

          <h1 className="text-3xl xl:text-4xl font-heading font-extrabold text-white leading-tight">
            Next-Generation Commercial Lending & Underwriting
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed max-w-md">
            Join the verified marketplace connecting commercial debt seekers and institutional lenders with transparent scoring and zero uncoordinated bidding.
          </p>

          {/* Feature Highlights */}
          <div className="space-y-3.5 pt-2">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">180-Point Investment IQ Formula</h4>
                <p className="text-[11px] text-slate-300 mt-0.5">Credit, Cash Flow, Collateral, and Business Plan underwriting metrics.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Max 3 Lenders per Working Deal</h4>
                <p className="text-[11px] text-slate-300 mt-0.5">Protected files prevent excessive credit pulls and predatory bidding.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Rapid 24–72 Hour Approvals</h4>
                <p className="text-[11px] text-slate-300 mt-0.5">Fast-track capital for restaurants, freight, franchise, healthcare & real estate.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Card */}
        <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D5B66A]" />
            <span className="text-[11px] font-semibold text-slate-300">256-Bit TLS Bank-Grade Encryption</span>
          </div>
          <span className="text-[10px] text-slate-400 uppercase font-mono">SOC2 Standards</span>
        </div>
      </div>

      {/* RIGHT COLUMN: The Sign Up Form */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16 relative overflow-y-auto">
        {/* Top bar with Back button */}
        <div className="flex items-center justify-between w-full max-w-xl mx-auto mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-blue-600 bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs hover:shadow-xs transition-all group"
            title="Back to Landing Page"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5 text-slate-500 group-hover:text-blue-600" />
            <span>Back to</span>
          </Link>

          {/* Mobile Logo (Visible on mobile only) */}
          <div className="lg:hidden">
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
        <div className="w-full max-w-xl mx-auto my-auto">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-heading font-extrabold text-slate-900">
                Create an Account
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Select your account type to access the commercial debt exchange.
              </p>
            </div>

            {/* Role selector tabs */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Select Account Role</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, role: 'borrower' })}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    form.role === 'borrower'
                      ? 'border-blue-600 bg-blue-50/80 ring-2 ring-blue-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-900">Commercial Borrower</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Apply & secure debt funding</div>
                </button>

                <button
                  type="button"
                  onClick={() => setForm({ ...form, role: 'lender' })}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    form.role === 'lender'
                      ? 'border-purple-600 bg-purple-50/80 ring-2 ring-purple-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-900">Institutional Lender</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Discover deals & issue offers</div>
                </button>
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5">
                *Admins and OAL Representatives are provisioned via enterprise invitation.
              </p>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marcus Vance"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Company / Entity Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Blue Harbor Bistro LLC"
                    value={form.companyName}
                    onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Business Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Phone (for MFA) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password <span className="text-rose-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  placeholder="At least 8 characters with numbers & symbols"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
                />
              </div>

              <label className="flex items-start gap-2.5 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={form.agree}
                  onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded mt-0.5 cursor-pointer"
                />
                <span className="text-[11px] text-slate-600 leading-relaxed">
                  I agree to the OAL Network Terms of Service, Privacy Policy, and consent to electronic underwriting communications.
                </span>
              </label>

              <button
                type="submit"
                className="w-full py-3 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-600/25 transition-all hover:shadow-lg hover:shadow-blue-600/35 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Create Account & Verify</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
              Already have an account?{' '}
              <Link to="/auth/login" className="font-bold text-blue-600 hover:underline">
                Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="w-full max-w-xl mx-auto mt-6 text-center text-[11px] text-slate-400">
          256-Bit TLS Encryption &bull; SOC2 Certified Infrastructure &bull; OAL Network
        </div>
      </div>
    </div>
  );
};
