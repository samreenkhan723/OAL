import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Award,
  ShieldCheck,
  CheckCircle2,
  Upload,
  FileText,
  Trash2,
  AlertCircle,
  HelpCircle,
  Building,
  User,
  Users
} from 'lucide-react';

export const AccreditedInvestorModal = ({ isOpen, onClose, onSuccess }) => {
  const { submitInvestorVerification, addToast, currentUser } = useApp();

  const [applicantType, setApplicantType] = useState('individual'); // 'individual' | 'joint' | 'corporate'

  // Individual / Joint financial fields
  const [netWorthExceeds1M, setNetWorthExceeds1M] = useState(true);
  const [annualIncome200k, setAnnualIncome200k] = useState(true);
  const [jointIncome300k, setJointIncome300k] = useState(false);
  const [estimatedNetWorth, setEstimatedNetWorth] = useState('1450000');
  const [estimatedIncome, setEstimatedIncome] = useState('240000');

  // Corporate fields
  const [corporateAssetsExceeds5M, setCorporateAssetsExceeds5M] = useState(true);
  const [entityAccreditedOwnership, setEntityAccreditedOwnership] = useState(true);
  const [corporateAssets, setCorporateAssets] = useState('6800000');

  // FINRA Credentials
  const [finraLicense, setFinraLicense] = useState('none'); // 'none' | 'series7' | 'series65' | 'series82'
  const [licenseNumber, setLicenseNumber] = useState('');

  // Simulated uploaded documents
  const [documents, setDocuments] = useState([
    {
      id: 'doc-1',
      name: 'cpa_letter_accreditation_attestation.pdf',
      type: 'CPA / Attorney Certification',
      size: '2.4 MB',
      uploadedAt: new Date().toISOString()
    }
  ]);
  const [uploadCategory, setUploadCategory] = useState('CPA / Attorney Certification');
  const [simulatedFileName, setSimulatedFileName] = useState('');

  // Legal Consent
  const [declarationsAcknowledged, setDeclarationsAcknowledged] = useState(false);
  const [consentToVerify, setConsentToVerify] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleAddDocument = () => {
    const fileName = simulatedFileName.trim() || `${uploadCategory.toLowerCase().replace(/[^a-z0-9]/g, '_')}_verified.pdf`;
    const newDoc = {
      id: `doc-${Date.now()}`,
      name: fileName,
      type: uploadCategory,
      size: `${(Math.random() * 3 + 1).toFixed(1)} MB`,
      uploadedAt: new Date().toISOString()
    };
    setDocuments(prev => [...prev, newDoc]);
    setSimulatedFileName('');
    addToast('Document Attached', `${fileName} added to verification package.`, 'info');
  };

  const handleRemoveDoc = (id) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
  };

  const validate = () => {
    const errs = {};
    if (!declarationsAcknowledged) {
      errs.declarations = 'You must acknowledge the legal truthfulness declaration.';
    }
    if (!consentToVerify) {
      errs.consent = 'You must consent to underwriting accreditation verification.';
    }

    if (applicantType === 'individual' && !netWorthExceeds1M && !annualIncome200k && finraLicense === 'none') {
      errs.qualification = 'You must affirm at least one qualifying individual financial or FINRA credential.';
    }
    if (applicantType === 'joint' && !netWorthExceeds1M && !jointIncome300k && finraLicense === 'none') {
      errs.qualification = 'You must affirm joint net worth > $1M, joint income > $300k, or a qualifying FINRA credential.';
    }
    if (applicantType === 'corporate' && !corporateAssetsExceeds5M && !entityAccreditedOwnership) {
      errs.qualification = 'Corporate applicants must declare > $5M in assets or 100% accredited ownership.';
    }

    if (finraLicense !== 'none' && !licenseNumber.trim()) {
      errs.licenseNumber = 'Please provide your CRD or license registration number.';
    }

    if (documents.length === 0) {
      errs.documents = 'At least one supporting verification document (CPA letter, W-2, or FINRA proof) is required.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    const result = submitInvestorVerification({
      applicantType,
      netWorthExceeds1M: applicantType !== 'corporate' ? netWorthExceeds1M : false,
      annualIncome200k: applicantType === 'individual' ? annualIncome200k : false,
      jointIncome300k: applicantType === 'joint' ? jointIncome300k : false,
      corporateAssetsExceeds5M: applicantType === 'corporate' ? corporateAssetsExceeds5M : false,
      entityAccreditedOwnership: applicantType === 'corporate' ? entityAccreditedOwnership : false,
      finraLicense,
      licenseNumber,
      estimatedNetWorth,
      estimatedIncome,
      corporateAssets,
      documents,
      declarationsAcknowledged,
      consentToVerify
    });

    setSubmitting(false);
    if (result.success) {
      if (onSuccess) onSuccess(result.verification);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-auto">
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-[#001744] via-[#002060] to-[#003882] text-white flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-[#FFD200] text-[#002060]">
                Investment IQ — LINV IQ
              </span>
              <span className="text-xs text-slate-300 font-medium">
                SEC Rule 501 / FINRA Standards
              </span>
            </div>
            <h2 className="text-xl font-heading font-extrabold text-white mt-1">
              Apply for Accredited Investor Verification
            </h2>
            <p className="text-xs text-slate-300">
              Submit your qualification declarations and documents to unlock VIP Diamond Club tier and certified investor status.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 text-slate-900">
          {/* APPLICANT TYPE SELECTOR */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              1. Select Applicant Legal Structure
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setApplicantType('individual')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  applicantType === 'individual'
                    ? 'border-[#002060] bg-blue-50/70 ring-2 ring-[#002060]/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <User className={`w-4 h-4 ${applicantType === 'individual' ? 'text-[#002060]' : 'text-slate-400'}`} />
                  <span className="text-xs font-bold text-slate-900">Individual</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  $1M+ Net Worth or $200k+ past 2 yrs income
                </p>
              </button>

              <button
                type="button"
                onClick={() => setApplicantType('joint')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  applicantType === 'joint'
                    ? 'border-[#002060] bg-blue-50/70 ring-2 ring-[#002060]/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Users className={`w-4 h-4 ${applicantType === 'joint' ? 'text-[#002060]' : 'text-slate-400'}`} />
                  <span className="text-xs font-bold text-slate-900">Joint / Spousal</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  $1M+ Net Worth or $300k+ combined income
                </p>
              </button>

              <button
                type="button"
                onClick={() => setApplicantType('corporate')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  applicantType === 'corporate'
                    ? 'border-[#002060] bg-blue-50/70 ring-2 ring-[#002060]/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Building className={`w-4 h-4 ${applicantType === 'corporate' ? 'text-[#002060]' : 'text-slate-400'}`} />
                  <span className="text-xs font-bold text-slate-900">Corporate Entity</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  $5M+ Balance sheet assets or 100% accredited
                </p>
              </button>
            </div>
          </div>

          {/* FINANCIAL QUALIFICATION DECLARATIONS */}
          <div className="p-4.5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                2. Financial Accreditation Criteria ({applicantType.toUpperCase()})
              </h4>
              <span className="text-[10px] font-semibold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded">
                Doc 4 Line 279 Standards
              </span>
            </div>

            {/* Individual Criteria */}
            {applicantType === 'individual' && (
              <div className="space-y-3 text-xs">
                <label className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200 cursor-pointer hover:bg-slate-50/70">
                  <input
                    type="checkbox"
                    checked={netWorthExceeds1M}
                    onChange={(e) => setNetWorthExceeds1M(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <span className="font-bold text-slate-900 block">
                      Net Worth Exceeds $1,000,000 (25 / 25 Points)
                    </span>
                    <span className="text-slate-500 text-[11px]">
                      Individual net worth or joint net worth with spouse exceeds $1M, strictly excluding the estimated value of your primary residence.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200 cursor-pointer hover:bg-slate-50/70">
                  <input
                    type="checkbox"
                    checked={annualIncome200k}
                    onChange={(e) => setAnnualIncome200k(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <span className="font-bold text-slate-900 block">
                      Individual Annual Income &gt; $200,000 (15 / 15 Points)
                    </span>
                    <span className="text-slate-500 text-[11px]">
                      Individual annual earned income exceeded $200,000 in each of the past two calendar years with reasonable expectation of matching level this year.
                    </span>
                  </div>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Estimated Qualifying Net Worth ($ USD)
                    </label>
                    <input
                      type="number"
                      value={estimatedNetWorth}
                      onChange={(e) => setEstimatedNetWorth(e.target.value)}
                      placeholder="e.g. 1500000"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Average Past 2 Years Annual Income ($ USD)
                    </label>
                    <input
                      type="number"
                      value={estimatedIncome}
                      onChange={(e) => setEstimatedIncome(e.target.value)}
                      placeholder="e.g. 240000"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Joint Criteria */}
            {applicantType === 'joint' && (
              <div className="space-y-3 text-xs">
                <label className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200 cursor-pointer hover:bg-slate-50/70">
                  <input
                    type="checkbox"
                    checked={netWorthExceeds1M}
                    onChange={(e) => setNetWorthExceeds1M(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <span className="font-bold text-slate-900 block">
                      Joint Spousal Net Worth Exceeds $1,000,000 (25 / 25 Points)
                    </span>
                    <span className="text-slate-500 text-[11px]">
                      Combined net worth with spouse or partner exceeds $1,000,000, excluding the primary residential property.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200 cursor-pointer hover:bg-slate-50/70">
                  <input
                    type="checkbox"
                    checked={jointIncome300k}
                    onChange={(e) => setJointIncome300k(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <span className="font-bold text-slate-900 block">
                      Joint Spousal Annual Income &gt; $300,000 (15 / 15 Points)
                    </span>
                    <span className="text-slate-500 text-[11px]">
                      Combined annual income with spouse exceeded $300,000 in each of the past two calendar years.
                    </span>
                  </div>
                </label>
              </div>
            )}

            {/* Corporate Entity Criteria */}
            {applicantType === 'corporate' && (
              <div className="space-y-3 text-xs">
                <label className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200 cursor-pointer hover:bg-slate-50/70">
                  <input
                    type="checkbox"
                    checked={corporateAssetsExceeds5M}
                    onChange={(e) => setCorporateAssetsExceeds5M(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <span className="font-bold text-slate-900 block">
                      Entity Total Balance Sheet Assets &gt; $5,000,000 (25 / 25 Points)
                    </span>
                    <span className="text-slate-500 text-[11px]">
                      Total corporate assets exceed $5,000,000, not formed for the specific purpose of acquiring the securities offered.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200 cursor-pointer hover:bg-slate-50/70">
                  <input
                    type="checkbox"
                    checked={entityAccreditedOwnership}
                    onChange={(e) => setEntityAccreditedOwnership(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <span className="font-bold text-slate-900 block">
                      100% Accredited Equity Ownership or Regulated Institution (25 / 25 Points)
                    </span>
                    <span className="text-slate-500 text-[11px]">
                      All equity owners are accredited investors, or the entity is a registered investment company, bank, or insurance institution.
                    </span>
                  </div>
                </label>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Total Certified Corporate Balance Sheet Assets ($ USD)
                  </label>
                  <input
                    type="number"
                    value={corporateAssets}
                    onChange={(e) => setCorporateAssets(e.target.value)}
                    placeholder="e.g. 6800000"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {errors.qualification && (
              <p className="text-xs text-rose-600 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.qualification}
              </p>
            )}
          </div>

          {/* FINRA PROFESSIONAL CREDENTIALS */}
          <div className="p-4.5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                3. FINRA Professional Licensing Credentials
              </label>
              <span className="text-[10px] font-semibold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded">
                10 / 10 Points
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              {[
                { id: 'series7', label: 'Series 7', desc: 'General Securities Rep' },
                { id: 'series65', label: 'Series 65', desc: 'Investment Adviser Rep' },
                { id: 'series82', label: 'Series 82', desc: 'Private Securities Offerings' },
                { id: 'none', label: 'None', desc: 'Not Licensed' }
              ].map((lic) => (
                <button
                  key={lic.id}
                  type="button"
                  onClick={() => setFinraLicense(lic.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    finraLicense === lic.id
                      ? 'border-[#002060] bg-blue-50 text-[#002060] font-bold shadow-xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className="block text-xs font-bold">{lic.label}</span>
                  <span className="block text-[10px] text-slate-500 font-normal leading-tight mt-0.5">
                    {lic.desc}
                  </span>
                </button>
              ))}
            </div>

            {finraLicense !== 'none' && (
              <div className="pt-2">
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Individual Central Registration Depository (CRD) or License Number
                </label>
                <input
                  type="text"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  placeholder="e.g. CRD# 4920194"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {errors.licenseNumber && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.licenseNumber}</p>
                )}
              </div>
            )}
          </div>

          {/* SUPPORTING VERIFICATION DOCUMENTS */}
          <div className="p-4.5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                4. Upload Verification Documents (Simulated Vault)
              </label>
              <span className="text-[10px] text-slate-500 font-medium">
                {documents.length} File(s) Attached
              </span>
            </div>

            {/* Document Type Selector & Add Button */}
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                value={uploadCategory}
                onChange={(e) => setUploadCategory(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-800 focus:outline-none"
              >
                <option value="CPA / Attorney Certification">CPA / Attorney Certification Letter</option>
                <option value="FINRA License Proof">FINRA CRD / License Registration</option>
                <option value="W-2 / Tax Returns">Prior 2 Years W-2 / Tax Returns</option>
                <option value="Audited Balance Sheet">Audited Balance Sheet / Asset Statement</option>
                <option value="Other Evidence">Other Certified Supporting Evidence</option>
              </select>

              <input
                type="text"
                value={simulatedFileName}
                onChange={(e) => setSimulatedFileName(e.target.value)}
                placeholder="Optional custom file name..."
                className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none"
              />

              <button
                type="button"
                onClick={handleAddDocument}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors cursor-pointer shrink-0"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Attach File</span>
              </button>
            </div>

            {/* Document List */}
            {documents.length > 0 ? (
              <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl bg-white overflow-hidden">
                {documents.map((doc) => (
                  <div key={doc.id} className="p-3 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                      <div className="min-w-0">
                        <span className="font-bold text-slate-900 block truncate">{doc.name}</span>
                        <span className="text-[10px] text-slate-500">{doc.type} • {doc.size}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveDoc(doc.id)}
                      className="p-1 rounded text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                      title="Remove file"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-amber-600 font-medium p-3 bg-amber-50 rounded-xl border border-amber-200">
                Please attach at least one verification document (e.g. CPA letter or tax return) for compliance audit.
              </p>
            )}

            {errors.documents && (
              <p className="text-xs text-rose-600 font-semibold">{errors.documents}</p>
            )}
          </div>

          {/* CONSENT & DECLARATION */}
          <div className="space-y-3 pt-1">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                id="applicant-decl-consent"
                type="checkbox"
                checked={declarationsAcknowledged}
                onChange={(e) => setDeclarationsAcknowledged(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-xs text-slate-700 leading-snug">
                I hereby certify and declare under penalty of perjury that the financial net worth, income thresholds, or regulatory licensing status declared above meet SEC Rule 501 accredited investor requirements.
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                id="thirdparty-verify-consent"
                type="checkbox"
                checked={consentToVerify}
                onChange={(e) => setConsentToVerify(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-xs text-slate-700 leading-snug">
                I authorize OAL Network Compliance Officers and institutional underwriter partners to review the attached documentation to formally issue the Verified Accredited Investor green-check badge.
              </span>
            </label>

            {errors.declarations && (
              <p className="text-xs text-rose-600 font-semibold">{errors.declarations}</p>
            )}
            {errors.consent && (
              <p className="text-xs text-rose-600 font-semibold">{errors.consent}</p>
            )}
          </div>

          {/* MODAL FOOTER ACTIONS */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#002060] hover:bg-[#001744] text-[#FFD200] font-extrabold text-xs shadow-md transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#FFD200]" />
              <span>{submitting ? 'Submitting...' : 'Submit Verification Application'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
