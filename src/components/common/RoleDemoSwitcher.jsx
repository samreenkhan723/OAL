import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Users, RotateCcw, ChevronUp, ChevronDown, ShieldCheck, Briefcase, Building, LifeBuoy, Globe, UserCheck } from 'lucide-react';

export const RoleDemoSwitcher = () => {
  const { currentRole, switchRole, resetDemoData, currentUser } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const ROLES = [
    {
      id: 'borrower',
      label: 'Borrower',
      name: 'Marcus Vance',
      sub: 'Blue Harbor Seafood',
      route: '/borrower/dashboard',
      icon: <Briefcase className="w-4 h-4 text-blue-500" />
    },
    {
      id: 'lender',
      label: 'Lender',
      name: 'Apex Horizon Capital',
      sub: 'Institutional Fund',
      route: '/lender/dashboard',
      icon: <Building className="w-4 h-4 text-purple-500" />
    },
    {
      id: 'rep',
      label: 'OAL Rep',
      name: 'Elena Rostova',
      sub: 'Senior Placement Agent',
      route: '/rep/dashboard',
      icon: <UserCheck className="w-4 h-4 text-amber-500" />
    },
    {
      id: 'admin',
      label: 'Admin',
      name: 'Victoria Sterling',
      sub: 'Super Admin Oversight',
      route: '/admin/dashboard',
      icon: <ShieldCheck className="w-4 h-4 text-rose-500" />
    },
    {
      id: 'support',
      label: 'Help Desk',
      name: 'David Kim',
      sub: 'Support Team Lead',
      route: '/support/tickets',
      icon: <LifeBuoy className="w-4 h-4 text-teal-500" />
    },
    {
      id: 'public',
      label: 'Public Visitor',
      name: 'Prospective Client',
      sub: 'Marketing Website',
      route: '/',
      icon: <Globe className="w-4 h-4 text-slate-500" />
    }
  ];

  const handleSelectRole = (role) => {
    switchRole(role.id);
    navigate(role.route);
  };

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 no-print">
      <div className="bg-[#0B1730]/95 backdrop-blur-md border border-slate-700/80 rounded-2xl shadow-2xl text-white px-3 py-2 flex flex-col items-center">
        {/* Collapsed Bar */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 pr-2 border-r border-slate-700">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-slate-300">DEMO ROLE:</span>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              {currentRole}
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">({currentUser?.name})</span>
          </div>

          <div className="flex items-center gap-1">
            {ROLES.slice(0, 4).map(role => (
              <button
                key={role.id}
                onClick={() => handleSelectRole(role)}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
                  currentRole === role.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-slate-800 rounded-lg text-slate-300 transition-colors ml-1"
            title="Toggle Role Selector & Reset"
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>

        {/* Expanded Panel */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-slate-700/80 w-full flex flex-col gap-2">
            <div className="text-[11px] text-slate-400 flex justify-between items-center px-1">
              <span>Switch platform perspective & RBAC permissions:</span>
              <button
                onClick={resetDemoData}
                className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 transition-colors font-medium"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Demo Data
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ROLES.map(role => (
                <button
                  key={role.id}
                  onClick={() => {
                    handleSelectRole(role);
                    setIsExpanded(false);
                  }}
                  className={`flex items-start gap-2.5 p-2 rounded-xl text-left border transition-all ${
                    currentRole === role.id
                      ? 'bg-blue-900/60 border-blue-500 shadow-md'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="mt-0.5">{role.icon}</div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                      {role.label}
                      {currentRole === role.id && (
                        <span className="text-[9px] bg-blue-500/30 text-blue-300 px-1 rounded">Active</span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-300 truncate">{role.name}</div>
                    <div className="text-[10px] text-slate-400 truncate">{role.sub}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
