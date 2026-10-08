import React, { useEffect } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export const PublicApplyPage = () => {
  const { isAuthenticated, currentRole } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const program = searchParams.get('program');

  useEffect(() => {
    const searchString = location.search || (program ? `?program=${program}` : '');
    const destination = `/borrower/applications/new${searchString}`;

    if (isAuthenticated && currentRole === 'borrower') {
      navigate(destination, { replace: true });
    } else if (isAuthenticated) {
      // Logged in under another role -> route to respective dashboard
      const roleDashboards = {
        lender: '/lender/dashboard',
        rep: '/rep/dashboard',
        admin: '/admin/dashboard',
        support: '/support/tickets'
      };
      navigate(roleDashboards[currentRole] || '/borrower/dashboard', { replace: true });
    } else {
      // Unauthenticated visitor -> redirect to register per client requirement to create an account first
      navigate('/auth/register', {
        replace: true,
        state: {
          from: { pathname: '/borrower/applications/new', search: searchString },
          program: program,
          message: 'Please create an account or sign in to start your commercial loan application.'
        }
      });
    }
  }, [isAuthenticated, currentRole, navigate, location.search, program]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center p-6">
      <div className="text-center space-y-3 max-w-sm">
        <div className="w-9 h-9 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <h3 className="text-sm font-bold text-slate-800">Redirecting to Secure Application Portal</h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          Routing to the authenticated borrower intake wizard...
        </p>
      </div>
    </div>
  );
};

