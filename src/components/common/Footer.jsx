import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { LOAN_PROGRAMS } from '../../data/loanPrograms';
import { VerifyBadge } from './VerifyBadge';

export const Footer = () => {
  return (
    <footer className="bg-[#0B1730] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white shadow-md">
                <ShieldCheck className="w-6 h-6 text-[#D5B66A]" />
              </div>
              <div>
                <span className="font-heading font-extrabold text-xl tracking-tight text-white">OAL</span>
                <span className="font-heading font-semibold text-xl tracking-tight text-blue-400"> NETWORK</span>
                <p className="text-[10px] tracking-wider text-slate-400 uppercase">Commercial Lending Exchange</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The premier institutional marketplace connecting verified commercial borrowers, licensed OAL representatives, and accredited lenders through an auditable, mediated application lifecycle.
            </p>
            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D5B66A]" />
                <span>+1 (800) 592-OAL-NET (6256)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D5B66A]" />
                <span>underwriting@oalnetwork.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D5B66A]" />
                <span>Financial District, New York, NY 10005</span>
              </div>
            </div>
          </div>

          {/* Loan Programs */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Loan Programs</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {LOAN_PROGRAMS.slice(0, 5).map(prog => (
                <li key={prog.id}>
                  <Link to={`/loan-programs/${prog.slug}`} className="hover:text-white transition-colors">
                    {prog.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/loan-programs" className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1">
                  View all 8 programs &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Methodology */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Methodology</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/investment-iq" className="hover:text-white transition-colors">
                  180-Point Investment IQ
                </Link>
              </li>
              <li>
                <Link to="/investment-club" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Investment Club</span>
                  <VerifyBadge className="text-[9px] px-1 py-0" />
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-white transition-colors">
                  Help Desk & FAQ
                </Link>
              </li>
              <li>
                <Link to="/auth/login" className="hover:text-white transition-colors">
                  Client & Partner Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance & Governance */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Governance</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <span className="text-slate-300 font-medium">3-Lender Deal Limit:</span>
                <p className="text-[11px] text-slate-400 mt-0.5">Strict atomic cap per FR-08 protects borrower attention.</p>
              </li>
              <li>
                <span className="text-slate-300 font-medium">Mediated Messaging:</span>
                <p className="text-[11px] text-slate-400 mt-0.5">All communications supervised via OAL Representative.</p>
              </li>
              <li>
                <span className="text-slate-300 font-medium">Privacy Guaranteed:</span>
                <p className="text-[11px] text-slate-400 mt-0.5">Lender identities hidden from competing lenders.</p>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & disclaimers */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} OAL Network Inc. All rights reserved. Commercial Lending Marketplace.</p>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">Confidential Prototype Version 1.0</span>
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">Equal Credit Opportunity</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
