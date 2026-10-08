import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Lock, ArrowRight } from 'lucide-react';

export const MfaPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentRole, switchRole, addToast } = useApp();
  const [mfaCode, setMfaCode] = useState('829104');

  const fromLocation = location.state?.from;
  const program = location.state?.program;

  const handleMfaSubmit = (e) => {
    e.preventDefault();
    switchRole(currentRole || 'borrower');
    addToast('Authentication Complete', 'MFA verified. Welcome to your OAL Network dashboard.', 'success');
    
    if (currentRole === 'borrower') {
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
    } else if (currentRole === 'lender') {
      navigate('/lender/dashboard', { replace: true });
    } else if (currentRole === 'rep') {
      navigate('/rep/dashboard', { replace: true });
    } else if (currentRole === 'admin') {
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
          Enter the 6-digit security token from your Authenticator app.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
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
              className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-1.5"
            >
              <span>{program ? 'Verify & Begin Loan Application' : 'Verify & Launch Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center text-[11px] text-slate-400">
            Lost your authenticator device? Contact your assigned OAL Rep for manual identity challenge.
          </div>
        </div>
      </div>
    </div>
  );
};
