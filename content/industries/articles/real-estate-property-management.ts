import type { IndustryArticle } from '../types'

export const realEstatePropertyManagement: IndustryArticle = {
  group: 'real-estate',
  sub: 'property-management',
  eyebrow: 'Real Estate · Property Management',
  title: 'Enterprise software for property management',
  metaTitle: 'Property Management Software — Leases, Rent Billing, Maintenance, Owner Reporting',
  metaDescription:
    'How custom enterprise software supports property managers: portfolio and unit hierarchy, lease administration, rent and service-charge billing, collections, maintenance work orders and owner reporting.',
  intro:
    'Property managers run long-lived assets on behalf of owners, under contracts that span years. Their systems must hold the structure of a portfolio, the terms of every lease and the history of every unit. This page describes how that work is organized and what a well-designed system provides.',
  context: [
    'A property management business is responsible for three relationships at once: with owners, who expect returns and transparent reporting; with tenants or residents, who expect responsive service; and with contractors and vendors, who carry out maintenance and services.',
    'The asset structure is hierarchical — portfolio, property, building, floor, unit — and each level can carry costs, income and obligations. Leases attach to units but frequently include shared-area charges, parking, storage and escalation clauses that refer to indices or fixed schedules.',
    'Because leases last years, the system becomes the operational memory of the business: what was agreed, what was billed, what was paid, what was repaired and when.',
  ],
  challenges: [
    { title: 'Lease terms buried in documents', body: 'Escalations, break clauses, renewal options and special conditions live in PDFs, so critical dates are missed or billed incorrectly.' },
    { title: 'Arrears visibility', body: 'Collections teams lack a clear, current view of who owes what, for how long and what follow-up has already happened.' },
    { title: 'Service-charge allocation', body: 'Shared costs must be apportioned across units by agreed methods, and reconciled at year end against budgets.' },
    { title: 'Maintenance accountability', body: 'Requests arrive by phone, message and email, and it is hard to prove response times or link costs to units and owners.' },
    { title: 'Owner reporting effort', body: 'Monthly owner statements are often assembled manually from several systems.' },
  ],
  operatingModel: [
    'New properties are onboarded with their unit structure and owner agreements. Leasing teams market vacant units, process applications and execute leases, collecting deposits and recording key terms.',
    'Each billing cycle, rent, service charges and utilities are invoiced, payments are received through several channels and allocated, and arrears are followed up. Maintenance requests are logged, triaged, assigned to in-house staff or vendors, and closed with costs recorded.',
    'Monthly or quarterly, owners receive statements of income, expenses and fees. Annually, service charges are reconciled and budgets are set.',
  ],
  workflows: [
    { name: 'Lease setup', steps: ['Create tenant and lease', 'Record term, rent and escalations', 'Collect deposit', 'Schedule billing and key dates'] },
    { name: 'Billing and collections', steps: ['Generate periodic charges', 'Receive and allocate payments', 'Identify arrears', 'Run follow-up workflow'] },
    { name: 'Maintenance request', steps: ['Log request with unit and category', 'Triage priority', 'Assign staff or vendor', 'Close with cost and evidence'] },
    { name: 'Owner statement', steps: ['Collect income per property', 'Collect expenses and fees', 'Apply management fee rules', 'Publish statement and remit'] },
    { name: 'Renewal or exit', steps: ['Alert ahead of key dates', 'Negotiate and record terms', 'Inspect at move-out', 'Settle deposit'] },
  ],
  modules: [
    { title: 'Portfolio and unit registry', body: 'Hierarchical property structures with areas, attributes, ownership and status for each unit.' },
    { title: 'Lease administration', body: 'Structured lease terms, escalations, options, critical-date alerts and document storage.' },
    { title: 'Billing and receivables', body: 'Recurring charges, one-off charges, payment allocation, receipts and arrears ageing.' },
    { title: 'Service charges', body: 'Budgets, apportionment rules, recoveries and annual reconciliation.' },
    { title: 'Maintenance and work orders', body: 'Request intake, triage, vendor dispatch, costs and service-level tracking.' },
    { title: 'Owner accounting', body: 'Owner ledgers, management fees, statements and remittances.' },
    { title: 'Tenant portal', body: 'Statements, payments and maintenance requests for tenants or residents.' },
  ],
  dataModel: {
    entities: ['Portfolio', 'Property', 'Building', 'Unit', 'Owner', 'Tenant', 'Lease', 'Lease clause', 'Charge schedule', 'Invoice', 'Payment', 'Work order', 'Vendor', 'Owner statement'],
    notes: [
      'Lease clauses are structured data where they affect billing or dates — escalation type, index, cap, notice period — while the signed document remains the legal record.',
      'Owner and management company finances should be clearly separated, with explicit fee and remittance rules.',
      'Unit history persists across tenancies, so occupancy, rent and maintenance can be analysed over the asset’s life.',
    ],
    integrations: [
      { title: 'Banking and payments', body: 'Bank statement import, payment gateways and direct-debit collection where available.' },
      { title: 'Accounting', body: 'General ledger posting for the management company and, where required, owner entities.' },
      { title: 'Document signing', body: 'Electronic signature for leases and renewals through an approved provider.' },
      { title: 'Building systems', body: 'Access control or metering integrations where buildings provide them.' },
    ],
  },
  ai: [
    { title: 'Lease abstraction assistance', body: 'Extracting candidate terms — dates, rents, escalations — from lease documents for staff to verify before they become structured data.' },
    { title: 'Arrears prioritization', body: 'Ordering follow-up by amount, age and payment history, with suggested next steps.' },
    { title: 'Maintenance triage', body: 'Classifying incoming requests by category and urgency to speed assignment.' },
    { title: 'Owner commentary drafts', body: 'Drafting narrative commentary for owner statements from the underlying figures, for a property manager to edit.' },
  ],
  reporting: [
    'Occupancy and vacancy by property and unit type',
    'Rent roll and lease expiry profile',
    'Arrears ageing and collection rates',
    'Maintenance response and completion times',
    'Service-charge budget versus actual',
    'Net operating income by property',
  ],
  security: [
    { title: 'Owner segregation', body: 'Owners see only their own properties and statements.' },
    { title: 'Financial approvals', body: 'Vendor payments, write-offs and deposit releases require approval by role and value.' },
    { title: 'Document access', body: 'Leases and tenant documents restricted to relevant staff, with access logged.' },
    { title: 'Tenant data protection', body: 'Personal data handled under applicable data-protection obligations with retention rules.' },
  ],
  deployment: [
    'Cloud hosting suits most property managers, with portals for owners, tenants and vendors.',
    'Organizations managing assets for institutional owners may require dedicated environments or specific hosting regions.',
    'Customization usually centres on lease structures, fee models, service-charge methods and reporting formats demanded by owners.',
  ],
  implementation: [
    { title: 'Portfolio structure', body: 'Model properties, units and ownership accurately before anything else.' },
    { title: 'Lease abstraction', body: 'Convert active leases into structured terms, verified by the property team.' },
    { title: 'Billing parallel run', body: 'Run billing alongside the existing process for one or two cycles to confirm accuracy.' },
    { title: 'Portals and maintenance', body: 'Open tenant and vendor portals and move maintenance into structured workflows.' },
  ],
  diagram: {
    caption: 'Illustrative lifecycle of a managed unit.',
    stages: [
      { label: 'Onboard', detail: 'Unit and owner' },
      { label: 'Lease', detail: 'Terms and deposit' },
      { label: 'Bill', detail: 'Rent and charges' },
      { label: 'Maintain', detail: 'Work orders' },
      { label: 'Report', detail: 'Owner statements' },
    ],
    systems: ['Unit registry', 'Lease terms', 'Receivables', 'Vendor network', 'Owner ledgers'],
  },
  faqs: [
    { q: 'Can the system handle both residential and commercial leases?', a: 'Yes. Lease structures are configurable, including escalations, recoveries and options typical of commercial leases.' },
    { q: 'Can owners access their own reports?', a: 'Yes. An owner portal can provide statements and property-level reports restricted to each owner’s assets.' },
    { q: 'Is AI used to read our lease documents?', a: 'AI can propose extracted terms, but staff review and confirm every term before it is used for billing.' },
  ],
  related: ['real-estate/development', 'real-estate/commercial-real-estate', 'real-estate/facilities-management', 'real-estate/residential-property'],
  insights: ['why-enterprise-software-must-adapt', 'modernizing-legacy-systems-without-disruption'],
}
