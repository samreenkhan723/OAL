import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { LOAN_PROGRAMS } from '../../data/loanPrograms';
import {
  FileText,
  DollarSign,
  Briefcase,
  Layers,
  Upload,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Save,
  HelpCircle,
  Building,
  User,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { VerifyBadge } from '../common/VerifyBadge';

export const ApplicationWizard = () => {
  const { createApplication, addToast, currentUser } = useApp();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('oal_draft_application');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      // Step 1: Business & Borrower Identity
      businessName: 'Coastal Catch Seafood Grill LLC',
      dbaName: 'Coastal Catch Bar & Grill',
      taxId: 'XX-XXX4912',
      businessAddress: '142 Harbor Point Way, Portland, ME 04101',
      businessPhone: '+1 (555) 782-3341',
      businessEmail: 'marcus@coastalcatchgrill.com',
      applicantName: currentUser?.name || 'Marcus Vance',
      applicantTitle: 'Managing Partner & Executive Chef',
      ownershipPercentage: 85,
      applicantPhone: '+1 (555) 392-1084',

      // Step 2: Financing Request
      loanType: 'restaurant',
      programName: 'Restaurant Financing',
      amount: 450000,
      loanPurpose: 'Kitchen equipment modernization and expanding waterfront dining deck by 40 seats.', // <= 20 words
      useOfFunds: 'Purchase commercial combi ovens, refrigeration walk-in, and expand covered patio capacity.',

      // Step 3: Business Plan & Financials
      annualRevenue: 1650000,
      monthlyCashFlow: 35000,
      creditScore: 720,
      yearsInBusiness: 4.5,
      existingDebt: 45000,
      businessSummary: 'Full-service fresh seafood dining operation with high customer loyalty, 4.5 years consistent profitability, and strong summer tourism volume.',

      // Step 4: Collateral
      hasCollateral: true,
      collateralType: 'Commercial Kitchen Equipment & Fixtures',
      collateralValue: 240000,
      existingLiens: 20000,

      // Step 5: Documents
      uploadedBankStatements: true,
      uploadedTaxReturns: true,
      uploadedLease: true,

      // Step 6: Review & Consent
      agreeToCreditCheck: true,
      certifyTruthful: true,
      agreeToTerms: true
    };
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleProgramSelect = (programId) => {
    const prog = LOAN_PROGRAMS.find(p => p.id === programId);
    setFormData(prev => ({
      ...prev,
      loanType: programId,
      programName: prog?.title || 'Commercial Loan'
    }));
  };

  const handleSaveDraft = () => {
    localStorage.setItem('oal_draft_application', JSON.stringify(formData));
    addToast('Draft Saved', 'Your application progress has been stored locally. You can resume at any time.', 'info');
  };

  const validateStep = (step) => {
    const errs = {};
    if (step === 1) {
      if (!formData.businessName?.trim()) errs.businessName = 'Business legal name is required.';
      if (!formData.applicantName?.trim()) errs.applicantName = 'Applicant full name is required.';
    }
    if (step === 2) {
      if (!formData.amount || Number(formData.amount) <= 0) errs.amount = 'Valid loan amount is required.';
      if (!formData.loanPurpose?.trim()) {
        errs.loanPurpose = 'Loan purpose is required.';
      } else {
        // Enforce PRD requirement: "20 words or fewer where required by source scoring form"
        const wordCount = formData.loanPurpose.trim().split(/\s+/).length;
        if (wordCount > 20) {
          errs.loanPurpose = `Loan purpose must be 20 words or fewer (current: ${wordCount} words).`;
        }
      }
    }
    if (step === 3) {
      if (!formData.annualRevenue || Number(formData.annualRevenue) <= 0) errs.annualRevenue = 'Annual revenue is required.';
      if (!formData.creditScore || Number(formData.creditScore) < 500) errs.creditScore = 'Credit score is required.';
    }
    if (step === 6) {
      if (!formData.agreeToCreditCheck || !formData.certifyTruthful || !formData.agreeToTerms) {
        errs.consent = 'All legal certifications and disclosures must be acknowledged before submission.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(6, prev + 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep(6)) return;

    const newApp = createApplication(formData);
    localStorage.removeItem('oal_draft_application');
    navigate(`/borrower/applications`);
  };

  const stepTitles = [
    { num: 1, label: 'Identity & Business', icon: Building },
    { num: 2, label: 'Financing Terms', icon: DollarSign },
    { num: 3, label: 'Financials & Cash Flow', icon: Briefcase },
    { num: 4, label: 'Collateral & Assets', icon: Layers },
    { num: 5, label: 'KYC & Documents', icon: Upload },
    { num: 6, label: 'Review & Submit', icon: CheckCircle2 },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden max-w-4xl mx-auto">
      {/* Wizard Header & Stepper */}
      <div className="p-6 bg-gradient-to-r from-[#0B1730] to-[#172B4D] text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D5B66A] text-slate-950 uppercase tracking-wider">
                Application Intake
              </span>
              <span className="text-xs text-slate-300">Form Wizard v2.4</span>
            </div>
            <h2 className="text-xl font-heading font-bold text-white mt-2">
              Commercial Loan Application
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Step {currentStep} of 6: {stepTitles[currentStep - 1].label}
            </p>
          </div>

          <button
            type="button"
            onClick={handleSaveDraft}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors self-start sm:self-auto"
          >
            <Save className="w-3.5 h-3.5 text-[#D5B66A]" />
            Save Draft
          </button>
        </div>

        {/* Stepper Dots */}
        <div className="grid grid-cols-6 gap-2 pt-6">
          {stepTitles.map((step) => {
            const isCompleted = step.num < currentStep;
            const isCurrent = step.num === currentStep;

            return (
              <div key={step.num} className="text-center group cursor-pointer" onClick={() => step.num < currentStep && setCurrentStep(step.num)}>
                <div
                  className={`h-1.5 rounded-full transition-all mb-2 ${
                    isCompleted
                      ? 'bg-blue-400'
                      : isCurrent
                      ? 'bg-[#D5B66A]'
                      : 'bg-white/20'
                  }`}
                />
                <span className={`text-[10px] hidden sm:block font-medium truncate ${
                  isCurrent ? 'text-white font-bold' : isCompleted ? 'text-slate-300' : 'text-slate-400'
                }`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Wizard Body Form */}
      <div className="p-6 sm:p-8">
        {/* STEP 1: BUSINESS & BORROWER IDENTITY */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Step 1: Borrower & Commercial Entity Identity</h3>
              <p className="text-xs text-slate-500 mt-1">
                Enter legal entity details as registered with your Secretary of State and IRS.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Legal Business Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  className={`w-full px-3.5 py-2.5 text-xs border rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none ${
                    errors.businessName ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                  }`}
                  placeholder="e.g. Acme Hospitality LLC"
                />
                {errors.businessName && <p className="text-[11px] text-rose-500 mt-1">{errors.businessName}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">DBA (Doing Business As)</label>
                <input
                  type="text"
                  value={formData.dbaName}
                  onChange={(e) => handleInputChange('dbaName', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  placeholder="e.g. Acme Bistro"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Federal Tax ID (EIN)</label>
                <input
                  type="text"
                  value={formData.taxId}
                  onChange={(e) => handleInputChange('taxId', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  placeholder="XX-XXXXXXX"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Business Phone Number</label>
                <input
                  type="text"
                  value={formData.businessPhone}
                  onChange={(e) => handleInputChange('businessPhone', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                Principal Applicant & Ownership
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Primary Applicant Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.applicantName}
                    onChange={(e) => handleInputChange('applicantName', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                  {errors.applicantName && <p className="text-[11px] text-rose-500 mt-1">{errors.applicantName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Executive Title</label>
                  <input
                    type="text"
                    value={formData.applicantTitle}
                    onChange={(e) => handleInputChange('applicantTitle', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ownership (%)</label>
                  <input
                    type="number"
                    value={formData.ownershipPercentage}
                    onChange={(e) => handleInputChange('ownershipPercentage', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: FINANCING REQUEST */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Step 2: Financing Request & Program Selection</h3>
              <p className="text-xs text-slate-500 mt-1">
                Select your loan category from OAL's 8 specialized commercial debt programs.
              </p>
            </div>

            {/* Loan Program Cards */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Selected Loan Program</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {LOAN_PROGRAMS.map((prog) => {
                  const isSelected = formData.loanType === prog.id;
                  return (
                    <button
                      key={prog.id}
                      type="button"
                      onClick={() => handleProgramSelect(prog.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/80 ring-2 ring-blue-600/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900">{prog.title}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5 truncate">{prog.typicalRate}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Requested Financing Amount ($) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">$</span>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => handleInputChange('amount', e.target.value)}
                    className="w-full pl-8 pr-3.5 py-2.5 text-xs font-bold border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                {errors.amount && <p className="text-[11px] text-rose-500 mt-1">{errors.amount}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                  <span>Loan Purpose (Max 20 words) <span className="text-rose-500">*</span></span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    {formData.loanPurpose ? formData.loanPurpose.trim().split(/\s+/).length : 0} / 20 words
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.loanPurpose}
                  onChange={(e) => handleInputChange('loanPurpose', e.target.value)}
                  className={`w-full px-3.5 py-2.5 text-xs border rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none ${
                    errors.loanPurpose ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                  }`}
                  placeholder="Concise commercial summary (<= 20 words)"
                />
                {errors.loanPurpose ? (
                  <p className="text-[11px] text-rose-500 mt-1">{errors.loanPurpose}</p>
                ) : (
                  <p className="text-[10px] text-slate-400 mt-1">
                    *Source requirement: strict 20-word limit enforced for scoring intake (FR-03).
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Use of Proceeds</label>
              <textarea
                rows={2}
                value={formData.useOfFunds}
                onChange={(e) => handleInputChange('useOfFunds', e.target.value)}
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                placeholder="Break down how loan proceeds will be allocated..."
              />
            </div>
          </div>
        )}

        {/* STEP 3: BUSINESS PLAN & FINANCIALS */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Step 3: Business Plan, Revenue & Cash Flow</h3>
              <p className="text-xs text-slate-500 mt-1">
                These financial inputs feed directly into your 180-point Investment IQ assessment.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Annual Gross Revenue ($) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.annualRevenue}
                  onChange={(e) => handleInputChange('annualRevenue', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
                {errors.annualRevenue && <p className="text-[11px] text-rose-500 mt-1">{errors.annualRevenue}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Monthly Operating Cash Flow ($)
                </label>
                <input
                  type="number"
                  value={formData.monthlyCashFlow}
                  onChange={(e) => handleInputChange('monthlyCashFlow', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Estimated Personal Credit Score <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  min="500"
                  max="850"
                  value={formData.creditScore}
                  onChange={(e) => handleInputChange('creditScore', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
                <span className="text-[10px] text-slate-400">Range: 500 – 850 (FICO)</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Years in Commercial Operation</label>
                <input
                  type="number"
                  step="0.5"
                  value={formData.yearsInBusiness}
                  onChange={(e) => handleInputChange('yearsInBusiness', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Executive Operations Summary / Business Model
              </label>
              <textarea
                rows={3}
                value={formData.businessSummary}
                onChange={(e) => handleInputChange('businessSummary', e.target.value)}
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* STEP 4: COLLATERAL & ASSETS */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Step 4: Collateral & Physical Assets</h3>
              <p className="text-xs text-slate-500 mt-1">
                Collateral awards up to 30 points on the Investment IQ scale.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-900">Are you offering physical asset collateral?</div>
                <div className="text-[11px] text-slate-500">Real estate, commercial vehicles, equipment, or inventory.</div>
              </div>
              <input
                type="checkbox"
                checked={formData.hasCollateral}
                onChange={(e) => handleInputChange('hasCollateral', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </div>

            {formData.hasCollateral && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Collateral Description & Type</label>
                  <input
                    type="text"
                    value={formData.collateralType}
                    onChange={(e) => handleInputChange('collateralType', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Estimated Asset Market Value ($)</label>
                  <input
                    type="number"
                    value={formData.collateralValue}
                    onChange={(e) => handleInputChange('collateralValue', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 5: SUPPORTING DOCUMENTS & KYC */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Step 5: KYC Verification & Document Upload</h3>
              <p className="text-xs text-slate-500 mt-1">
                Upload verified business financial evidence. Verified status unlocks full marketplace distribution.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { title: 'Last 6 Months Business Bank Statements', status: 'Attached', size: '4.8 MB PDF' },
                { title: 'Prior 2 Years Corporate Tax Returns', status: 'Attached', size: '7.1 MB PDF' },
                { title: 'State Operating License / Entity Formation', status: 'Attached', size: '1.4 MB PDF' },
              ].map((doc, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">{doc.title}</div>
                      <div className="text-[10px] text-slate-400">{doc.size}</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Ready for Review
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Identity Verification Guarantee:</strong> All financial uploads are encrypted using AES-256 and reviewed exclusively by authorized OAL compliance officers. Participating lenders only see sanitized summary metrics until a working deal is claimed.
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: REVIEW, DECLARATIONS & SUBMISSION */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Step 6: Review, Declarations & Submission</h3>
              <p className="text-xs text-slate-500 mt-1">
                Please verify all terms before submitting to the OAL underwriting exchange.
              </p>
            </div>

            {/* Application Summary Box */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-3">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Applicant Business:</span>
                <span className="font-bold text-slate-900">{formData.businessName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Loan Program:</span>
                <span className="font-bold text-blue-600">{formData.programName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Requested Amount:</span>
                <span className="font-extrabold text-slate-950 text-sm">${Number(formData.amount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Stated Purpose:</span>
                <span className="font-medium text-slate-800 text-right max-w-xs">{formData.loanPurpose}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Preliminary Investment IQ:</span>
                <span className="font-bold text-[#D5B66A] bg-[#0B1730] px-2.5 py-0.5 rounded">Estimated 150+ / 180 Max</span>
              </div>
            </div>

            {/* Checkbox Disclosures */}
            <div className="space-y-3 pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreeToCreditCheck}
                  onChange={(e) => handleInputChange('agreeToCreditCheck', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded mt-0.5"
                />
                <span className="text-xs text-slate-700">
                  I authorize OAL Network and participating institutional lenders to perform commercial credit underwriting and verify bank balance histories.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.certifyTruthful}
                  onChange={(e) => handleInputChange('certifyTruthful', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded mt-0.5"
                />
                <span className="text-xs text-slate-700">
                  I certify that all statements, revenues, and debt figures in this submission are accurate and complete to the best of my knowledge.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded mt-0.5"
                />
                <span className="text-xs text-slate-700">
                  I agree to the OAL Network Terms of Service and understand that offers will be mediated through my dedicated OAL Representative.
                </span>
              </label>
            </div>

            {errors.consent && (
              <p className="text-xs text-rose-500 font-semibold">{errors.consent}</p>
            )}
          </div>
        )}
      </div>

      {/* Wizard Footer Nav Actions */}
      <div className="p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={prevStep}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-3">
          {currentStep < 6 ? (
            <button
              type="button"
              onClick={nextStep}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-600/20 transition-all"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 shadow-lg shadow-emerald-600/25 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Submit Loan Application</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
