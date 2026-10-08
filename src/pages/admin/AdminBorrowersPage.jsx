import React from 'react';
import { useApp } from '../../context/AppContext';
import { Users, ShieldCheck, Mail, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminBorrowersPage = () => {
  const { applications } = useApp();

  const borrowers = [
    { id: 'usr_b1', name: 'Marcus Vance', company: 'Blue Harbor Seafood Bistro LLC', email: 'marcus@blueharborseafood.com', phone: '+1 (555) 392-1084', activeLoan: 'APP-2026-1082 ($450k)', status: 'ACTIVE_OFFERS' },
    { id: 'usr_b2', name: 'Dr. Aaron Meyer DDS', company: 'SmileCraft Modern Dental Studio', email: 'aaron@smilecraftdental.com', phone: '+1 (555) 720-4491', activeLoan: 'APP-2026-1105 ($320k)', status: 'PROCESSING' },
    { id: 'usr_b3', name: 'Chloe Bennett', company: 'Urban Crumb Mobile Bakery LLC', email: 'chloe@urbancrumb.com', phone: '+1 (555) 441-2091', activeLoan: 'APP-2026-1120 ($115k)', status: 'KYC_REVIEW' },
    { id: 'usr_b4', name: 'Rev. Samuel Thorne', company: 'Grace Community Fellowship', email: 'pastor@gracefellowship.org', phone: '+1 (555) 902-1823', activeLoan: 'APP-2026-1133 ($950k)', status: 'FUNDED' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
          Borrowers Directory
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Registered commercial entity applicants, identity verification states, and active loan requests.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>{borrowers.length} Registered Commercial Borrowers</span>
          <span className="text-emerald-700 font-bold">All Verified</span>
        </div>

        <div className="divide-y divide-slate-100">
          {borrowers.map((b) => (
            <div key={b.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">{b.name}</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    {b.status}
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-700">{b.company}</div>
                <div className="text-xs text-slate-400 flex items-center gap-3">
                  <span>{b.email}</span>
                  <span>•</span>
                  <span>{b.phone}</span>
                </div>
                <div className="text-xs text-blue-600 font-semibold pt-1">
                  Active Request: {b.activeLoan}
                </div>
              </div>

              <Link
                to="/admin/applications"
                className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors self-end sm:self-center"
              >
                Inspect Loans
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
