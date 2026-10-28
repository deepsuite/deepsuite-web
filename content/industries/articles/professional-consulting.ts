import type { IndustryArticle } from '../types'

export const professionalConsulting: IndustryArticle = {
  group: 'professional-services',
  sub: 'consulting',
  eyebrow: 'Professional Services · Consulting Firms',
  title: 'Enterprise software for consulting and professional services firms',
  metaTitle: 'Consulting Firm Software — Engagements, Resource Planning, Time, Billing, Project Margin',
  metaDescription:
    'How custom enterprise software supports consulting and professional services firms: engagement setup, resource planning, time and expense, mixed billing models, revenue recognition and utilization reporting.',
  intro:
    'Consulting firms sell expertise by the hour, the milestone or the outcome. Their operating system is the chain from opportunity to staffed project to invoice — and the utilization and margin data it produces. This page describes how that chain works and where software helps.',
  context: [
    'A consulting firm’s capacity is its people, and its inventory is their available time. Every week of unbooked consultant time is revenue that cannot be recovered. At the same time, overcommitting senior staff risks quality and burnout.',
    'Engagements are priced in different ways — time and materials, fixed fee, retainers, milestones, or combinations — often for the same client. Each has its own billing logic and its own way of measuring progress and profitability.',
    'Many firms run CRM, project tools, timesheets and finance separately. Partners then struggle to answer simple questions: what is the margin on this engagement to date, and who is available next month with the right skills?',
  ],
  challenges: [
    { title: 'Resource conflicts', body: 'Without a shared view of bookings and skills, the same people are promised to several projects.' },
    { title: 'Late or incomplete timesheets', body: 'Time recorded days later is less accurate and delays billing.' },
    { title: 'Fixed-fee overruns', body: 'Effort exceeding the fee is often discovered only at project close.' },
    { title: 'Billing complexity', body: 'Rate cards, discounts, expenses, caps and milestones make invoice preparation slow.' },
    { title: 'Revenue recognition', body: 'Recognizing revenue correctly across billing models requires consistent progress measures.' },
  ],
  operatingModel: [
    'Business development qualifies opportunities and prepares proposals with estimated effort and pricing. Once won, an engagement is set up with its contract terms, budget and team.',
    'Resource managers allocate people based on skills, availability and development needs. Consultants record time and expenses against engagement tasks. Engagement managers monitor budget burn and progress.',
    'Finance invoices according to contract terms, recognizes revenue and reports utilization, realization and margin by practice, client and engagement.',
  ],
  workflows: [
    { name: 'Proposal to engagement', steps: ['Estimate effort by role', 'Price by billing model', 'Win and set up engagement', 'Create budget and tasks'] },
    { name: 'Resource allocation', steps: ['Request roles and skills', 'Match available people', 'Confirm bookings', 'Adjust as plans change'] },
    { name: 'Time and expense', steps: ['Record time against tasks', 'Submit expenses with receipts', 'Approve by engagement manager', 'Lock for billing'] },
    { name: 'Billing', steps: ['Collect approved time and milestones', 'Apply rates, caps and discounts', 'Review draft invoice', 'Issue and track payment'] },
    { name: 'Engagement review', steps: ['Compare budget to actual', 'Forecast to completion', 'Flag overruns', 'Agree change requests'] },
  ],
  modules: [
    { title: 'Client and opportunity management', body: 'Clients, contacts, opportunities and proposals linked to subsequent engagements.' },
    { title: 'Engagement and project management', body: 'Contracts, budgets, tasks, milestones and change requests.' },
    { title: 'Resource management', body: 'Skills, availability, bookings and capacity forecasting.' },
    { title: 'Time and expense', body: 'Mobile-friendly time entry, expenses, approvals and policy checks.' },
    { title: 'Billing and revenue', body: 'Multiple billing models, invoice review and revenue recognition support.' },
    { title: 'Practice analytics', body: 'Utilization, realization, margin and pipeline coverage.' },
  ],
  dataModel: {
    entities: ['Client', 'Opportunity', 'Engagement', 'Contract term', 'Rate card', 'Task', 'Person', 'Skill', 'Booking', 'Time entry', 'Expense', 'Invoice', 'Milestone'],
    notes: [
      'Rate cards are effective-dated and can be overridden per engagement, preserving the rate used on each time entry.',
      'Bookings (planned) and time entries (actual) are separate, which makes forecast versus actual analysis straightforward.',
      'Engagements can contain multiple billing arrangements to reflect real contracts.',
    ],
    integrations: [
      { title: 'CRM', body: 'Opportunity data from an existing CRM, or a built-in pipeline.' },
      { title: 'Calendars and collaboration', body: 'Calendar availability and time-entry prompts.' },
      { title: 'Accounting', body: 'Invoices and revenue posted to the ledger.' },
      { title: 'HR systems', body: 'People, roles, leave and cost rates.' },
    ],
  },
  ai: [
    { title: 'Staffing suggestions', body: 'Recommending available consultants with matching skills for open roles, for resource managers to confirm.' },
    { title: 'Timesheet assistance', body: 'Drafting time entries from calendar events for consultants to review and submit.' },
    { title: 'Overrun forecasting', body: 'Projecting final effort on fixed-fee engagements from burn rate and progress.' },
    { title: 'Invoice narrative drafting', body: 'Summarizing work performed for invoice descriptions from approved time entries.' },
  ],
  reporting: [
    'Utilization by person, practice and grade',
    'Realization: billed value against standard value',
    'Engagement margin and forecast to completion',
    'Work in progress and unbilled time',
    'Debtor days by client',
    'Pipeline and capacity coverage',
  ],
  security: [
    { title: 'Client confidentiality', body: 'Engagement data restricted to the team and authorized leadership.' },
    { title: 'Rate and cost visibility', body: 'Cost rates and margins visible only to authorized roles.' },
    { title: 'Approval controls', body: 'Time, expenses and invoices pass through defined approvals.' },
  ],
  deployment: [
    'Cloud hosting suits most firms, with mobile access for consultants.',
    'Customization usually involves billing models, approval workflows, practice structures and reporting conventions.',
  ],
  implementation: [
    { title: 'Commercial model mapping', body: 'Document how the firm actually prices and bills, including exceptions.' },
    { title: 'Time and engagements', body: 'Start with engagements and time capture, which feed everything else.' },
    { title: 'Billing', body: 'Move invoicing once time data is reliable, with parallel review for a cycle.' },
    { title: 'Resource planning and analytics', body: 'Introduce forward bookings and practice reporting.' },
  ],
  diagram: {
    caption: 'Illustrative flow from opportunity to margin in a consulting firm.',
    stages: [
      { label: 'Propose', detail: 'Estimate and price' },
      { label: 'Staff', detail: 'Skills and availability' },
      { label: 'Deliver', detail: 'Time and expense' },
      { label: 'Bill', detail: 'By contract terms' },
      { label: 'Review', detail: 'Margin and utilization' },
    ],
    systems: ['Pipeline', 'Resource plan', 'Timesheets', 'Billing engine', 'Practice analytics'],
  },
  faqs: [
    { q: 'Can one engagement combine fixed fee and time-and-materials?', a: 'Yes. Engagements can hold several billing arrangements, each with its own rules.' },
    { q: 'Can consultants record time on mobile?', a: 'Yes. Time and expense entry is designed for mobile use, with approvals by engagement managers.' },
    { q: 'Will AI submit timesheets automatically?', a: 'No. AI can draft entries from calendars, but consultants review and submit them.' },
  ],
  related: ['professional-services/accounting-audit', 'professional-services/it-services', 'professional-services/project-based-services', 'professional-services/agencies'],
  insights: ['why-enterprise-software-must-adapt', 'ai-assisted-engineering-prototype-to-production'],
}
