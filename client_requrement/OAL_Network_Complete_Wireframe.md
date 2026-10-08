# OAL NETWORK — COMPLETE RESPONSIVE WIREFRAME SPECIFICATION

**Stack:** React.js (Vite), Tailwind CSS, React Router, Lucide React.  
**Deliverable:** Implementation-ready page map, wireframes, flows, design tokens, responsive rules, and role permissions.  
**Source discipline:** This is based on the six OAL document requirements summarized in the conversation. The original uploaded DOCX files could not be re-opened in this run; therefore this is a comprehensive design specification, NOT a certified line-by-line reproduction. Items marked **[VERIFY]** require confirmation against the original client documents. Items marked **[DESIGN]** are recommended UI/implementation decisions, not explicit client requirements.

## 1. Professional Design System

Brand: OAL Network | positioning: secure enterprise lending marketplace. No unverified client logo or brand colors assumed.

| Token | Hex | Usage |
|---|---|---|
| Navy 950 | `#0B1730` | Desktop sidebar, hero sections |
| Navy 800 | `#172B4D` | Header, dark cards |
| Royal Blue | `#2563EB` | Primary CTA, links, selected tabs |
| Blue Tint | `#EFF6FF` | Selected sidebar rows, information cards |
| Muted Gold | `#D5B66A` | Premium club badges, limited highlights |
| Teal | `#0D9488` | Verified/success status |
| Amber | `#D97706` | Pending / needs attention |
| Red | `#DC2626` | Failed/rejected/critical |
| Background | `#F8FAFC` | App canvas |
| White | `#FFFFFF` | Cards and panels |
| Slate Text | `#0F172A` | Primary body text |
| Muted Text | `#64748B` | Secondary labels |
| Border | `#E2E8F0` | Separators and fields |

Typography: Inter (fallback system-ui). Headings 28/24/20 px, body 14–16 px. Radius: cards 14px, inputs 10px, buttons 10px. 8px spacing grid. Focus rings always visible. Never use gold as body text on white.

### Tailwind theme snippet
```css
@import "tailwindcss";
@theme {
  --color-oal-navy: #0B1730;
  --color-oal-blue: #2563EB;
  --color-oal-gold: #D5B66A;
  --color-oal-teal: #0D9488;
  --color-oal-canvas: #F8FAFC;
  --font-sans: Inter, ui-sans-serif, system-ui, sans-serif;
}
```

## 2. Roles, dashboards, routing

Core roles: Borrower, Lender, OAL Representative/Agent, Admin/Super Admin. Investor/Investment Club content is also referenced; its separate login/dashboard requirement is **[VERIFY]**. Help Desk may be a shared workspace rather than a new account type **[DESIGN]**.

| Role | Base route | Purpose |
|---|---|---|
| Public | `/` | Marketing, loan categories, entry points |
| Borrower | `/borrower` | Apply, upload, track, compare offers |
| Lender | `/lender` | Review qualified leads, work deals, submit offers |
| OAL Rep | `/rep` | Manage borrower-lender intermediary communications |
| Admin | `/admin` | Verify, distribute, oversee, configure |
| Help Desk | `/support` | Tickets, articles, routing, analytics |
| Investor Club | `/investment-club` | Club information and classification; permissions [VERIFY] |

**Auth:** Account creation → email/phone verification → MFA → role-specific onboarding → appropriate dashboard. Role choice and lender/rep approval workflows **[VERIFY]**. Never allow self-registration as Super Admin.

## 3. Public website / marketing wireframe

### Desktop header
```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ OAL NETWORK     Home  Loan Programs  How It Works  Investment IQ  Help Desk│
│                                          Sign In   [ Apply for a Loan ]     │
└──────────────────────────────────────────────────────────────────────────────┘
│ NAVY HERO                                                                     │
│ Business Funding, Connected to the Right Lenders        [Application visual] │
│ Transparent application, lender matching, and offer tracking                │
│ [Get Started]  [How It Works]                                                 │
├──────────────────────────────────────────────────────────────────────────────┤
│ LOAN PROGRAMS (cards)                                                         │
│ Restaurant | Food Truck | Franchise | Dental | Freight / Trucking            │
│ Hotel / Motel / Airbnb | Church | Fix & Flip                                 │
├──────────────────────────────────────────────────────────────────────────────┤
│ HOW IT WORKS: Account → Application → IQ → Lender → Offers → Funding          │
├──────────────────────────────────────────────────────────────────────────────┤
│ Investment IQ explainer  | Help Desk/FAQ | Footer / legal / contact          │
└──────────────────────────────────────────────────────────────────────────────┘
```
Public navigation wording, hero copy, and layout are **[DESIGN]**; loan category names originate from the earlier document summary. Preserve any additional menu entries in original sitemap **[VERIFY]**.

## 4. Borrower sidebar and screens

**Sidebar (grouped to avoid excessive top-level menus):**
- Overview: Dashboard, Loan Process Tracker
- My Financing: My Applications, Start New Application, Documents, Investment IQ, Offers
- Communication: Messages (with OAL Rep), Notifications
- Account: Referrals, Profile, Settings, Help Desk

**Dashboard**
```text
┌───────────────┬──────────────────────────────────────────────────────────────┐
│ OAL NETWORK   │ Search                         🔔 Notifications   Avatar   │
│ BORROWER      ├──────────────────────────────────────────────────────────────┤
│ Dashboard     │ Welcome back                   [Start Loan Application]     │
│ Loan Tracker  │ ┌───────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐ │
│ Applications  │ │ My IQ     │ │ Application│ │ Reviewing  │ │ Offers     │ │
│ Documents     │ │ -- / 180  │ │ In review  │ │ Lenders: 2 │ │ Received: 1│ │
│ Investment IQ │ └───────────┘ └────────────┘ └────────────┘ └────────────┘ │
│ Offers        │ Loan Progress: Submitted → Verified → Qualified → Offers    │
│ Messages      │ ┌─────────────────────────────┬────────────────────────────┐ │
│ Notifications │ │ My active application       │ Recent notifications       │ │
│ Referrals     │ │ ID, amount, type, status    │                            │ │
│ Help Desk     │ │ [View application]          │                            │ │
│ Settings      │ └─────────────────────────────┴────────────────────────────┘ │
└───────────────┴──────────────────────────────────────────────────────────────┘
```
All values shown are placeholder UI examples, not real borrower records.

### New Loan Application — multi-step wizard **[DESIGN grouping]**
1. **Business & borrower:** legal identity, company details, industry, contact details.
2. **Financing request:** loan program/type, requested amount, purpose (20 words or fewer where specified), intended use.
3. **Business plan & financials:** business plan, revenue, cash flow, financial history, credit details.
4. **Collateral:** property/equipment/inventory details if applicable.
5. **Documents & KYC:** document upload, verification state, required files.
6. **Review & consent:** summary, corrections, required disclosures, submit.

Top progress stepper; Back, Save Draft, Continue, Submit. Conditional questions depend on loan program **[VERIFY]**. Save draft, validation and consent are **[DESIGN]** recommendations.

### Documents screen
File rows: name, category, linked application, upload date, verification state, reviewer feedback, Replace/Upload actions. Allowed types, size limits, retention and download policy **[VERIFY]**.

### Investment IQ screen
Total score out of **180**, component breakdown:
- Credit History 70
- Business Plan 20
- Cash Flow 50
- Collateral 30
- Overall Risk Assessment 10

Show total, individual breakdown, assessment timestamp and explanation; do not claim a score is a lending decision. Exact formulas/credit ranges must be copied from source before implementation **[VERIFY]**. Do not conflate borrower Investment IQ and investor club qualification.

### Offers screen
Offer comparison columns: lender alias (if permitted), amount, interest/rate, term, payment estimate, fees, conditions, status, and Accept. Offer terms are **[DESIGN]** and must be validated with client. Borrower may compare offers; confirmation and irreversible state transitions require server-side validation. Lender direct contact hidden.

### Loan Process Tracker
Vertical mobile / horizontal desktop timeline. Proposed statuses **[DESIGN]**: Draft → Submitted → KYC/Documents Review → Scored → Qualified → Lender Review → Working Deal → Offer → Accepted → Processing → Approved → Funding → Funded. Add alternate branches: Missing Documents, Rejected, Withdrawn, Expired. Status definitions and transition rights **[VERIFY]**.

## 5. Lender sidebar and screens

**Overview:** Dashboard, Network Panel
**Opportunities:** Qualified Leads, AI Lead Alerts, Borrower Rankings / Investment IQ, Lead Details, Loan Requests, Saved Leads, Working Deals
**Transactions:** Offer Management
**Communication:** Messages with OAL Rep, Notifications
**Business:** Analytics, Reports, Billing, Subscription
**Account:** Profile, Settings, Help Desk

Use sidebar collapsible groups; `Lead Details` is a detail route, not necessarily a standalone sidebar entry **[DESIGN]**.

### Lender Dashboard
```text
┌────────────────────────────────────────────────────────────────────────────┐
│ Dashboard  [Qualified Leads]  [Working Deals]                               │
│ New Qualified Leads | Active Working Deals | Submitted Offers | Alerts     │
│ ┌────────────────────────────────────────┬───────────────────────────────┐ │
│ │ Lender Marketplace                     │ AI Alerts                     │ │
│ │ ID  Loan Type  Amount  IQ  Status      │ Qualified applicant updates  │ │
│ │ #A1 Restaurant  $--    --  Available  │                               │ │
│ │ [View details] [Work Deal]             │                               │ │
│ └────────────────────────────────────────┴───────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────────┘
```

### Network Panel
Live activity feed with timestamps, borrower summary, anonymized lender activity, stage, and qualification alerts. Never expose other lender identities. Real-time transport technology is **[DESIGN]**.

### Working Deal — CRITICAL
- A maximum of **3 simultaneous lenders** may be active on one application.
- Claim a working-deal slot in a backend atomic transaction; reject the fourth claim even under concurrency.
- Show `2 of 3 working slots filled` without identifying competitors.
- Define release, withdrawal, expiration, and re-entry rules with client **[VERIFY]**.
- Working Deal action never grants blanket access to sensitive borrower PII.

### Offer Management
Lender can draft/edit/submit offers within permitted status. Borrower receives offers through the platform; OAL Rep can view offers but cannot edit them. Pricing fields, revisions, expiration and negotiation policy **[VERIFY]**.

## 6. OAL Representative sidebar and screens

**Overview:** Dashboard
**Leads:** Qualified Leads, AI Lead Alerts, Lead Details, Loan Requests, Saved Leads
**Coordination:** Messages / Communication, Offer Management (read-only)
**Business:** Analytics, Reports, Billing, Subscription
**Account:** Profile, Settings, Help Desk

Rep dashboard: lead pipeline, active borrowers, lender interest, pending communication, offer activity, follow-ups. Borrower ↔ OAL Rep ↔ Lender is the approved mediation path; no borrower-to-lender direct chat. Offer view-only must be enforced in backend permissions.

## 7. Admin/Super Admin sidebar and screens

**Overview:** Dashboard, Network Panel
**Users:** Borrowers, Lenders, Representatives **[VERIFY rep management menu]**
**Loans:** Applications, Verification Center, Document Management, Lead Distribution, Investment IQ / AI Scoring Engine, Offers (oversight) **[VERIFY]**
**Growth:** Referrals & Affiliates, Advertisements, CMS
**Finance:** Payments, Subscription Plans
**Support:** Tickets, Help Desk / Knowledge Base
**Governance:** Reports & Analytics, Audit Logs, System Settings, Super Admin

### Admin Dashboard
KPIs: registered borrowers, verified lenders, active applications, verification queue, working deals, offer activity, funded applications (only if data exists). Panels: application pipeline, pending KYC, document review, distribution queue, recent alerts, tickets.

### Verification Center
Applicant, verification category, submitted timestamp, evidence, review status, review action, reason/history. Identity verification integration/vendor and reviewer permissions **[VERIFY]**.

### Lead Distribution
Qualification/matching rules, eligible lenders, alert history, assignment visibility, working deal cap, failures/retries. Never automatically distribute sensitive documents beyond authorization.

### AI Scoring Admin
Read scoring rule version, categories, individual scores, audit history; editing thresholds is **[VERIFY]**. Preserve original 180-point component weights until client-approved changes.

## 8. Help Desk module

Ticket inbox, ticket detail, user messages, email/chat/social intake (where integrations exist), automated ticket creation, categories, assignment/routing, internal notes, AI reply suggestions, knowledge base, FAQ, performance analytics. AI suggestions must be human-reviewed before sending **[DESIGN]**. Channel availability depends on actual integrations **[VERIFY]**.

## 9. Investment Club / Money Club

Document-derived classification to display pending reconciliation:
- VIP Diamond Club: 175+ LINV IQ
- MVP Money Club: 140–164
- OAL Club: 59+
- Team Get Money: 0–58

**IMPORTANT [VERIFY]:** These ranges overlap / leave gaps as stated (e.g. 165–174), and appear to concern a separate LINV IQ scheme. Do not implement an exclusive automatic classification until client supplies corrected ranges and clarifies distinction from 180-point borrower score. Accreditation must not be inferred from IQ score alone.

## 10. Route map

```text
/
/loan-programs
/loan-programs/:slug
/how-it-works
/investment-iq
/investment-club
/help
/auth/login
/auth/register
/auth/verify
/auth/mfa
/borrower/dashboard
/borrower/applications
/borrower/applications/new
/borrower/applications/:id
/borrower/applications/:id/documents
/borrower/applications/:id/tracker
/borrower/investment-iq
/borrower/offers
/borrower/messages
/borrower/notifications
/borrower/referrals
/borrower/settings
/lender/dashboard
/lender/network
/lender/leads
/lender/leads/:id
/lender/alerts
/lender/rankings
/lender/loan-requests
/lender/saved-leads
/lender/working-deals
/lender/offers
/lender/messages
/lender/analytics
/lender/reports
/lender/billing
/lender/subscription
/lender/settings
/rep/dashboard
/rep/leads
/rep/alerts
/rep/loan-requests
/rep/saved-leads
/rep/messages
/rep/offers
/rep/analytics
/rep/reports
/rep/billing
/rep/subscription
/rep/settings
/admin/dashboard
/admin/network
/admin/borrowers
/admin/lenders
/admin/representatives
/admin/applications
/admin/verification
/admin/documents
/admin/lead-distribution
/admin/scoring
/admin/referrals
/admin/advertisements
/admin/payments
/admin/subscriptions
/admin/cms
/admin/reports
/admin/support
/admin/audit-logs
/admin/settings
/admin/super-admin
/support/tickets
/support/tickets/:id
/support/knowledge-base
/support/analytics
```
Routes are **[DESIGN]** URLs, not quoted client-provided paths.

## 11. Reusable React component structure

```text
src/
  app/router.jsx
  layouts/PublicLayout.jsx
  layouts/DashboardLayout.jsx
  layouts/AuthLayout.jsx
  components/navigation/Sidebar.jsx
  components/navigation/Topbar.jsx
  components/ui/Button.jsx
  components/ui/Card.jsx
  components/ui/Badge.jsx
  components/ui/DataTable.jsx
  components/ui/Modal.jsx
  components/ui/EmptyState.jsx
  components/ui/StatusTimeline.jsx
  components/loans/ApplicationWizard.jsx
  components/loans/InvestmentIQBreakdown.jsx
  components/loans/OfferComparison.jsx
  components/loans/WorkingDealSlots.jsx
  features/auth/
  features/borrower/
  features/lender/
  features/representative/
  features/admin/
  features/helpdesk/
  features/investment-club/
  lib/api.js
  lib/permissions.js
  styles/index.css
```

Use `react-router-dom` nested layouts, lazy-loaded pages, central permissions, accessible form controls, TanStack Query if useful **[DESIGN]**. No mock/hardcoded financial data in production; loading/empty/error states must be implemented. UI permissions are not sufficient: enforce all authorization server-side.

## 12. Responsive rules

- **≥1280px:** 256px expanded sidebar; 4 KPI columns; tables with sticky headers.
- **1024–1279px:** 224px collapsible sidebar; 2–4 KPI columns.
- **768–1023px:** compact sidebar or drawer; 2 KPI columns; 2-column detail forms.
- **<768px:** top app bar + slide-out menu; single-column cards; vertical progress stepper; sticky primary form action; data tables become labeled stacked cards; offer comparison becomes swipeable/stacked panels with identical fields; 44px minimum tap targets.
- Support keyboard navigation, contrast, error summaries, loading skeletons, accessible labels, and no horizontal page overflow.

## 13. Permissions matrix

| Action | Borrower | Lender | OAL Rep | Admin |
|---|---|---|---|---|
| Submit own application | Yes | No | No | Oversight [VERIFY] |
| View borrower marketplace summary | No | Qualified access | Assigned scope [VERIFY] | Yes |
| View full private borrower docs | Own | Authorized subset only | Assigned subset [VERIFY] | Authorized reviewer |
| Claim working-deal slot | No | Yes, max 3 total | No | Oversight [VERIFY] |
| Create/edit lender offer | No | Own offer | **No** | Oversight [VERIFY] |
| View/compare own offers | Yes | Own offer | Read-only | Authorized oversight |
| Direct borrower↔lender chat | **No** | **No** | Mediated | Oversight [VERIFY] |
| Configure score rules | No | No | No | **[VERIFY]** |
| Review KYC/documents | No | No | **[VERIFY]** | Yes |

## 14. End-to-end functional state flow

```text
PUBLIC SITE
   ↓ register/login
VERIFIED ACCOUNT + MFA
   ↓ borrower profile
NEW APPLICATION → DRAFT → SUBMITTED
   ↓ KYC + DOCUMENT REVIEW
VERIFIED / NEEDS INFORMATION / FAILED
   ↓ score computed
INVESTMENT IQ (0–180)
   ↓ qualification [threshold VERIFY]
QUALIFIED MARKETPLACE PROFILE
   ↓ notify eligible lenders
LENDER VIEWS ANONYMIZED PROFILE
   ↓ claim WORKING DEAL (max 3 concurrently)
LENDER REVIEW ↔ OAL REP ↔ BORROWER
   ↓ lender submits offer
BORROWER OFFER COMPARISON
   ↓ borrower accepts
PROCESSING → APPROVAL → FUNDING → FUNDED
   ↓
POST-FUNDING TRACKER
```

**Alternative paths:** borrower withdraws; application rejected; missing docs requested; offer expires; lender releases working slot; funding fails. Each branch needs defined permissions, timestamps, notifications, and audit entries **[DESIGN]**.

## 15. Critical verification checklist before calling implementation 'exact'

1. Reconcile sitemap labels and page names with all six original DOCX files.
2. Confirm whether a distinct Investor portal is requested.
3. Confirm Loan Requests vs Qualified Leads vs Saved Leads behavior for each role.
4. Confirm Investment IQ/LINV IQ formulas, club score gaps and qualifying thresholds.
5. Confirm whether admin may edit offers or only oversee.
6. Confirm working-deal slot release/expiry policy and whether cap is per application or per round.
7. Confirm mandatory KYC documents, vendor and verification authority.
8. Confirm offers fields, status names and acceptance rules.
9. Confirm billing/subscription/referral details and any external links in source docs.
10. Confirm actual brand/logo/colors; navy-blue-gold is a professional **design proposal**, not a documented brand requirement.
11. Confirm any external reference sites are inspiration only; do not copy their proprietary design/content.

**Acceptance criteria:** every route reachable; each role sees only its allowed menus; borrower cannot message lender directly; Rep cannot edit offers; lender cap enforced atomically; score component weights sum to 180; forms have validation and draft handling; full lifecycle is traceable; mobile UI remains usable; no dummy financial data masquerades as live data.
