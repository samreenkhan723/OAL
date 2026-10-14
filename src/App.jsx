import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';

// Layouts & Route Protection
import { PublicLayout } from './layouts/PublicLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { NetworkLayout } from './layouts/NetworkLayout';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { PublicApplyPage } from './pages/public/PublicApplyPage';
import { LoanProgramsPage } from './pages/public/LoanProgramsPage';
import { LoanProgramDetailPage } from './pages/public/LoanProgramDetailPage';
import { IndustryDirectoryPage } from './pages/public/IndustryDirectoryPage';
import { IndustryDetailPage } from './pages/public/IndustryDetailPage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { InvestmentIQExplainerPage } from './pages/public/InvestmentIQExplainerPage';
import { InvestmentClubPage } from './pages/public/InvestmentClubPage';
import { PublicHelpDeskPage } from './pages/public/PublicHelpDeskPage';
import { CompanyPage } from './pages/public/CompanyPage';
import { ToolsAndResourcesPage } from './pages/public/ToolsAndResourcesPage';
import { IsoProgramPage } from './pages/public/IsoProgramPage';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { VerifyContactPage } from './pages/auth/VerifyContactPage';
import { MfaPage } from './pages/auth/MfaPage';
import { PendingApprovalPage } from './pages/auth/PendingApprovalPage';

// Borrower Pages
import { BorrowerDashboard } from './pages/borrower/BorrowerDashboard';
import { BorrowerApplicationsPage } from './pages/borrower/BorrowerApplicationsPage';
import { BorrowerApplicationDetailPage } from './pages/borrower/BorrowerApplicationDetailPage';
import { NewApplicationPage } from './pages/borrower/NewApplicationPage';
import { BorrowerDocumentsPage } from './pages/borrower/BorrowerDocumentsPage';
import { BorrowerInvestmentIQPage } from './pages/borrower/BorrowerInvestmentIQPage';
import { BorrowerOffersPage } from './pages/borrower/BorrowerOffersPage';
import { BorrowerMessagesPage } from './pages/borrower/BorrowerMessagesPage';
import { BorrowerReferralsPage } from './pages/borrower/BorrowerReferralsPage';
import { BorrowerSettingsPage } from './pages/borrower/BorrowerSettingsPage';
import { NotificationsPage } from './pages/common/NotificationsPage';
import { PostFundingDashboardPage } from './pages/common/PostFundingDashboardPage';
import { MoneyClubMemberPortalPage } from './pages/common/MoneyClubMemberPortalPage';

// Lender Pages
import { LenderDashboard } from './pages/lender/LenderDashboard';
import { LenderNetworkPanel } from './pages/lender/LenderNetworkPanel';
import { LenderLeadsPage } from './pages/lender/LenderLeadsPage';
import { LenderLeadDetailPage } from './pages/lender/LenderLeadDetailPage';
import { LenderAlertsPage } from './pages/lender/LenderAlertsPage';
import { LenderRankingsPage } from './pages/lender/LenderRankingsPage';
import { LenderLoanRequestsPage } from './pages/lender/LenderLoanRequestsPage';
import { LenderSavedLeadsPage } from './pages/lender/LenderSavedLeadsPage';
import { LenderWorkingDealsPage } from './pages/lender/LenderWorkingDealsPage';
import { LenderOfferManagementPage } from './pages/lender/LenderOfferManagementPage';
import { LenderMessagesPage } from './pages/lender/LenderMessagesPage';
import { LenderAnalyticsPage } from './pages/lender/LenderAnalyticsPage';
import { LenderReportsPage } from './pages/lender/LenderReportsPage';
import { LenderBillingPage } from './pages/lender/LenderBillingPage';
import { LenderSettingsPage } from './pages/lender/LenderSettingsPage';

// Rep Pages
import { RepDashboard } from './pages/rep/RepDashboard';
import { RepLeadsPage } from './pages/rep/RepLeadsPage';
import { RepAlertsPage } from './pages/rep/RepAlertsPage';
import { RepLeadDetailPage } from './pages/rep/RepLeadDetailPage';
import { RepLoanRequestsPage } from './pages/rep/RepLoanRequestsPage';
import { RepSavedLeadsPage } from './pages/rep/RepSavedLeadsPage';
import { RepCommunicationPage } from './pages/rep/RepCommunicationPage';
import { RepOffersPage } from './pages/rep/RepOffersPage';
import { RepNetworkPanel } from './pages/rep/RepNetworkPanel';
import { RepAnalyticsPage } from './pages/rep/RepAnalyticsPage';
import { RepReportsPage } from './pages/rep/RepReportsPage';
import { RepBillingPage } from './pages/rep/RepBillingPage';
import { RepSettingsPage } from './pages/rep/RepSettingsPage';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminNetworkPanel } from './pages/admin/AdminNetworkPanel';
import { AdminBorrowersPage } from './pages/admin/AdminBorrowersPage';
import { AdminLendersPage } from './pages/admin/AdminLendersPage';
import { AdminRepPage } from './pages/admin/AdminRepPage';
import { AdminApplicationsPage } from './pages/admin/AdminApplicationsPage';
import { AdminVerificationPage } from './pages/admin/AdminVerificationPage';
import { AdminDocumentsPage } from './pages/admin/AdminDocumentsPage';
import { AdminScoringPage } from './pages/admin/AdminScoringPage';
import { AdminLeadDistributionPage } from './pages/admin/AdminLeadDistributionPage';
import { AdminOffersPage } from './pages/admin/AdminOffersPage';
import { AdminReferralsPage } from './pages/admin/AdminReferralsPage';
import { AdminAdsPage } from './pages/admin/AdminAdsPage';
import { AdminPaymentsPage } from './pages/admin/AdminPaymentsPage';
import { AdminSubscriptionsPage } from './pages/admin/AdminSubscriptionsPage';
import { AdminCmsPage } from './pages/admin/AdminCmsPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';
import { AdminAuditLogsPage } from './pages/admin/AdminAuditLogsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { AdminSuperAdminPage } from './pages/admin/AdminSuperAdminPage';

// Help Desk Pages
import { HelpDeskTicketsPage } from './pages/support/HelpDeskTicketsPage';
import { HelpDeskTicketDetailPage } from './pages/support/HelpDeskTicketDetailPage';
import { KnowledgeBasePage } from './pages/support/KnowledgeBasePage';
import { SupportAnalyticsPage } from './pages/support/SupportAnalyticsPage';

// OAL Network Panel (Client Wireframe Workspace)
import { NetworkPanelPage } from './pages/network/NetworkPanelPage';
import { ScrollToTop } from './components/common/ScrollToTop';

// Legacy /support URL handler: strictly authorized Admin redirected to /admin/help-desk, all others to /auth/login
function LegacySupportRedirect() {
  const { isAuthenticated, currentRole } = useApp();
  if (isAuthenticated && currentRole === 'admin') {
    return <Navigate to="/admin/help-desk" replace />;
  }
  return <Navigate to="/auth/login" replace />;
}

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Marketing Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/apply" element={<PublicApplyPage />} />
            <Route path="/loan-programs" element={<LoanProgramsPage />} />
            <Route path="/loan-types" element={<Navigate to="/loan-programs" replace />} />
            <Route path="/industries" element={<IndustryDirectoryPage />} />
            <Route path="/loans-by-industry" element={<IndustryDirectoryPage />} />
            <Route path="/industries/:slug" element={<IndustryDetailPage />} />
            <Route path="/loan-programs/:slug" element={<LoanProgramDetailPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/investment-iq" element={<InvestmentIQExplainerPage />} />
            <Route path="/investment-club" element={<InvestmentClubPage />} />
            <Route path="/help" element={<PublicHelpDeskPage />} />
            <Route path="/help-desk" element={<Navigate to="/help" replace />} />
            <Route path="/faqs" element={<PublicHelpDeskPage initialTab="faqs" />} />
            <Route path="/faq" element={<PublicHelpDeskPage initialTab="faqs" />} />
            <Route path="/company" element={<CompanyPage />} />
            <Route path="/about" element={<CompanyPage initialTab="about" />} />
            <Route path="/leadership" element={<CompanyPage initialTab="leadership" />} />
            <Route path="/values" element={<CompanyPage initialTab="values" />} />
            <Route path="/press" element={<CompanyPage initialTab="press" />} />
            <Route path="/investors" element={<CompanyPage initialTab="investors" />} />
            <Route path="/careers" element={<CompanyPage initialTab="careers" />} />
            <Route path="/culture" element={<CompanyPage initialTab="culture" />} />
            <Route path="/contact" element={<CompanyPage initialTab="contact" />} />
            <Route path="/tools" element={<ToolsAndResourcesPage />} />
            <Route path="/calculators" element={<ToolsAndResourcesPage initialTab="calculators" />} />
            <Route path="/biz-analyzer" element={<ToolsAndResourcesPage initialTab="biz-analyzer" />} />
            <Route path="/videos" element={<ToolsAndResourcesPage initialTab="videos" />} />
            <Route path="/case-studies" element={<ToolsAndResourcesPage initialTab="case-studies" />} />
            <Route path="/reviews" element={<ToolsAndResourcesPage initialTab="reviews" />} />
            <Route path="/testimonials" element={<ToolsAndResourcesPage initialTab="reviews" />} />
            <Route path="/partners" element={<ToolsAndResourcesPage initialTab="partners" />} />
            <Route path="/iso-program" element={<IsoProgramPage />} />
            <Route path="/partners/iso" element={<IsoProgramPage />} />
            <Route path="/definitions" element={<PublicHelpDeskPage initialTab="definitions" />} />
            <Route path="/privacy" element={<PublicHelpDeskPage initialTab="privacy" />} />
            <Route path="/terms" element={<PublicHelpDeskPage initialTab="terms" />} />
            <Route path="/security" element={<PublicHelpDeskPage initialTab="privacy" />} />
          </Route>

          {/* Authentication Routes */}
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/verify" element={<VerifyContactPage />} />
          <Route path="/auth/mfa" element={<MfaPage />} />
          <Route path="/auth/pending-approval" element={<PendingApprovalPage />} />

          {/* Borrower Workspace Routes (Protected) */}
          <Route
            path="/borrower"
            element={
              <ProtectedRoute allowedRoles={['borrower']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/borrower/dashboard" replace />} />
            <Route path="dashboard" element={<BorrowerDashboard />} />
            {/* Wireframe: Loan Application & Aliases */}
            <Route path="loan-application" element={<BorrowerApplicationsPage />} />
            <Route path="loan-application/new" element={<NewApplicationPage />} />
            <Route path="loan-application/:id" element={<BorrowerApplicationDetailPage />} />
            <Route path="applications" element={<BorrowerApplicationsPage />} />
            <Route path="applications/new" element={<NewApplicationPage />} />
            <Route path="applications/:id" element={<BorrowerApplicationDetailPage />} />
            <Route path="applications/:id/documents" element={<BorrowerDocumentsPage />} />
            <Route path="applications/:id/tracker" element={<BorrowerApplicationDetailPage />} />
            <Route path="documents" element={<BorrowerDocumentsPage />} />
            {/* Wireframe: AI Borrower Score & Legacy */}
            <Route path="ai-score" element={<BorrowerInvestmentIQPage />} />
            <Route path="investment-iq" element={<BorrowerInvestmentIQPage />} />
            {/* Wireframe: Waiting Room / Offers */}
            <Route path="offers" element={<BorrowerOffersPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="messages" element={<BorrowerMessagesPage />} />
            {/* Wireframe: Referral Program & Legacy */}
            <Route path="referral" element={<BorrowerReferralsPage />} />
            <Route path="referrals" element={<BorrowerReferralsPage />} />
            <Route path="post-funding" element={<PostFundingDashboardPage />} />
            <Route path="money-club" element={<MoneyClubMemberPortalPage />} />
            <Route path="settings" element={<BorrowerSettingsPage />} />
          </Route>

          {/* Lender Workspace Routes (Protected) */}
          <Route
            path="/lender"
            element={
              <ProtectedRoute allowedRoles={['lender']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/lender/dashboard" replace />} />
            <Route path="dashboard" element={<LenderDashboard />} />
            {/* Wireframe: Marketplace / Qualified Leads & Legacy */}
            <Route path="qualified-leads" element={<LenderLeadsPage />} />
            <Route path="qualified-leads/:id" element={<LenderLeadDetailPage />} />
            <Route path="leads" element={<LenderLeadsPage />} />
            <Route path="leads/:id" element={<LenderLeadDetailPage />} />
            <Route path="saved-leads" element={<LenderSavedLeadsPage />} />
            {/* Wireframe: Active Offers */}
            <Route path="offers" element={<LenderOfferManagementPage />} />
            {/* Wireframe: Message Center & Legacy */}
            <Route path="communication" element={<LenderMessagesPage />} />
            <Route path="messages" element={<LenderMessagesPage />} />
            {/* Wireframe: OAL Network Panel & Legacy */}
            <Route path="network-panel" element={<LenderNetworkPanel />} />
            <Route path="network" element={<LenderNetworkPanel />} />
            <Route path="alerts" element={<LenderAlertsPage />} />
            <Route path="rankings" element={<LenderRankingsPage />} />
            <Route path="loan-requests" element={<LenderLoanRequestsPage />} />
            <Route path="working-deals" element={<LenderWorkingDealsPage />} />
            <Route path="post-funding" element={<PostFundingDashboardPage />} />
            <Route path="money-club" element={<MoneyClubMemberPortalPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            {/* Wireframe: Analytics & Reports */}
            <Route path="analytics" element={<LenderAnalyticsPage />} />
            <Route path="reports" element={<LenderReportsPage />} />
            {/* Wireframe: Billing & Subscription */}
            <Route path="billing" element={<LenderBillingPage />} />
            <Route path="subscription" element={<LenderBillingPage />} />
            <Route path="settings" element={<LenderSettingsPage />} />
          </Route>

          {/* Representative Workspace Routes (Protected) */}
          <Route
            path="/rep"
            element={
              <ProtectedRoute allowedRoles={['rep']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/rep/dashboard" replace />} />
            <Route path="dashboard" element={<RepDashboard />} />
            {/* Wireframe: Qualified Leads & Legacy */}
            <Route path="qualified-leads" element={<RepLeadsPage />} />
            <Route path="leads" element={<RepLeadsPage />} />
            {/* Wireframe: AI Lead Alerts & Legacy */}
            <Route path="lead-alerts" element={<RepAlertsPage />} />
            <Route path="alerts" element={<RepAlertsPage />} />
            {/* Wireframe: Lead Details */}
            <Route path="lead-details" element={<RepLeadDetailPage />} />
            <Route path="lead-details/:id" element={<RepLeadDetailPage />} />
            {/* Wireframe: Loan Requests */}
            <Route path="loan-requests" element={<RepLoanRequestsPage />} />
            {/* Wireframe: Saved Leads */}
            <Route path="saved-leads" element={<RepSavedLeadsPage />} />
            {/* Wireframe: Communication (LetsWork) & Legacy */}
            <Route path="communication" element={<RepCommunicationPage />} />
            <Route path="messages" element={<RepCommunicationPage />} />
            {/* Wireframe: Offer Management */}
            <Route path="offers" element={<RepOffersPage />} />
            {/* Wireframe: OAL Network Panel */}
            <Route path="network-panel" element={<RepNetworkPanel />} />
            <Route path="network" element={<RepNetworkPanel />} />
            <Route path="notifications" element={<NotificationsPage />} />
            {/* Wireframe: Analytics & Reports */}
            <Route path="analytics" element={<RepAnalyticsPage />} />
            <Route path="reports" element={<RepReportsPage />} />
            {/* Wireframe: Billing & Subscription */}
            <Route path="billing" element={<RepBillingPage />} />
            <Route path="subscription" element={<RepBillingPage />} />
            <Route path="settings" element={<RepSettingsPage />} />
          </Route>

          {/* Admin Workspace Routes (Protected) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="borrowers" element={<AdminBorrowersPage />} />
            <Route path="lenders" element={<AdminLendersPage />} />
            {/* Wireframe: Loan Applications & Legacy */}
            <Route path="loan-applications" element={<AdminApplicationsPage />} />
            <Route path="loan-applications/:id" element={<AdminApplicationsPage />} />
            <Route path="applications" element={<AdminApplicationsPage />} />
            {/* Wireframe: AI Scoring Engine & Legacy */}
            <Route path="ai-scoring" element={<AdminScoringPage />} />
            <Route path="scoring" element={<AdminScoringPage />} />
            <Route path="verification" element={<AdminVerificationPage />} />
            {/* Wireframe: Document Management & Legacy */}
            <Route path="document-management" element={<AdminDocumentsPage />} />
            <Route path="documents" element={<AdminDocumentsPage />} />
            <Route path="lead-distribution" element={<AdminLeadDistributionPage />} />
            {/* Wireframe: Notifications */}
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="referrals" element={<AdminReferralsPage />} />
            <Route path="advertisements" element={<AdminAdsPage />} />
            {/* Wireframe: Payments & Subscriptions */}
            <Route path="payments" element={<AdminPaymentsPage />} />
            <Route path="subscriptions" element={<AdminSubscriptionsPage />} />
            <Route path="cms" element={<AdminCmsPage />} />
            <Route path="reports" element={<AdminReportsPage />} />
            {/* Wireframe: Support Tickets (Help Desk) & Detail */}
            <Route path="help-desk" element={<HelpDeskTicketsPage />} />
            <Route path="help-desk/knowledge-base" element={<KnowledgeBasePage />} />
            <Route path="help-desk/analytics" element={<SupportAnalyticsPage />} />
            <Route path="help-desk/:id" element={<HelpDeskTicketDetailPage />} />
            <Route path="support" element={<HelpDeskTicketsPage />} />
            <Route path="support/knowledge-base" element={<KnowledgeBasePage />} />
            <Route path="support/analytics" element={<SupportAnalyticsPage />} />
            <Route path="support/:id" element={<HelpDeskTicketDetailPage />} />
            <Route path="audit-logs" element={<AdminAuditLogsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
            <Route path="super-admin" element={<AdminSuperAdminPage />} />
            {/* Legacy/Contextual Accessible Routes */}
            <Route path="network" element={<AdminNetworkPanel />} />
            <Route path="representatives" element={<AdminRepPage />} />
            <Route path="offers" element={<AdminOffersPage />} />
          </Route>

          {/* Legacy Support URL Redirection (Admin redirected to /admin/help-desk, all others to /auth/login) */}
          <Route path="/support" element={<LegacySupportRedirect />} />
          <Route path="/support/*" element={<LegacySupportRedirect />} />

          {/* OAL Network Panel Workspace Routes (Protected for Admin, Lender, Rep) */}
          <Route
            path="/network"
            element={
              <ProtectedRoute allowedRoles={['admin', 'lender', 'rep']}>
                <NetworkLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/network/dashboard" replace />} />
            <Route path="dashboard" element={<NetworkPanelPage section="dashboard" />} />
            <Route path="live-stream" element={<NetworkPanelPage section="live-stream" />} />
            <Route path="leads" element={<NetworkPanelPage section="leads" />} />
            <Route path="details" element={<NetworkPanelPage section="details" />} />
            <Route path="details/:id" element={<NetworkPanelPage section="details" />} />
            <Route path="saved" element={<NetworkPanelPage section="saved" />} />
            <Route path="offers" element={<NetworkPanelPage section="offers" />} />
            <Route path="communication" element={<NetworkPanelPage section="communication" />} />
            <Route path="timeline" element={<NetworkPanelPage section="timeline" />} />
            <Route path="timeline/:id" element={<NetworkPanelPage section="timeline" />} />
          </Route>

          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
