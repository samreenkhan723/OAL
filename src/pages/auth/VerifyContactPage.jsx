import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Mail, Phone, CheckCircle2, ArrowRight } from 'lucide-react';

export const VerifyContactPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useApp();
  const [emailCode, setEmailCode] = useState('749201');
  const [phoneCode, setPhoneCode] = useState('381944');

  const fromLocation = location.state?.from;
  const program = location.state?.program;
  const programTitle = location.state?.programTitle;

  const handleVerify = (e) => {
    e.preventDefault();
    addToast('Contact Verified', 'Email and phone successfully authenticated. Proceeding to MFA.', 'success');
    navigate('/auth/mfa', { state: { from: fromLocation, program, programTitle } });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        <h2 className="text-2xl font-heading font-extrabold text-slate-900">
          Verify Contact Information
        </h2>
        <p className="text-xs text-slate-500">
          We sent verification codes to your registered email and mobile device.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-slate-200/90 space-y-6">
          <form onSubmit={handleVerify} className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  Email OTP Code
                </label>
                <span className="text-[11px] text-blue-600 hover:underline cursor-pointer">Resend</span>
              </div>
              <input
                type="text"
                maxLength={6}
                value={emailCode}
                onChange={(e) => setEmailCode(e.target.value)}
                className="w-full px-4 py-2.5 text-center text-sm font-mono font-bold tracking-widest border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                  SMS Mobile OTP Code
                </label>
                <span className="text-[11px] text-blue-600 hover:underline cursor-pointer">Resend</span>
              </div>
              <input
                type="text"
                maxLength={6}
                value={phoneCode}
                onChange={(e) => setPhoneCode(e.target.value)}
                className="w-full px-4 py-2.5 text-center text-sm font-mono font-bold tracking-widest border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-1.5"
            >
              <span>Confirm & Proceed to MFA</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
