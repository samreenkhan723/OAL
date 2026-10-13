import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { LOAN_PROGRAMS } from '../../data/loanPrograms';
import { computeSimulatedAuthToken } from '../../data/mockUsers';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  User,
  Mail,
  Phone,
  Lock,
  Building,
  TrendingUp,
  Sparkles,
  Scale,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Info,
  UploadCloud,
  FileText,
  FileCheck,
  Briefcase,
  X
} from 'lucide-react';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { validateEmailAvailability, addToast } = useApp();

  const fromLocation = location.state?.from;
  const searchParams = new URLSearchParams(location.search);
  const programSlug = location.state?.program || searchParams.get('program');
  const programTitle =
    location.state?.programTitle ||
    LOAN_PROGRAMS.find((p) => p.id === programSlug || p.slug === programSlug)?.title;

  const [form, setForm] = useState({
    role: 'borrower', // 'borrower' | 'lender' | 'rep'
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    password: '',
    agree: true,
    // Lender Verification Fields
    entityType: 'Direct Commercial Credit Fund',
    taxId: '',
    licenseFile: null,
    // OAL Representative Verification Fields
    experienceYears: '3-5 Years Commercial Debt Brokerage',
    specialty: 'Commercial Real Estate & SBA 7(a)',
    certifications: '',
    identityDocFile: null
  });

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fileError, setFileError] = useState('');

  // Safe client-side file handler (stores safe metadata only, never raw sensitive contents in localStorage)
  const handleFileUpload = (file, targetField) => {
    setFileError('');
    if (!file) return;

    // Allowed extensions check
    const allowedExtensions = ['.pdf', '.png', '.jpg', '.jpeg', '.doc', '.docx'];
    const fileExt = '.' + file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(fileExt)) {
      setFileError(`Invalid file format "${fileExt}". Please upload a PDF, PNG, JPG, or DOC file.`);
      return;
    }

    // Size limit check: 10 MB max
    const maxSizeBytes = 10 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setFileError(`File "${file.name}" exceeds the 10 MB size limit.`);
      return;
    }

    // Store safe metadata
    const fileMeta = {
      name: file.name,
      size: file.size >= 1024 * 1024 ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : `${(file.size / 1024).toFixed(1)} KB`,
      type: file.type || 'application/pdf',
      uploadedAt: new Date().toISOString()
    };

    setForm(prev => ({ ...prev, [targetField]: fileMeta }));
    addToast('Document Attached', `${file.name} successfully staged for compliance review.`, 'info');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setFileError('');

    // Field validation
    if (!form.fullName.trim() || !form.email.trim() || !form.password.trim() || !form.phone.trim()) {
      setError('Please fill in all required contact and personal credentials.');
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    // Duplicate email validation
    const emailNormalized = form.email.trim().toLowerCase();
    if (validateEmailAvailability && !validateEmailAvailability(emailNormalized)) {
      setError('An account with this email address already exists. Please sign in or use another email.');
      return;
    }

    // Role support: 'borrower', 'lender', 'rep'
    const selectedRole = form.role;

    // Lender verification validation
    if (selectedRole === 'lender') {
      if (!form.taxId.trim()) {
        setError('Federal Tax ID / EIN is required for Institutional Lender underwriting.');
        return;
      }
      if (!form.licenseFile) {
        setFileError('Please attach your Business License or Articles of Organization for compliance audit.');
        return;
      }
    }

    // Representative verification validation
    if (selectedRole === 'rep') {
      if (!form.certifications.trim()) {
        setError('Please provide your licensing or relevant certifications (e.g. NMLS, Brokerage License, or Finance Certifications).');
        return;
      }
      if (!form.identityDocFile) {
        setFileError('Please upload a Government ID or Driver License copy for placement agent verification.');
        return;
      }
    }

    // Unique user ID generation
    const uniqueUserId = `usr_${selectedRole}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

    // Build document metadata list
    const uploadedDocs = [];
    if (selectedRole === 'lender' && form.licenseFile) {
      uploadedDocs.push({
        id: `DOC-LIC-${Date.now()}`,
        name: form.licenseFile.name,
        category: 'Business License & Corporate Articles',
        size: form.licenseFile.size,
        uploadedAt: new Date().toISOString()
      });
    } else if (selectedRole === 'rep' && form.identityDocFile) {
      uploadedDocs.push({
        id: `DOC-ID-${Date.now()}`,
        name: form.identityDocFile.name,
        category: 'Identity Verification (Government ID)',
        size: form.identityDocFile.size,
        uploadedAt: new Date().toISOString()
      });
    }

    // Build the pending user record with actual submitted data
    const pendingUser = {
      id: uniqueUserId,
      name: form.fullName.trim(),
      email: emailNormalized,
      phone: form.phone.trim(),
      company: form.companyName.trim() || (selectedRole === 'rep' ? `${form.fullName.trim()} Brokerage` : `${form.fullName.trim()} Enterprises`),
      role: selectedRole,
      title: selectedRole === 'lender'
        ? 'Managing Partner / Underwriter'
        : selectedRole === 'rep'
        ? 'Commercial Placement Specialist'
        : 'Principal / Business Owner',
      avatar: selectedRole === 'lender'
        ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
        : selectedRole === 'rep'
        ? 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      verified: false,
      mfaEnabled: true,
      mfaVerified: false,
      verificationStatus: selectedRole === 'borrower' ? 'ACTIVE' : 'PENDING_APPROVAL',
      businessInfo: selectedRole === 'lender' ? {
        entityType: form.entityType,
        taxId: form.taxId.trim()
      } : null,
      repInfo: selectedRole === 'rep' ? {
        experienceYears: form.experienceYears,
        specialty: form.specialty,
        certifications: form.certifications.trim()
      } : null,
      documents: uploadedDocs,
      isPrototypeAccount: true,
      createdAt: new Date().toISOString(),
      simulatedAuthToken: computeSimulatedAuthToken(emailNormalized, form.password)
    };

    addToast('Registration Staged', 'Please complete the simulated OTP contact challenge and MFA.', 'info');

    let targetDestination = fromLocation;
    if (!targetDestination && selectedRole === 'borrower' && programSlug) {
      targetDestination = { pathname: '/borrower/applications/new', search: `?program=${programSlug}` };
    }

    // Forward the pending user state to the verification screens
    navigate('/auth/verify', {
      state: {
        pendingUser,
        from: targetDestination,
        program: programSlug,
        programTitle
      }
    });
  };


  return (
    <div className="min-h-screen bg-[#F0F9FF] flex flex-col lg:flex-row antialiased">
      {/* LEFT COLUMN: Visual Brand Showcase (Split 50% on desktop) */}
      <div className="relative hidden lg:flex lg:w-1/2 bg-[#002060] flex-col justify-between p-10 xl:p-14 text-white overflow-hidden shrink-0">
        {/* Background Image with Luminous Corporate Gradient (Image remains clearly visible) */}
        <div className="absolute inset-0 z-0">
          <img
            src="/signup_hero.jpg"
            alt="OAL Commercial Lending Exchange"
            className="w-full h-full object-cover object-center filter brightness-105 contrast-105"
          />
          {/* Luminous Brand Gradient Overlay — Navy depth with light-blue glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#001744]/95 via-[#002060]/75 to-[#0070C0]/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002060]/90 via-[#003B8E]/65 to-transparent" />
          {/* Subtle cyan glow for depth */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00B0F0]/20 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Top Header / Logo */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#002060] to-[#0070C0] border border-[#FFD200]/70 flex items-center justify-center text-white shadow-xl group-hover:border-[#FFD200] transition-colors">
              <ShieldCheck className="w-6 h-6 text-[#FFD200]" />
            </div>
            <div>
              <span className="font-heading font-extrabold text-2xl tracking-tight text-white block leading-none">
                OPM <span className="text-[#00B0F0]">ASAP</span>
              </span>
              <span className="text-[11px] uppercase font-bold tracking-widest text-[#FFD200] block mt-1">
                Commercial Lending NetWORK
              </span>
            </div>
          </Link>
        </div>

        {/* Center Content / Value Proposition */}
        <div className="relative z-10 space-y-7 my-auto py-8 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[#FFD200] text-xs font-bold tracking-wide shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#00B0F0]" />
            <span>Servicing All 50 States &bull; $10k to $500M+ &bull; 24-72 Hr Funding</span>
          </div>

          <h1 className="text-3xl sm:text-4xl xl:text-5xl font-heading font-extrabold text-white leading-[1.15] tracking-tight">
            Next-Generation Commercial Lending &amp; Underwriting
          </h1>

          <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-normal">
            Join the verified marketplace connecting commercial debt seekers and institutional lenders with transparent scoring and zero uncoordinated bidding.
          </p>

          {/* 3 Frosted Glass Trust Cards */}
          <div className="space-y-3 pt-1">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-start gap-3.5 hover:bg-white/15 transition-all">
              <div className="w-8 h-8 rounded-xl bg-[#00B0F0]/25 border border-[#00B0F0]/50 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-[#00B0F0]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white">180-Point Investment IQ Formula</h4>
                <p className="text-xs text-slate-200 mt-0.5 leading-snug">Credit, Cash Flow, Collateral, and Business Plan underwriting metrics.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-start gap-3.5 hover:bg-white/15 transition-all">
              <div className="w-8 h-8 rounded-xl bg-amber-400/25 border border-amber-400/50 flex items-center justify-center shrink-0 mt-0.5">
                <Scale className="w-4 h-4 text-[#FFD200]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white">Rule FR-08: Max 3 Lenders per Deal</h4>
                <p className="text-xs text-slate-200 mt-0.5 leading-snug">Protected files prevent excessive credit pulls and uncoordinated bidding.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-start gap-3.5 hover:bg-white/15 transition-all">
              <div className="w-8 h-8 rounded-xl bg-[#00B0F0]/25 border border-[#00B0F0]/50 flex items-center justify-center shrink-0 mt-0.5">
                <TrendingUp className="w-4 h-4 text-[#00B0F0]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white">Rapid 24–72 Hour Approvals</h4>
                <p className="text-xs text-slate-200 mt-0.5 leading-snug">Fast-track capital for restaurants, freight, franchise, healthcare &amp; real estate.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust & Compliance Bar */}
        <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-slate-200">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#FFD200]" />
            <span className="font-semibold text-white">USA Patriot Act Compliant</span>
          </div>
          <span className="text-[11px] text-slate-300 font-mono tracking-wider uppercase">256-Bit TLS Bank Encryption</span>
        </div>
      </div>

      {/* RIGHT COLUMN: The Registration Form (Split 50% on desktop) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16 relative overflow-y-auto bg-gradient-to-b from-[#F0F9FF] to-white">
        {/* Top bar with Back button and Mobile Logo */}
        <div className="flex items-center justify-between w-full max-w-[500px] mx-auto mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#002060] hover:text-[#0070C0] bg-white hover:bg-sky-50/80 border border-slate-200/90 shadow-xs hover:shadow-sm transition-all group"
            title="Back to Homepage"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5 text-[#0070C0]" />
            <span>Back to Home</span>
          </Link>

          {/* Mobile Logo (Visible on mobile & tablet) */}
          <div className="lg:hidden">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#002060] flex items-center justify-center text-white shadow-sm border border-[#FFD200]/50">
                <ShieldCheck className="w-4 h-4 text-[#FFD200]" />
              </div>
              <span className="font-heading font-extrabold text-base text-[#002060]">
                OAL <span className="text-[#00B0F0]">NETWORK</span>
              </span>
            </Link>
          </div>
        </div>

        {/* Center Form Card */}
        <div className="w-full max-w-[500px] mx-auto my-auto py-2">
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/60 p-7 sm:p-9 space-y-6">
            <div>
              <div className="inline-block px-2.5 py-0.5 rounded-md bg-sky-50 text-[#0070C0] text-[11px] font-bold uppercase tracking-wider mb-2">
                New Account Registration
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#002060] tracking-tight">
                Create an Account
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Select your account role to access the commercial debt exchange.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-xs text-rose-800">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{error}</span>
              </div>
            )}

            {/* Selected Program Announcement Banner */}
            {programSlug && (
              <div className="p-4 rounded-2xl bg-sky-50 border border-[#00B0F0]/40 flex items-start gap-3 text-xs text-[#002060]">
                <ShieldCheck className="w-5 h-5 text-[#0070C0] shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold block text-[#002060] text-sm">
                    Applying for {programTitle || programSlug}
                  </strong>
                  <span className="text-slate-600 mt-0.5 block leading-relaxed">
                    Complete registration and verification below to open your 6-step application wizard with this loan program pre-selected.
                  </span>
                </div>
              </div>
            )}

            {/* Role selector tabs */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-[#002060] mb-2">
                Select Account Role
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* 1. Commercial Borrower */}
                <button
                  type="button"
                  onClick={() => setForm({ ...form, role: 'borrower' })}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative ${
                    form.role === 'borrower'
                      ? 'border-[#0070C0] bg-sky-50/80 ring-2 ring-[#0070C0]/25 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-xs sm:text-sm font-bold text-[#002060]">Borrower</div>
                    {form.role === 'borrower' && (
                      <div className="w-4 h-4 rounded-full bg-[#0070C0] text-white flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 leading-snug">Seek commercial debt</div>
                </button>

                {/* 2. Institutional Lender */}
                <button
                  type="button"
                  onClick={() => setForm({ ...form, role: 'lender' })}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative ${
                    form.role === 'lender'
                      ? 'border-[#0070C0] bg-sky-50/80 ring-2 ring-[#0070C0]/25 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-xs sm:text-sm font-bold text-[#002060]">Lender</div>
                    {form.role === 'lender' && (
                      <div className="w-4 h-4 rounded-full bg-[#0070C0] text-white flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 leading-snug">Issue term sheets</div>
                </button>

                {/* 3. OAL Representative (Agent) */}
                <button
                  type="button"
                  onClick={() => setForm({ ...form, role: 'rep' })}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative ${
                    form.role === 'rep'
                      ? 'border-[#0070C0] bg-sky-50/80 ring-2 ring-[#0070C0]/25 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-xs sm:text-sm font-bold text-[#002060]">OAL Rep</div>
                    {form.role === 'rep' && (
                      <div className="w-4 h-4 rounded-full bg-[#0070C0] text-white flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 leading-snug">Mediate &amp; earn fee</div>
                </button>
              </div>

              {form.role !== 'borrower' && (
                <div className="mt-2 p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-2 text-[11px] text-amber-900 leading-relaxed">
                  <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Compliance Rule FR-02:</strong> {form.role === 'lender' ? 'Lender' : 'Representative'} registrations require review by the OAL Network Compliance Team before portal activation.
                  </span>
                </div>
              )}
            </div>

            {/* File Error Message */}
            {fileError && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-800">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{fileError}</span>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Primary Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#002060] mb-1.5">
                    {form.role === 'lender' ? 'Authorized Principal / Officer' : 'Full Legal Name'} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Marcus Vance"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className="w-full pl-10 pr-3.5 h-11 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0070C0] focus:border-[#0070C0] outline-none transition-all placeholder:text-slate-400 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#002060] mb-1.5">
                    {form.role === 'rep' ? 'Agency / Brokerage Firm' : 'Company / Entity Name'} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder={form.role === 'lender' ? 'e.g. Apex Horizon Capital LLC' : form.role === 'rep' ? 'e.g. Rostova Debt Brokerage' : 'e.g. Blue Harbor Bistro LLC'}
                      value={form.companyName}
                      onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                      className="w-full pl-10 pr-3.5 h-11 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0070C0] focus:border-[#0070C0] outline-none transition-all placeholder:text-slate-400 bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#002060] mb-1.5">
                    Business Email <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full pl-10 pr-3.5 h-11 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0070C0] focus:border-[#0070C0] outline-none transition-all placeholder:text-slate-400 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#002060] mb-1.5">
                    Mobile Phone (MFA) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full pl-10 pr-3.5 h-11 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0070C0] focus:border-[#0070C0] outline-none transition-all placeholder:text-slate-400 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* LENDER-SPECIFIC BUSINESS VERIFICATION FIELDS (PRD Mandate) */}
              {form.role === 'lender' && (
                <div className="p-4 rounded-2xl bg-sky-50/70 border border-[#00B0F0]/30 space-y-3.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#002060] uppercase tracking-wider">
                    <Briefcase className="w-4 h-4 text-[#0070C0]" />
                    <span>Institutional Underwriter Credentials</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Corporate Entity Type <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={form.entityType}
                        onChange={(e) => setForm({ ...form, entityType: e.target.value })}
                        className="w-full px-3 h-10 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0070C0] outline-none bg-white font-medium cursor-pointer"
                      >
                        <option value="Direct Commercial Credit Fund">Direct Commercial Credit Fund</option>
                        <option value="Private Debt Syndicate / Asset Manager">Private Debt Syndicate / Asset Manager</option>
                        <option value="Commercial Bank / FDIC Institution">Commercial Bank / FDIC Institution</option>
                        <option value="Family Office / Equity Sponsor">Family Office / Equity Sponsor</option>
                        <option value="Specialty Equipment Leasing Facility">Specialty Equipment Leasing Facility</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Federal Tax ID / EIN <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="XX-XXXXXXX"
                        value={form.taxId}
                        onChange={(e) => setForm({ ...form, taxId: e.target.value })}
                        className="w-full px-3 h-10 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0070C0] outline-none bg-white font-mono"
                      />
                    </div>
                  </div>

                  {/* Business License Upload Dropzone */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                      <span>Business License or Organization Articles <span className="text-rose-500">*</span></span>
                      <span className="text-[10px] text-slate-400 font-normal">PDF, PNG, JPG (Max 10MB)</span>
                    </label>

                    {form.licenseFile ? (
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-emerald-300 text-xs">
                        <div className="flex items-center gap-2 text-emerald-800 truncate">
                          <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="font-bold truncate">{form.licenseFile.name}</span>
                          <span className="text-slate-400 text-[11px] shrink-0">({form.licenseFile.size})</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setForm(prev => ({ ...prev, licenseFile: null }))}
                          className="text-slate-400 hover:text-rose-600 p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="border-2 border-dashed border-sky-300 hover:border-[#0070C0] bg-white hover:bg-sky-50/50 rounded-xl p-3 flex items-center justify-center gap-2 cursor-pointer transition-colors text-xs text-[#0070C0] font-bold">
                        <UploadCloud className="w-4 h-4 text-[#0070C0]" />
                        <span>Upload Business License / Articles File</span>
                        <input
                          type="file"
                          accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                          onChange={(e) => handleFileUpload(e.target.files?.[0], 'licenseFile')}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>
              )}

              {/* REPRESENTATIVE-SPECIFIC CREDENTIALS FIELDS (PRD Mandate) */}
              {form.role === 'rep' && (
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-300/60 space-y-3.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#002060] uppercase tracking-wider">
                    <Scale className="w-4 h-4 text-amber-700" />
                    <span>Placement Agent Qualifications</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Professional Experience <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={form.experienceYears}
                        onChange={(e) => setForm({ ...form, experienceYears: e.target.value })}
                        className="w-full px-3 h-10 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0070C0] outline-none bg-white font-medium cursor-pointer"
                      >
                        <option value="1-3 Years Commercial Debt Brokerage">1–3 Years Commercial Debt Brokerage</option>
                        <option value="3-5 Years Commercial Finance & Placement">3–5 Years Commercial Finance</option>
                        <option value="5-10 Years Senior Placement Specialist">5–10 Years Senior Placement Agent</option>
                        <option value="10+ Years Capital Markets & Commercial Advisory">10+ Years Institutional Financing</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Placement Specialty <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={form.specialty}
                        onChange={(e) => setForm({ ...form, specialty: e.target.value })}
                        className="w-full px-3 h-10 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0070C0] outline-none bg-white font-medium cursor-pointer"
                      >
                        <option value="Commercial Real Estate & SBA 7(a)">Commercial Real Estate &amp; SBA</option>
                        <option value="Working Capital, Lines of Credit & MCA Consolidation">Working Capital &amp; Credit Lines</option>
                        <option value="Equipment Leasing & Industrial Machinery Debt">Equipment &amp; Machinery Debt</option>
                        <option value="Franchise, Healthcare & Dental Practice Financing">Franchise &amp; Healthcare Financing</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Relevant Licensing &amp; Certifications <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. NMLS #198204, CCFB Certified, State Broker License"
                      value={form.certifications}
                      onChange={(e) => setForm({ ...form, certifications: e.target.value })}
                      className="w-full px-3 h-10 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0070C0] outline-none bg-white placeholder:text-slate-400"
                    />
                  </div>

                  {/* Identity Document Upload Dropzone */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                      <span>Government ID / Driver License Proof <span className="text-rose-500">*</span></span>
                      <span className="text-[10px] text-slate-400 font-normal">PDF, PNG, JPG (Max 10MB)</span>
                    </label>

                    {form.identityDocFile ? (
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-emerald-300 text-xs">
                        <div className="flex items-center gap-2 text-emerald-800 truncate">
                          <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="font-bold truncate">{form.identityDocFile.name}</span>
                          <span className="text-slate-400 text-[11px] shrink-0">({form.identityDocFile.size})</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setForm(prev => ({ ...prev, identityDocFile: null }))}
                          className="text-slate-400 hover:text-rose-600 p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="border-2 border-dashed border-amber-300 hover:border-amber-500 bg-white hover:bg-amber-50/50 rounded-xl p-3 flex items-center justify-center gap-2 cursor-pointer transition-colors text-xs text-amber-800 font-bold">
                        <UploadCloud className="w-4 h-4 text-amber-700" />
                        <span>Upload Driver License or Passport File</span>
                        <input
                          type="file"
                          accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                          onChange={(e) => handleFileUpload(e.target.files?.[0], 'identityDocFile')}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#002060] mb-1.5">
                  Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="At least 6 characters with numbers & symbols"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full pl-10 pr-11 h-11 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0070C0] focus:border-[#0070C0] outline-none transition-all placeholder:text-slate-400 bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <label className="flex items-start gap-2.5 pt-1 cursor-pointer select-none">
                <input
                  type="checkbox"
                  required
                  checked={form.agree}
                  onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                  className="w-4 h-4 text-[#0070C0] rounded mt-0.5 cursor-pointer"
                />
                <span className="text-xs text-slate-600 leading-relaxed">
                  I agree to the OAL Network Terms of Service, Privacy Policy, and consent to electronic underwriting communications.
                </span>
              </label>

              {/* Primary Create Account CTA Button with Signature High-Contrast OAL Yellow (#FFD200) */}
              <button
                type="submit"
                className="w-full h-12 rounded-xl text-sm sm:text-base font-heading font-extrabold text-[#002060] bg-[#FFD200] hover:bg-[#F5C500] active:bg-[#E5B500] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{form.role === 'borrower' ? 'Create Account & Verify' : 'Submit Credentials for Review'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="text-center text-xs sm:text-sm text-slate-600 pt-3 border-t border-slate-100">
              Already have an account?{' '}
              <Link
                to="/auth/login"
                state={{ from: fromLocation, program: programSlug, programTitle }}
                className="font-bold text-[#0070C0] hover:text-[#002060] hover:underline"
              >
                Sign In &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="w-full max-w-[500px] mx-auto mt-6 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>256-Bit TLS Encryption &bull; SOC2 Certified &bull; OAL Network</span>
        </div>
      </div>
    </div>
  );
};
