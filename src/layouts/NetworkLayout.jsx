import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  TrendingUp,
  Radio,
  Users,
  FileText,
  Bookmark,
  DollarSign,
  MessageSquare,
  Clock,
  ShieldCheck,
  ArrowLeft,
  Menu,
  X,
  Bell,
  User,
  LogOut,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Briefcase,
  HelpCircle
} from 'lucide-react';
import { NotificationToast } from '../components/common/NotificationToast';

// The exact 8 client-defined sections in mandated order per client wireframes
const NETWORK_NAV_ITEMS = [
  { id: 'dashboard', path: '/network/dashboard', label: '1. Dashboard', icon: TrendingUp },
  { id: 'live-stream', path: '/network/live-stream', label: '2. Live Marketplace View', icon: Radio, badge: 'Live' },
  { id: 'leads', path: '/network/leads', label: '3. Qualified Leads & Alerts', icon: Users, badge: 'AI Match' },
  { id: 'details', path: '/network/details', label: '4. Lead Details & Requests', icon: FileText },
  { id: 'saved', path: '/network/saved', label: '5. Saved Leads', icon: Bookmark },
  { id: 'offers', path: '/network/offers', label: '6. Offer Management', icon: DollarSign },
  { id: 'communication', path: '/network/communication', label: '7. Communication', icon: MessageSquare, badge: 'Broker' },
  { id: 'timeline', path: '/network/timeline', label: '8. Timeline Tracking', icon: Clock, badge: 'SLA' },
];

export const NetworkLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentRole, currentUser, logout, applications } = useApp();

  // Role return configuration
  const roleConfig = {
    lender: {
      dashboardPath: '/lender/dashboard',
      dashboardLabel: 'Return to Lender Dashboard',
      roleBadge: 'Lender Underwriter Mode',
      privacyNotice: 'Rule FR-04: Borrower personal identity masked.'
    },
    rep: {
      dashboardPath: '/rep/dashboard',
      dashboardLabel: 'Return to OAL Rep Dashboard',
      roleBadge: 'OAL Rep Fiduciary Mode',
      privacyNotice: 'Rule FR-09: Fiduciary mediation queue active.'
    },
    admin: {
      dashboardPath: '/admin/dashboard',
      dashboardLabel: 'Return to Admin Console',
      roleBadge: 'Admin Oversight Mode',
      privacyNotice: 'System-wide supervisory access.'
    }
  }[currentRole] || {
    dashboardPath: '/lender/dashboard',
    dashboardLabel: 'Return to Dashboard',
    roleBadge: 'Network Exchange',
    privacyNotice: 'Rule FR-09 Protected'
  };

  const handleSignOut = () => {
    logout();
    navigate('/', { replace: true });
  };

  const isItemActive = (item) => {
    if (item.path === '/network/dashboard') {
      return location.pathname === '/network/dashboard' || location.pathname === '/network';
    }
    return location.pathname.startsWith(item.path);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-[#0F172A] relative overflow-x-hidden">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* =========================================================================
          DEDICATED OAL NETWORK SIDEBAR (Fixed Left on Desktop)
          ========================================================================= */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#001744] text-slate-200 flex flex-col transition-transform duration-300 ease-in-out border-r border-[#002060] ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Network Header Branding */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-[#002060] bg-[#001744]">
          <Link
            to="/network/dashboard"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0070C0] to-[#002060] flex items-center justify-center text-white shadow-md shadow-blue-950/40 border border-[#00B0F0]/30">
              <ShieldCheck className="w-5 h-5 text-[#FFD200]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-black text-lg tracking-tight text-white">OAL</span>
                <span className="font-heading font-bold text-lg tracking-tight text-[#00B0F0]">NETWORK</span>
              </div>
              <div className="text-[10px] font-black tracking-wider text-[#FFD200] uppercase">
                PANEL WORKSPACE
              </div>
            </div>
          </Link>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#002060] transition-colors cursor-pointer"
            title="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Primary Action: Return to User Role Dashboard */}
        <div className="p-4 border-b border-[#002060]/70 bg-[#001b50]/60">
          <Link
            to={roleConfig.dashboardPath}
            onClick={() => setSidebarOpen(false)}
            className="w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-[#002060] hover:bg-[#002e88] text-sky-200 hover:text-white border border-sky-400/20 text-xs font-bold transition-all shadow-sm group"
          >
            <span className="flex items-center gap-2">
              <ArrowLeft className="w-3.5 h-3.5 text-[#FFD200] group-hover:-translate-x-0.5 transition-transform" />
              <span>{roleConfig.dashboardLabel}</span>
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300">
              Exit
            </span>
          </Link>
        </div>

        {/* Primary Navigation: The 8 Mandated Sections */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1.5">
          <div className="px-3 text-[11px] font-black text-sky-200/80 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Network Sections</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-sky-400/20 text-sky-300 font-bold">
              8 Core
            </span>
          </div>

          {NETWORK_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item);

            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  active
                    ? 'bg-[#0070C0] text-white shadow-md shadow-[#0070C0]/25'
                    : 'text-slate-300 hover:text-white hover:bg-[#002060]/60'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-black uppercase shrink-0 ${
                      active
                        ? 'bg-[#002060] text-white'
                        : item.badge === 'Live'
                        ? 'bg-[#FFD200]/20 text-[#FFD200] border border-[#FFD200]/30 animate-pulse'
                        : 'bg-white/10 text-slate-300 border border-white/10'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          {/* Compliance & Fiduciary Notice Card */}
          <div className="pt-6">
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#002060] to-[#001744] border border-sky-400/20 text-[11px] text-slate-300 space-y-2">
              <div className="flex items-center gap-1.5 text-[#FFD200] font-bold">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Rule FR-09 Active</span>
              </div>
              <p className="text-slate-300 text-[10px] leading-relaxed">
                Direct Lender ↔ Borrower chat prohibited. Elena Rostova (OAL Rep) mediates all covenants & terms.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar Footer: User Card & Role */}
        <div className="p-4 border-t border-[#002060] bg-[#001338]">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-[#0070C0] text-white flex items-center justify-center font-bold text-xs shrink-0">
                {currentUser?.name?.charAt(0) || 'U'}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">
                  {currentUser?.name || 'Authorized User'}
                </div>
                <div className="text-[10px] font-semibold text-[#00B0F0] capitalize">
                  {roleConfig.roleBadge}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/30 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          MAIN WORKSPACE CONTENT AREA
          ========================================================================= */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0 w-full">
        {/* Dedicated Network Workspace Topbar */}
        <header className="h-20 bg-white/90 backdrop-blur-md border-b border-slate-200/90 sticky top-0 z-30 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Left: Mobile Toggle + Title & Breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Open Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-heading font-black text-slate-900 tracking-tight">
                  OAL Network Panel
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Real-Time Exchange</span>
                </span>
              </div>
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <span>Multi-Lender Underwriting Exchange</span>
                <span className="text-slate-300">•</span>
                <span className="text-[#0070C0] font-semibold">{roleConfig.roleBadge}</span>
              </div>
            </div>
          </div>

          {/* Right: Quick Return Button + Role Badge + User Menu */}
          <div className="flex items-center gap-3">
            {/* Desktop Return to Role Dashboard Button */}
            <Link
              to={roleConfig.dashboardPath}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-xs font-bold transition-all border border-slate-200 shadow-2xs group cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#0070C0] group-hover:-translate-x-0.5 transition-transform" />
              <span>{roleConfig.dashboardLabel}</span>
            </Link>

            {/* User Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-xl bg-[#002060] text-white flex items-center justify-center font-bold text-xs">
                  {currentUser?.name?.charAt(0) || 'U'}
                </div>
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 text-xs">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="font-bold text-slate-900">{currentUser?.name}</p>
                    <p className="text-slate-500 text-[11px]">{currentUser?.email || 'user@oalnetwork.com'}</p>
                    <span className="inline-block mt-1 text-[10px] font-black uppercase px-2 py-0.5 rounded bg-sky-50 text-[#0070C0]">
                      {currentRole} Role
                    </span>
                  </div>

                  <Link
                    to={roleConfig.dashboardPath}
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-[#0070C0]" />
                    <span>{roleConfig.dashboardLabel}</span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 font-medium text-left cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Workspace Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-12 min-w-0">
          <Outlet />
        </main>
      </div>

      {/* Global Notification Alerts */}
      <NotificationToast />
    </div>
  );
};

export default NetworkLayout;
