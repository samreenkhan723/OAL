import React, { useState } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  GitBranch,
  FileText,
  FilePlus,
  FolderOpen,
  Award,
  DollarSign,
  MessageSquare,
  Bell,
  Share2,
  Settings,
  LifeBuoy,
  Globe,
  Radio,
  Sparkles,
  ListOrdered,
  Bookmark,
  Briefcase,
  TrendingUp,
  FileSpreadsheet,
  CreditCard,
  ShieldCheck,
  Users,
  CheckCircle,
  Cpu,
  Layers,
  Megaphone,
  BookOpen,
  History,
  Lock,
  ChevronDown,
  ChevronRight,
  LogOut,
  ExternalLink,
  Clock,
  X
} from 'lucide-react';

export const Sidebar = ({ isOpen, setIsOpen }) => {
  const { currentRole, currentUser, applications, offers, tickets, logout } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  // Dynamic counts for notification badges
  const userApps = applications.filter(a => a.borrowerId === currentUser?.id);
  const activeAppId = userApps[0]?.id || applications[0]?.id || 'APP-2026-1082';
  const activeAppsCount = applications.filter(a => a.status !== 'FUNDED' && a.status !== 'DECLINED').length;
  const pendingOffersCount = offers.filter(o => o.status === 'PENDING_BORROWER_REVIEW').length;
  const openTicketsCount = tickets.filter(t => t.status === 'OPEN').length;

  // Sidebar navigation configuration by role — strictly aligned with client wireframe PRD 13-10-26
  const getNavSections = () => {
    switch (currentRole) {
      case 'lender':
        return [
          {
            title: null,
            items: [
              { label: 'Dashboard', path: '/lender/dashboard', icon: LayoutDashboard },
              { label: 'Marketplace / Qualified Leads', path: '/lender/qualified-leads', icon: Users, badge: `${applications.filter(a => a.status === 'QUALIFIED' || a.status === 'WORKING_DEAL').length}` },
              { label: 'Saved Leads', path: '/lender/saved-leads', icon: Bookmark },
              { label: 'Active Offers', path: '/lender/offers', icon: DollarSign, badge: `${offers.length}` },
              { label: 'Message Center', path: '/lender/communication', icon: MessageSquare },
              { label: 'OAL Network Panel', path: '/lender/network-panel', icon: Radio, badge: 'Live' },
              { label: 'Analytics & Reports', path: '/lender/analytics', icon: TrendingUp },
              { label: 'Billing & Subscription', path: '/lender/billing', icon: CreditCard },
              { label: 'Profile & Settings', path: '/lender/settings', icon: Settings },
            ]
          }
        ];

      case 'rep':
        return [
          {
            title: null,
            items: [
              { label: 'Dashboard', path: '/rep/dashboard', icon: LayoutDashboard },
              { label: 'Qualified Leads', path: '/rep/qualified-leads', icon: Users, badge: `${applications.length}` },
              { label: 'AI Lead Alerts', path: '/rep/lead-alerts', icon: Sparkles },
              { label: 'Lead Details', path: '/rep/lead-details', icon: FileText },
              { label: 'Loan Requests', path: '/rep/loan-requests', icon: Clock },
              { label: 'Saved Leads', path: '/rep/saved-leads', icon: Bookmark },
              { label: 'Communication (LetsWork)', path: '/rep/communication', icon: MessageSquare, badge: 'Active' },
              { label: 'Offer Management', path: '/rep/offers', icon: DollarSign, badge: 'Audit' },
              { label: 'OAL Network Panel', path: '/rep/network-panel', icon: Radio, badge: 'Live' },
              { label: 'Analytics & Reports', path: '/rep/analytics', icon: TrendingUp },
              { label: 'Billing & Subscription', path: '/rep/billing', icon: CreditCard },
              { label: 'Profile & Settings', path: '/rep/settings', icon: Settings },
            ]
          }
        ];

      case 'admin':
        return [
          {
            title: null,
            items: [
              { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
              { label: 'Borrowers', path: '/admin/borrowers', icon: Users },
              { label: 'Lenders', path: '/admin/lenders', icon: Briefcase },
              { label: 'Loan Applications', path: '/admin/loan-applications', icon: FileText, badge: `${applications.length}` },
              { label: 'AI Scoring Engine', path: '/admin/ai-scoring', icon: Cpu, badge: '180 Pt' },
              { label: 'Verification Center', path: '/admin/verification', icon: CheckCircle, badge: 'KYC' },
              { label: 'Document Management', path: '/admin/document-management', icon: FolderOpen },
              { label: 'Lead Distribution', path: '/admin/lead-distribution', icon: Layers },
              { label: 'Notifications', path: '/admin/notifications', icon: Bell },
              { label: 'Referrals & Affiliates', path: '/admin/referrals', icon: Share2 },
              { label: 'Advertisements', path: '/admin/advertisements', icon: Megaphone },
              { label: 'Payments & Subscriptions', path: '/admin/payments', icon: CreditCard },
              { label: 'CMS', path: '/admin/cms', icon: BookOpen },
              { label: 'Reports & Analytics', path: '/admin/reports', icon: TrendingUp },
              { label: 'Support Tickets', path: '/admin/help-desk', icon: LifeBuoy, badge: `${openTicketsCount}` },
              { label: 'Audit Logs', path: '/admin/audit-logs', icon: History },
              { label: 'System Settings', path: '/admin/settings', icon: Settings },
              { label: 'Super Admin', path: '/admin/super-admin', icon: Lock, badge: 'Root' },
            ]
          }
        ];

      case 'support':
        return [
          {
            title: 'Help Desk Center',
            items: [
              { label: 'Ticket Inbox', path: '/support/tickets', icon: LifeBuoy, badge: `${openTicketsCount}` },
              { label: 'Knowledge Base', path: '/support/knowledge-base', icon: BookOpen },
              { label: 'Support Analytics', path: '/support/analytics', icon: TrendingUp },
            ]
          }
        ];

      default: // Borrower (default)
        return [
          {
            title: null,
            items: [
              { label: 'Dashboard', path: '/borrower/dashboard', icon: LayoutDashboard },
              { label: 'Loan Application', path: '/borrower/loan-application', icon: FileText, badge: `${userApps.length || 1}` },
              { label: 'Documents', path: '/borrower/documents', icon: FolderOpen },
              { label: 'AI Borrower Score', path: '/borrower/ai-score', icon: Award, badge: '154/180' },
              { label: 'Waiting Room / Offers', path: '/borrower/offers', icon: DollarSign, badge: `${pendingOffersCount}` },
              { label: 'Notifications', path: '/borrower/notifications', icon: Bell },
              { label: 'Messages', path: '/borrower/messages', icon: MessageSquare, badge: 'Elena' },
              { label: 'Referral Program', path: '/borrower/referral', icon: Share2, badge: '$1,750' },
              { label: 'Profile & Settings', path: '/borrower/settings', icon: Settings },
            ]
          }
        ];
    }
  };

  const sections = getNavSections();

  const checkIsActive = (item) => {
    const current = location.pathname;
    const target = item.path;

    // Exact match is always active
    if (current === target) return true;

    // --- Admin matches ---
    if (target === '/admin/loan-applications') {
      return (
        current === '/admin/loan-applications' ||
        current === '/admin/applications' ||
        current.startsWith('/admin/loan-applications/') ||
        current.startsWith('/admin/applications/')
      );
    }
    if (target === '/admin/ai-scoring') {
      return current === '/admin/ai-scoring' || current === '/admin/scoring';
    }
    if (target === '/admin/document-management') {
      return current === '/admin/document-management' || current === '/admin/documents';
    }
    if (target === '/admin/payments') {
      return current === '/admin/payments' || current === '/admin/subscriptions';
    }
    if (target === '/admin/help-desk') {
      return current === '/admin/help-desk' || current === '/admin/support' || current.startsWith('/support');
    }

    // --- Borrower matches ---
    if (target === '/borrower/loan-application') {
      return (
        current === '/borrower/loan-application' ||
        current === '/borrower/applications' ||
        (current.startsWith('/borrower/loan-application/') && !current.includes('/tracker') && !current.includes('/documents')) ||
        (current.startsWith('/borrower/applications/') && !current.includes('/tracker') && !current.includes('/documents'))
      );
    }
    if (target === '/borrower/documents') {
      return current === '/borrower/documents' || current.includes('/documents');
    }
    if (target === '/borrower/ai-score') {
      return current === '/borrower/ai-score' || current === '/borrower/investment-iq';
    }
    if (target === '/borrower/referral') {
      return current === '/borrower/referral' || current === '/borrower/referrals';
    }

    // --- Lender matches ---
    if (target === '/lender/qualified-leads') {
      return (
        current === '/lender/qualified-leads' ||
        current === '/lender/leads' ||
        current.startsWith('/lender/qualified-leads/') ||
        current.startsWith('/lender/leads/')
      );
    }
    if (target === '/lender/communication') {
      return current === '/lender/communication' || current === '/lender/messages';
    }
    if (target === '/lender/network-panel') {
      return current === '/lender/network-panel' || current === '/lender/network' || (currentRole === 'lender' && current.startsWith('/network'));
    }
    if (target === '/lender/analytics') {
      return current === '/lender/analytics' || current === '/lender/reports';
    }
    if (target === '/lender/billing') {
      return current === '/lender/billing' || current === '/lender/subscription';
    }

    // --- Rep matches ---
    if (target === '/rep/qualified-leads') {
      return current === '/rep/qualified-leads' || current === '/rep/leads';
    }
    if (target === '/rep/lead-alerts') {
      return current === '/rep/lead-alerts' || current === '/rep/alerts';
    }
    if (target === '/rep/lead-details') {
      return current === '/rep/lead-details' || current.startsWith('/rep/lead-details/');
    }
    if (target === '/rep/communication') {
      return current === '/rep/communication' || current === '/rep/messages';
    }
    if (target === '/rep/network-panel') {
      return current === '/rep/network-panel' || current === '/rep/network' || (currentRole === 'rep' && current.startsWith('/network'));
    }
    if (target === '/rep/analytics') {
      return current === '/rep/analytics' || current === '/rep/reports';
    }
    if (target === '/rep/billing') {
      return current === '/rep/billing' || current === '/rep/subscription';
    }

    // General nested route matching for other paths
    if (target !== '/' && target !== `/${currentRole}/dashboard` && current.startsWith(target + '/')) {
      return true;
    }

    // Help desk / support fallback check
    if (target === '/support/tickets' && current.startsWith('/support')) {
      return true;
    }

    return false;
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#001744] text-slate-200 flex flex-col transition-transform duration-300 ease-in-out border-r border-[#002060] ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-[#002060] bg-[#001744]">
          <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0070C0] to-[#002060] flex items-center justify-center text-white shadow-md shadow-blue-950/40 border border-[#00B0F0]/30">
              <ShieldCheck className="w-5 h-5 text-[#FFD200]" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-heading font-extrabold text-lg tracking-tight text-white">OAL</span>
                <span className="font-heading font-semibold text-lg tracking-tight text-[#00B0F0]">NETWORK</span>
              </div>
              <div className="text-[10px] font-bold tracking-wider text-[#FFD200] uppercase">
                {currentRole} WORKSPACE
              </div>
            </div>
          </Link>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#002060] transition-colors cursor-pointer"
            title="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              {section.title && (
                <div className="px-3 text-[11px] font-bold text-sky-200/80 uppercase tracking-wider mb-2">
                  {section.title}
                </div>
              )}
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = checkIsActive(item);

                return (
                  <Link
                    key={item.path + item.label}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      active
                        ? 'bg-[#0070C0] text-white font-bold shadow-md shadow-[#0070C0]/35'
                        : 'text-slate-300 hover:text-white hover:bg-[#002060]/75'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`ml-2 px-1.5 py-0.5 text-[10px] font-bold rounded-md border ${
                          active
                            ? 'bg-[#FFD200] text-[#002060] border-amber-300 font-black'
                            : 'bg-[#002060] text-slate-200 border-[#003882]/80 group-hover:border-[#0070C0]/50'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* User Card & Profile Settings / Sign Out */}
        <div className="p-4 border-t border-[#002060] bg-[#001744]">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-[#002060]/70 border border-[#003882]/70">
            <Link
              to={`/${currentRole}/settings`}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 min-w-0 flex-1 hover:opacity-90 transition-opacity"
              title="View Profile & Settings"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-9 h-9 rounded-full object-cover border border-[#0070C0] flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold text-white truncate">{currentUser.name}</div>
                <div className="text-[10px] text-sky-200/70 truncate">{currentUser.company || currentUser.email}</div>
              </div>
            </Link>
            <Link
              to={`/${currentRole}/settings`}
              onClick={() => setIsOpen(false)}
              title="Profile & Settings"
              className="p-1.5 text-slate-400 hover:text-white hover:bg-[#003882] rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4" />
            </Link>
            <button
              onClick={() => {
                logout();
                navigate('/', { replace: true });
              }}
              title="Sign Out"
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-[#003882] rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
