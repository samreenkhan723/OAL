import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Lock, ArrowRight, Info } from 'lucide-react';

export const MfaPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentRole, registerPrototypeUser, addToast, isAuthenticated, currentUser } = useApp();
  const [mfaCode, setMfaCode] = useState('829104');

  const pendingUser = location.state?.pendingUser;
  const fromLocation = location.state?.from;
  const program = location.state?.program;

  const handleMfaSubmit = (e) => {
    e.preventDefault();

    if (!mfaCode.trim()) {
      addToast('MFA Error', 'Please enter your 6-digit authenticator security code.', 'error');
      return;
    }

    // If completing a new user registration flow
    if (pendingUser) {
      const regResult = registerPrototypeUser({
        ...pendingUser,
        verified: true,
        mfaVerified: true
      });

      if (!regResult.success) {
        addToast('Registration Error', regResult.error || 'Failed to complete registration.', 'error');
        return;
      }

      addToast('Authentication Complete', `MFA verified. Welcome to OAL Network, ${pendingUser.name}!`, 'success');

      // Navigate strictly to the registered user's role dashboard
      if (pendingUser.role === 'lender') {
        navigate('/lender/dashboard', { replace: true });
        return;
      }

      // Default or borrower navigation
      let dest = '/borrower/dashboard';
      if (typeof fromLocation === 'string' && fromLocation.startsWith('/borrower')) {
        dest = fromLocation;
      } else if (fromLocation?.pathname && fromLocation.pathname.startsWith('/borrower')) {
        dest = fromLocation.pathname + (fromLocation.search || '');
      } else if (program) {
        dest = `/borrower/applications/new?program=${program}`;
      }

      if (program && !dest.includes('program=')) {
        dest += (dest.includes('?') ? '&' : '?') + `program=${program}`;
      }

      navigate(dest, { replace: true });
      return;
    }

    // Existing session / demo navigation fallback
    addToast('Authentication Verified', 'MFA verified for active session.', 'success');
    const targetRole = currentRole || 'borrower';
    if (targetRole === 'lender') {
      navigate('/lender/dashboard', { replace: true });
    } else if (targetRole === 'rep') {
      navigate('/rep/dashboard', { replace: true });
    } else if (targetRole === 'admin') {
      navigate('/admin/dashboard', { replace: true });
    } else {
      navigate('/borrower/dashboard', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-heading font-extrabold text-slate-900">
          Two-Factor Authentication (MFA)
        </h2>
        <p className="text-xs text-slate-500">
          {pendingUser ? (
            <>Securing {pendingUser.role === 'lender' ? 'Institutional Lender' : 'Commercial Borrower'} account for <strong className="text-slate-800">{pendingUser.name}</strong></>
          ) : (
            'Enter the 6-digit security token from your Authenticator app.'
          )}
        </p>

        {/* Prototype Simulation Notice */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-medium">
          <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>Simulated MFA token verification (frontend prototype mode)</span>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-slate-200/90 space-y-6">
          <form onSubmit={handleMfaSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 text-center mb-2">
                Authenticator Security Code
              </label>
              <input
                type="text"
                maxLength={6}
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value)}
                className="w-full px-4 py-3 text-center text-lg font-mono font-extrabold tracking-widest border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{program ? 'Verify & Begin Loan Application' : 'Verify & Launch Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center text-[11px] text-slate-400">
            Lost your authenticator device? Contact your assigned OAL Rep for manual identity challenge.
          </div>

          {!pendingUser && (
            <div className="text-center pt-2 border-t border-slate-100">
              <Link to="/auth/login" className="text-xs text-blue-600 hover:underline">
                &larr; Return to Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

