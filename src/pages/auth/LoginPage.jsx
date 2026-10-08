import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Lock, Mail, ArrowRight, UserCheck, Briefcase, Building, LifeBuoy } from 'lucide-react';

export const LoginPage = () => {
  const { switchRole, addToast } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('marcus@blueharborseafood.com');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedRole, setSelectedRole] = useState('borrower');

  const handleQuickLogin = (role, defaultRoute) => {
    switchRole(role);
    navigate(defaultRoute);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    switchRole(selectedRole);
    if (selectedRole === 'lender') navigate('/lender/dashboard');
    else if (selectedRole === 'rep') navigate('/rep/dashboard');
    else if (selectedRole === 'admin') navigate('/admin/dashboard');
    else if (selectedRole === 'support') navigate('/support/tickets');
    else navigate('/borrower/dashboard');
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
          Sign In to Portal
        </h2>
        <p className="text-xs text-slate-500">
          Access your role-specific commercial lending workspace.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-slate-200/90 sm:px-8 space-y-6">
          {/* Quick Prototype 1-Click Role Logins */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              1-Click Demo Profile Switcher:
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickLogin('borrower', '/borrower/dashboard')}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left transition-all"
              >
                <div className="font-bold text-slate-900">Marcus Vance</div>
                <div className="text-[10px] text-blue-600">Borrower Dashboard</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('lender', '/lender/dashboard')}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-purple-500 hover:bg-purple-50 text-left transition-all"
              >
                <div className="font-bold text-slate-900">Apex Horizon</div>
                <div className="text-[10px] text-purple-600">Lender Marketplace</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('rep', '/rep/dashboard')}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50 text-left transition-all"
              >
                <div className="font-bold text-slate-900">Elena Rostova</div>
                <div className="text-[10px] text-amber-600">OAL Rep (Read-Only Offers)</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('admin', '/admin/dashboard')}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-rose-500 hover:bg-rose-50 text-left transition-all"
              >
                <div className="font-bold text-slate-900">Victoria Sterling</div>
                <div className="text-[10px] text-rose-600">Super Admin Oversight</div>
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-400 font-semibold">Or enter credentials</span>
            </div>
          </div>

          {/* Regular Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">Password</label>
                <span className="text-[11px] text-blue-600 hover:underline cursor-pointer">Forgot?</span>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Select Role Context</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              >
                <option value="borrower">Borrower (Commercial Applicant)</option>
                <option value="lender">Lender (Institutional Capital Partner)</option>
                <option value="rep">OAL Representative (Placement Agent)</option>
                <option value="admin">Admin / Super Admin (Compliance)</option>
                <option value="support">Help Desk Specialist</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-600/20 transition-all"
            >
              Sign In to OAL Network
            </button>
          </form>

          <div className="text-center text-xs text-slate-500 pt-2">
            Don't have an account yet?{' '}
            <Link to="/auth/register" className="font-bold text-blue-600 hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
