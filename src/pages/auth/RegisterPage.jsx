import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, User, Mail, Phone, Lock, Building } from 'lucide-react';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { switchRole, addToast } = useApp();

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
    navigate('/auth/verify');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        <Link to="/" className="inline-flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B1730] to-[#172B4D] flex items-center justify-center text-white shadow-md">
            <ShieldCheck className="w-5 h-5 text-[#D5B66A]" />
          </div>
          <span className="font-heading font-extrabold text-2xl tracking-tight text-[#0B1730]">
            OAL <span className="text-blue-600">NETWORK</span>
          </span>
        </Link>
        <h2 className="text-2xl font-heading font-extrabold text-slate-900">
          Create an Account
        </h2>
        <p className="text-xs text-slate-500">
          Join the commercial lending exchange as a Borrower or Institutional Lender.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg px-4">
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-slate-200/90 sm:px-8 space-y-5">
          
          {/* Role selector tabs */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Select Account Role</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setForm({ ...form, role: 'borrower' })}
                className={`p-3 rounded-xl border text-left transition-all ${
                  form.role === 'borrower'
                    ? 'border-blue-600 bg-blue-50/80 ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="text-xs font-bold text-slate-900">Commercial Borrower</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Apply & secure debt funding</div>
              </button>

              <button
                type="button"
                onClick={() => setForm({ ...form, role: 'lender' })}
                className={`p-3 rounded-xl border text-left transition-all ${
                  form.role === 'lender'
                    ? 'border-purple-600 bg-purple-50/80 ring-2 ring-purple-500/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="text-xs font-bold text-slate-900">Institutional Lender</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Discover deals & issue offers</div>
              </button>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              *Admins and OAL Representatives are provisioned via enterprise invitation. Self-registration is strictly restricted (FR-01).
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Marcus Vance"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Company / Entity Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Blue Harbor Bistro LLC"
                  value={form.companyName}
                  onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Business Email</label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Phone (for MFA)</label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 000-0000"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="At least 8 characters with numbers & symbols"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <label className="flex items-start gap-2 pt-1 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={form.agree}
                onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded mt-0.5"
              />
              <span className="text-[11px] text-slate-600">
                I agree to the OAL Network Terms of Service, Privacy Policy, and consent to electronic communications.
              </span>
            </label>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-600/20 transition-all"
            >
              Create Account & Verify
            </button>
          </form>

          <div className="text-center text-xs text-slate-500 pt-2">
            Already registered?{' '}
            <Link to="/auth/login" className="font-bold text-blue-600 hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
