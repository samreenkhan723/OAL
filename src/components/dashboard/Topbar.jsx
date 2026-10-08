import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Menu,
  Search,
  Bell,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  ChevronDown,
  ExternalLink,
  Lock,
  User,
  LogOut,
  X
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const Topbar = ({ setIsOpen }) => {
  const { currentRole, currentUser, applications, offers, logout } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    setShowUserMenu(false);
    navigate('/auth/login', { replace: true });
  };

  // Active notifications derived from realistic state
  const notifications = [
    {
      id: 1,
      title: 'Offer Received on APP-2026-1082',
      time: '15m ago',
      read: false,
      desc: 'Lender #9203 submitted an offer for $425,000 at 8.25% fixed.'
    },
    {
      id: 2,
      title: 'Working Deal Claimed',
      time: '2h ago',
      read: false,
      desc: 'Slot 2 of 3 filled on Blue Harbor Seafood Bistro application.'
    },
    {
      id: 3,
      title: 'KYC Document Verified',
      time: '1d ago',
      read: true,
      desc: 'Corporate Tax Returns (2024-2025) successfully approved by Compliance.'
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (currentRole === 'lender') {
      navigate('/lender/leads');
    } else if (currentRole === 'admin') {
      navigate('/admin/applications');
    } else {
      navigate('/borrower/applications');
    }
  };

  return (
    <header className="sticky top-0 z-30 h-20 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      {/* Left: Mobile trigger & Search */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search form */}
        <form onSubmit={handleSearch} className="relative w-full max-w-md hidden sm:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search loans, applications, documents, offers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder:text-slate-400"
          />
        </form>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* IQ Score pill for Borrower */}
        {currentRole === 'borrower' && (
          <Link
            to="/borrower/investment-iq"
            className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-50 to-amber-100/70 border border-amber-200 rounded-xl text-xs font-semibold text-amber-900 hover:shadow-xs transition-shadow"
            title="View 180-Point Investment IQ Breakdown"
          >
            <span className="text-[10px] tracking-wide text-amber-700 uppercase font-bold">Investment IQ:</span>
            <span className="text-amber-900 font-extrabold text-sm">154</span>
            <span className="text-[11px] text-amber-600">/ 180</span>
          </Link>
        )}

        {/* Working Deal Tracker for Lender */}
        {currentRole === 'lender' && (
          <Link
            to="/lender/working-deals"
            className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-xl text-xs font-semibold text-blue-900"
          >
            <span className="text-[10px] text-blue-600 uppercase font-bold">Working Deals:</span>
            <span className="text-blue-700 font-extrabold">2 Active</span>
            <span className="text-[11px] text-blue-500">(Max 3/deal)</span>
          </Link>
        )}


        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900">Notifications</h4>
                  <span className="text-[10px] font-semibold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">3 New</span>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="py-3 hover:bg-slate-50/80 px-2 rounded-xl transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-semibold text-slate-900">{n.title}</span>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 text-center">
                <Link
                  to={currentRole === 'borrower' ? '/borrower/notifications' : `/${currentRole}/notifications`}
                  onClick={() => setShowNotifications(false)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  View All Activity &rarr;
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-100/80 transition-colors"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-600/20"
            />
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold text-slate-900">{currentUser.name}</div>
              <div className="text-[10px] text-slate-500 capitalize">{currentRole} Profile</div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50">
              <div className="p-3 border-b border-slate-100">
                <div className="text-xs font-bold text-slate-900">{currentUser.name}</div>
                <div className="text-[11px] text-slate-500 truncate">{currentUser.email}</div>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 uppercase tracking-wider">
                    {currentRole}
                  </span>
                  <span className="text-[10px] text-emerald-600 flex items-center gap-0.5">
                    <ShieldCheck className="w-3 h-3" /> MFA Verified
                  </span>
                </div>
              </div>

              <div className="py-2 space-y-1">
                <Link
                  to={`/${currentRole}/settings`}
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  Account & Security
                </Link>

                <Link
                  to="/support/tickets"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl"
                >
                  <HelpCircle className="w-4 h-4 text-slate-400" />
                  Help Desk & FAQ
                </Link>

              </div>

              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors text-left"
                >
                  <LogOut className="w-4 h-4 text-rose-600" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
