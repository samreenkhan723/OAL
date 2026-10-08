import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { NotificationToast } from '../components/common/NotificationToast';

export const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col text-[#0F172A] relative overflow-x-hidden">
      <Navbar />
      
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>

      <Footer />

      {/* Global Notifications Toast */}
      <NotificationToast />
    </div>
  );
};
