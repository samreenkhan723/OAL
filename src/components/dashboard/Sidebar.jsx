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

  // Sidebar navigation configuration by role
  const getNavSections = () => {
    switch (currentRole) {
      case 'lender':
        return [
          {
            title: 'Overview',
            items: [
              { label: 'Dashboard', path: '/lender/dashboard', icon: LayoutDashboard },
              { label: 'Network Panel', path: '/lender/network', icon: Radio, badge: 'Live' },
            ]
          },
          {
            title: 'Opportunities',
            items: [
              { label: 'Qualified Leads', path: '/lender/leads', icon: Users, badge: `${applications.filter(a => a.status === 'QUALIFIED' || a.status === 'WORKING_DEAL').length}` },
              { label: 'AI Lead Alerts', path: '/lender/alerts', icon: Sparkles, badge: 'New' },
              { label: 'Borrower Rankings', path: '/lender/rankings', icon: ListOrdered },
              { label: 'Loan Requests', path: '/lender/loan-requests', icon: FileText },
              { label: 'Saved Leads', path: '/lender/saved-leads', icon: Bookmark },
              { label: 'Working Deals', path: '/lender/working-deals', icon: Briefcase, badge: 'Max 3' },
            ]
          },
          {
            title: 'Transactions',
            items: [
              { label: 'Offer Management', path: '/lender/offers', icon: DollarSign, badge: `${offers.length}` },
              { label: 'The Money Club Syndicate', path: '/lender/money-club', icon: Award, badge: 'VIP/MVP' },
              { label: 'Post-Funding Portfolio', path: '/lender/post-funding', icon: History, badge: 'Stage 13' },
            ]
          },
          {
            title: 'Communication',
            items: [
              { label: 'Messages (Rep)', path: '/lender/messages', icon: MessageSquare },
              { label: 'Notifications', path: '/lender/notifications', icon: Bell },
            ]
          },
          {
            title: 'Business & Settings',
            items: [
              { label: 'Analytics', path: '/lender/analytics', icon: TrendingUp },
              { label: 'Reports', path: '/lender/reports', icon: FileSpreadsheet },
              { label: 'Billing & Plans', path: '/lender/billing', icon: CreditCard },
              { label: 'Settings', path: '/lender/settings', icon: Settings },
              { label: 'Help Desk', path: '/support/tickets', icon: LifeBuoy },
            ]
          }
        ];

      case 'rep':
        return [
          {
            title: 'Overview',
            items: [
              { label: 'Dashboard', path: '/rep/dashboard', icon: LayoutDashboard },
            ]
          },
          {
            title: 'Pipeline',
            items: [
              { label: 'Qualified Leads', path: '/rep/leads', icon: Users, badge: `${applications.length}` },
              { label: 'AI Lead Alerts', path: '/rep/alerts', icon: Sparkles },
              { label: 'Loan Requests', path: '/rep/loan-requests', icon: FileText },
              { label: 'Saved Leads', path: '/rep/saved-leads', icon: Bookmark },
            ]
          },
          {
            title: 'Coordination',
            items: [
              { label: 'Communication Hub', path: '/rep/messages', icon: MessageSquare, badge: 'Active' },
              { label: 'Offers (Read-Only)', path: '/rep/offers', icon: DollarSign, badge: 'Audit' },
            ]
          },
          {
            title: 'Business & Support',
            items: [
              { label: 'Analytics', path: '/rep/analytics', icon: TrendingUp },
              { label: 'Reports', path: '/rep/reports', icon: FileSpreadsheet },
              { label: 'Billing', path: '/rep/billing', icon: CreditCard },
              { label: 'Settings', path: '/rep/settings', icon: Settings },
              { label: 'Help Desk', path: '/support/tickets', icon: LifeBuoy },
            ]
          }
        ];

      case 'admin':
        return [
          {
            title: 'Governance',
            items: [
              { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
              { label: 'Network Panel', path: '/admin/network', icon: Radio, badge: 'Live Feed' },
            ]
          },
          {
            title: 'Loan Operations',
            items: [
              { label: 'Applications', path: '/admin/applications', icon: FileText, badge: `${applications.length}` },
              { label: 'Verification Center', path: '/admin/verification', icon: CheckCircle, badge: 'KYC' },
              { label: 'Document Mgmt', path: '/admin/documents', icon: FolderOpen },
              { label: 'AI Scoring Engine', path: '/admin/scoring', icon: Cpu, badge: '180 Pt' },
              { label: 'Lead Distribution', path: '/admin/lead-distribution', icon: Layers },
              { label: 'Offers Oversight', path: '/admin/offers', icon: DollarSign },
            ]
          },
          {
            title: 'User Management',
            items: [
              { label: 'Borrowers', path: '/admin/borrowers', icon: Users },
              { label: 'Lenders', path: '/admin/lenders', icon: Briefcase },
              { label: 'Representatives', path: '/admin/representatives', icon: ShieldCheck },
            ]
          },
          {
            title: 'Finance & Growth',
            items: [
              { label: 'Referrals & Affiliates', path: '/admin/referrals', icon: Share2 },
              { label: 'Advertisements', path: '/admin/advertisements', icon: Megaphone },
              { label: 'Payments', path: '/admin/payments', icon: CreditCard },
              { label: 'Subscription Plans', path: '/admin/subscriptions', icon: FileSpreadsheet },
              { label: 'CMS Manager', path: '/admin/cms', icon: BookOpen },
            ]
          },
          {
            title: 'System Operations',
            items: [
              { label: 'Support Tickets', path: '/admin/support', icon: LifeBuoy, badge: `${openTicketsCount}` },
              { label: 'Audit Logs', path: '/admin/audit-logs', icon: History },
              { label: 'Reports & Analytics', path: '/admin/reports', icon: TrendingUp },
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
            title: 'Overview',
            items: [
              { label: 'Dashboard', path: '/borrower/dashboard', icon: LayoutDashboard },
              { label: 'Loan Tracker', path: `/borrower/applications/${activeAppId}/tracker`, icon: GitBranch, badge: 'Active' },
            ]
          },
          {
            title: 'My Financing',
            items: [
              { label: 'My Applications', path: '/borrower/applications', icon: FileText, badge: `${userApps.length || 1}` },
              { label: 'New Loan Request', path: '/borrower/applications/new', icon: FilePlus },
              { label: 'Documents & KYC', path: '/borrower/documents', icon: FolderOpen },
              { label: 'Investment IQ', path: '/borrower/investment-iq', icon: Award, badge: '154/180' },
              { label: 'The Money Club Portal', path: '/borrower/money-club', icon: Sparkles, badge: 'MVP 154' },
              { label: 'Lender Offers', path: '/borrower/offers', icon: DollarSign, badge: `${pendingOffersCount}` },
              { label: 'Post-Funding Servicing', path: '/borrower/post-funding', icon: History, badge: 'Stage 13' },
            ]
          },
          {
            title: 'Communication',
            items: [
              { label: 'Messages (OAL Rep)', path: '/borrower/messages', icon: MessageSquare, badge: 'Elena' },
              { label: 'Notifications', path: '/borrower/notifications', icon: Bell },
            ]
          },
          {
            title: 'Account',
            items: [
              { label: 'Referrals', path: '/borrower/referrals', icon: Share2, badge: '$1,750' },
              { label: 'Profile & Settings', path: '/borrower/settings', icon: Settings },
              { label: 'Help Desk / Support', path: '/support/tickets', icon: LifeBuoy },
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

    // Help desk / support active check
    if (target === '/support/tickets' && current.startsWith('/support')) {
      return true;
    }

    // Loan tracker active check (matches any /tracker path for Loan Tracker item)
    if (item.label === 'Loan Tracker' || target.endsWith('/tracker')) {
      return current.includes('/tracker');
    }

    // New Loan Request active check (only exact /borrower/applications/new)
    if (target === '/borrower/applications/new') {
      return current === '/borrower/applications/new';
    }

    // My Applications active check
    if (target === '/borrower/applications') {
      // Active if exactly /borrower/applications OR viewing an application detail (but not /new and not /tracker)
      if (current === '/borrower/applications') return true;
      if (current.startsWith('/borrower/applications/') && !current.includes('/new') && !current.includes('/tracker')) {
        return true;
      }
      return false;
    }

    // Admin applications active check
    if (target === '/admin/applications') {
      return current === '/admin/applications' || (current.startsWith('/admin/applications/') && !current.includes('/new'));
    }

    // Lead detail active check
    if (target === '/lender/leads' && current.startsWith('/lender/leads/')) {
      return true;
    }

    // Rep lead detail active check
    if (target === '/rep/leads' && current.startsWith('/rep/leads/')) {
      return true;
    }

    // Post-Funding Dashboard active check
    if (target.endsWith('/post-funding') && current.includes('/post-funding')) {
      return true;
    }

    // Money Club Member Portal active check
    if (target.endsWith('/money-club') && current.includes('/money-club')) {
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
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0B1730] text-slate-300 flex flex-col transition-transform duration-300 ease-in-out border-r border-slate-800 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-slate-800/80 bg-[#0B1730]">
          <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white shadow-md shadow-blue-900/30">
              <ShieldCheck className="w-5 h-5 text-[#D5B66A]" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-heading font-extrabold text-lg tracking-tight text-white">OAL</span>
                <span className="font-heading font-semibold text-lg tracking-tight text-blue-400">NETWORK</span>
              </div>
              <div className="text-[10px] font-semibold tracking-wider text-amber-400 uppercase">
                {currentRole} WORKSPACE
              </div>
            </div>
          </Link>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <div className="px-3 text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-2">
                {section.title}
              </div>
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
                        ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`ml-2 px-1.5 py-0.5 text-[10px] font-semibold rounded-md border ${
                          active
                            ? 'bg-blue-700 text-white border-blue-500/50'
                            : 'bg-slate-800 text-slate-300 border-slate-700/60 group-hover:border-slate-600'
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
        <div className="p-4 border-t border-slate-800 bg-[#0B1730]">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
            <Link
              to={`/${currentRole}/settings`}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 min-w-0 flex-1 hover:opacity-90 transition-opacity"
              title="View Profile & Settings"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-9 h-9 rounded-full object-cover border border-slate-700 flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold text-white truncate">{currentUser.name}</div>
                <div className="text-[10px] text-slate-400 truncate">{currentUser.company || currentUser.email}</div>
              </div>
            </Link>
            <Link
              to={`/${currentRole}/settings`}
              onClick={() => setIsOpen(false)}
              title="Profile & Settings"
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4" />
            </Link>
            <button
              onClick={() => {
                logout();
                navigate('/', { replace: true });
              }}
              title="Sign Out"
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
