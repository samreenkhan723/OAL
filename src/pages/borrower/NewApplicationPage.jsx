import React from 'react';
import { ApplicationWizard } from '../../components/loans/ApplicationWizard';

export const NewApplicationPage = () => {
  return (
    <div className="space-y-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-heading font-extrabold text-[#0B1730]">
          Start Commercial Financing Application
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Complete the 6 intake sections below. Save your progress at any time.
        </p>
      </div>

      <ApplicationWizard />
    </div>
  );
};
