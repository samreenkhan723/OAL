# Lender Dashboard - Data Flow & Wireframe Specs

Based on the client requirements and the structured `LenderLayout`, here is the data flow and wireframe requirements for each Lender Dashboard menu. This document is designed for developers to understand exactly what data goes into each section without extra fluff.

---

### 1. Dashboard (`/lender/dashboard`)
- **Data Points:** High-level metrics: Total Funded Loans volume, Active Offers out pending acceptance, and count of New Qualified Leads.
- **Flow:** Read-only widgets summarizing the lender's active pipeline and portfolio health.

### 2. Marketplace / Qualified Leads (`/lender/qualified-leads`)
- **Data Points:** Table/List of AI-matched borrowers, iNV IQ scoring, active requests feed, and real-time alerts. **Crucial:** Borrower identities must remain anonymous.
- **Flow:** Displays leads that match the lender's criteria. Lenders can click to open a "Lead Details" modal.

### 3. Saved Leads (`/lender/saved-leads`)
- **Data Points:** List of bookmarked/pinned borrower profiles.
- **Flow:** Lenders can "Save/Heart" a lead from the marketplace to review later before submitting an offer.

### 4. Active Offers (`/lender/offers`)
- **Data Points:** Form to create/edit offers (Loan Amount, Interest Rate, Repayment Terms). List of active/pending/rejected offers.
- **Flow:** Lender submits a custom bid for a borrower. Lender has exclusive control to update or withdraw offers here.

### 5. Message Center (`/lender/communication`)
- **Data Points:** Secure Chat, Email, and SMS interface logs.
- **Flow:** Lenders can communicate **strictly with the assigned OAL Rep / Agent**. Borrowers are completely blocked from direct communication.

### 6. OAL Network Panel (`/lender/network-panel`)
- **Data Points:** Real-time live marketplace stream. Shows application start timestamps and pipeline color codes (e.g., Green for new).
- **Flow:** High-speed live feed of all marketplace activity. Lender profiles remain completely anonymous to other Lenders.

### 7. Analytics & Reports (`/lender/analytics`)
- **Data Points:** Conversion rates (Offers sent vs. Accepted), portfolio yield/health, and performance metrics.
- **Flow:** Generate charts and data exports for the lender's internal accounting.

### 8. Billing & Subscription (`/lender/billing`)
- **Data Points:** Platform fee invoices, active subscription plans, payment methods.
- **Flow:** Manage credit card details and view past billing receipts.

### 9. Profile & Settings (`/lender/settings`)
- **Data Points:** Lending company details, lending criteria / matching rules (min score, max amount), password, and Multi-Factor Authentication (MFA) settings.
- **Flow:** Edit basic profile info, tune AI matching criteria, and toggle security settings.
