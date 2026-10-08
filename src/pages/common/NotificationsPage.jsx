import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  CheckCircle2,
  DollarSign,
  Briefcase,
  FolderCheck,
  ShieldAlert,
  Clock,
  Check,
  Trash2,
  Filter,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

export const NotificationsPage = () => {
  const { currentRole } = useApp();

  const [activeCategory, setActiveCategory] = useState('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  // Realistic mock notifications list with rich metadata
  const [notificationList, setNotificationList] = useState([
    {
      id: 'notif-1',
      title: 'Binding Term Sheet Submitted on APP-2026-1082',
      category: 'offers',
      timestamp: '12 minutes ago',
      read: false,
      priority: 'high',
      icon: DollarSign,
      iconColor: 'text-blue-600 bg-blue-50 border-blue-200',
      description: 'Institutional Lender #9203 submitted an offer for $425,000 at 8.25% fixed with 60 months amortization.',
      actionLink: currentRole === 'lender' ? '/lender/offers' : '/borrower/offers',
      actionLabel: 'Review Offer Sheet'
    },
    {
      id: 'notif-2',
      title: 'Working Deal Slot 2 of 3 Claimed (Rule FR-08)',
      category: 'deals',
      timestamp: '2 hours ago',
      read: false,
      priority: 'normal',
      icon: Briefcase,
      iconColor: 'text-purple-600 bg-purple-50 border-purple-200',
      description: 'Blue Harbor Seafood Bistro commercial file has reached 2 concurrent underwriting claims. 1 slot remaining.',
      actionLink: currentRole === 'lender' ? '/lender/working-deals' : '/borrower/applications/APP-2026-1082/tracker',
      actionLabel: 'View Deal Status'
    },
    {
      id: 'notif-3',
      title: 'KYC Document Verified by Compliance Reviewer',
      category: 'kyc',
      timestamp: '1 day ago',
      read: true,
      priority: 'normal',
      icon: FolderCheck,
      iconColor: 'text-teal-600 bg-teal-50 border-teal-200',
      description: 'Corporate Tax Returns (2024-2025) successfully approved under Bank Secrecy Act / FinCEN guidelines.',
      actionLink: currentRole === 'admin' ? '/admin/verification' : '/borrower/documents',
      actionLabel: 'View Documents'
    },
    {
      id: 'notif-4',
      title: 'Mediated Message from OAL Rep Elena Rostova',
      category: 'messages',
      timestamp: '1 day ago',
      read: true,
      priority: 'normal',
      icon: MessageSquare,
      iconColor: 'text-blue-600 bg-blue-50 border-blue-200',
      description: 'Underwriter requested clarification regarding 2025 Q3 seasonal payroll adjustments. Please review thread.',
      actionLink: `/${currentRole}/messages`,
      actionLabel: 'Open Chat Channel'
    },
    {
      id: 'notif-5',
      title: 'MFA Security Heartbeat Check Confirmed',
      category: 'system',
      timestamp: '3 days ago',
      read: true,
      priority: 'low',
      icon: CheckCircle2,
      iconColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      description: 'Two-Factor Authentication device verified successfully from IP 192.168.1.100.',
      actionLink: `/${currentRole}/settings`,
      actionLabel: 'Security Settings'
    }
  ]);

  const unreadCount = notificationList.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    setNotificationList(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleClearAll = () => {
    setNotificationList([]);
  };

  const handleToggleRead = (id) => {
    setNotificationList(prev =>
      prev.map(n => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const handleRemove = (id) => {
    setNotificationList(prev => prev.filter(n => n.id !== id));
  };

  const categories = [
    { id: 'all', label: 'All Activity' },
    { id: 'offers', label: 'Offers & Term Sheets' },
    { id: 'deals', label: 'Working Deals' },
    { id: 'kyc', label: 'Verification & KYC' },
    { id: 'messages', label: 'Messages' },
    { id: 'system', label: 'System & Security' }
  ];

  const filteredNotifications = notificationList.filter(n => {
    const matchesCategory = activeCategory === 'all' || n.category === activeCategory;
    const matchesUnread = !showUnreadOnly || !n.read;
    return matchesCategory && matchesUnread;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
              Notifications & Activity Feed
            </h1>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                {unreadCount} New
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time commercial loan updates, underwriting milestone events, and compliance alerts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 flex-1 sm:flex-none cursor-pointer"
            >
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Mark all read</span>
            </button>
          )}

          {notificationList.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-rose-50 hover:text-rose-700 text-slate-500 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Category Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Unread toggle */}
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-600 select-none">
            <input
              type="checkbox"
              checked={showUnreadOnly}
              onChange={(e) => setShowUnreadOnly(e.target.checked)}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Unread only</span>
          </label>
        </div>
      </div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 space-y-3">
          <Bell className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">No Notifications to Display</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {showUnreadOnly
              ? 'You have caught up with all unread activity.'
              : 'There are no recent alerts in this category.'}
          </p>
          {showUnreadOnly && (
            <button
              onClick={() => setShowUnreadOnly(false)}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              View all notifications
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((notif) => {
            const Icon = notif.icon;
            return (
              <div
                key={notif.id}
                className={`bg-white rounded-2xl border transition-all p-5 shadow-xs flex flex-col sm:flex-row sm:items-start justify-between gap-4 ${
                  !notif.read ? 'border-blue-200 bg-blue-50/20' : 'border-slate-200/90'
                }`}
              >
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border flex-shrink-0 ${notif.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className={`text-sm font-bold ${!notif.read ? 'text-slate-900' : 'text-slate-700'}`}>
                        {notif.title}
                      </h4>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                      )}
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {notif.timestamp}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {notif.description}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2 self-start sm:self-center flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 w-full sm:w-auto justify-between sm:justify-end">
                  {notif.actionLink && (
                    <Link
                      to={notif.actionLink}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
                    >
                      <span>{notif.actionLabel}</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  )}

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleToggleRead(notif.id)}
                      title={notif.read ? 'Mark as unread' : 'Mark as read'}
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    >
                      <Check className={`w-4 h-4 ${notif.read ? 'text-emerald-600' : ''}`} />
                    </button>

                    <button
                      onClick={() => handleRemove(notif.id)}
                      title="Dismiss notification"
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
