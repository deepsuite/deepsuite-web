/**
 * Fictional data for the homepage product demonstration. Nothing here
 * represents a real organization, customer or measured outcome.
 */

export type DemoTabId = 'operations' | 'finance' | 'supply' | 'intelligence'

export type Tone = 'good' | 'warn' | 'risk' | 'neutral'

export interface DemoKpi {
  label: string
  value: string
  delta: string
  tone: Tone
}

export type DemoView =
  | { kind: 'table'; title: string; columns: string[]; rows: Array<{ cells: string[]; tone: Tone }> }
  | { kind: 'bars'; title: string; legend: [string, string]; series: Array<{ label: string; a: number; b: number }> }
  | { kind: 'cover'; title: string; items: Array<{ label: string; days: number; target: number }> }

export interface DemoTab {
  id: DemoTabId
  label: string
  heading: string
  modules: string[]
  kpis: DemoKpi[]
  view: DemoView
  prompt: string
  findings: string[]
  actions: Array<{ label: string; detail: string }>
}

export const sidebarModules = [
  'Executive overview',
  'Operations',
  'Finance',
  'Inventory',
  'Procurement',
  'Sales',
  'Analytics',
  'AI assistant',
] as const

export const demoTabs: DemoTab[] = [
  {
    id: 'operations',
    label: 'Operations',
    heading: 'Operations · Today',
    modules: ['Executive overview', 'Operations', 'Sales'],
    kpis: [
      { label: 'Orders today', value: '412', delta: '+6.4% vs avg', tone: 'good' },
      { label: 'Fulfilment rate', value: '96.8%', delta: '−0.7 pt', tone: 'warn' },
      { label: 'Late orders', value: '14', delta: '9 at North Gate', tone: 'risk' },
      { label: 'Open service jobs', value: '37', delta: '5 over SLA', tone: 'warn' },
    ],
    view: {
      kind: 'table',
      title: 'Branch fulfilment',
      columns: ['Branch', 'Orders', 'Fulfilled', 'Late', 'Status'],
      rows: [
        { cells: ['Central', '118', '99.1%', '1', 'On track'], tone: 'good' },
        { cells: ['Riverside', '86', '97.6%', '2', 'On track'], tone: 'good' },
        { cells: ['North Gate', '74', '87.8%', '9', 'Stock-blocked'], tone: 'risk' },
        { cells: ['Airport Road', '69', '97.1%', '2', 'On track'], tone: 'good' },
        { cells: ['Harbour', '65', '98.4%', '0', 'On track'], tone: 'good' },
      ],
    },
    prompt: 'Summarize today’s late orders by cause.',
    findings: [
      '9 of 14 late orders are at North Gate, all waiting on two SKUs that are out of stock locally.',
      '3 orders are held for customer confirmation of delivery address.',
      '2 orders are delayed with the courier; both are scheduled for tomorrow morning.',
    ],
    actions: [
      { label: 'Draft customer updates', detail: '14 messages · review before sending' },
      { label: 'Raise stock issue to supply chain', detail: 'North Gate · 2 SKUs' },
    ],
  },
  {
    id: 'finance',
    label: 'Finance',
    heading: 'Finance · Month to date',
    modules: ['Executive overview', 'Finance', 'Analytics'],
    kpis: [
      { label: 'Revenue MTD', value: '2.84M', delta: '+4.1% vs plan', tone: 'good' },
      { label: 'Gross margin', value: '31.2%', delta: '−0.9 pt', tone: 'warn' },
      { label: 'Receivables 60d+', value: '6.2%', delta: '−0.4 pt', tone: 'good' },
      { label: 'Cash position', value: '1.12M', delta: 'Stable', tone: 'neutral' },
    ],
    view: {
      kind: 'bars',
      title: 'Revenue and gross margin by branch',
      legend: ['Revenue (index)', 'Margin %'],
      series: [
        { label: 'Central', a: 92, b: 34 },
        { label: 'Riverside', a: 71, b: 32 },
        { label: 'North Gate', a: 64, b: 30 },
        { label: 'Airport Rd', a: 58, b: 33 },
        { label: 'Harbour', a: 55, b: 24 },
      ],
    },
    prompt: 'Why did gross margin dip at Harbour last week?',
    findings: [
      'Promotional sales rose to 38% of Harbour’s revenue, 11 points above its usual share.',
      'Supplier cost increases on three accessory categories have not yet been reflected in shelf prices.',
      'Two stock write-offs were posted on Thursday after a damaged delivery.',
    ],
    actions: [
      { label: 'Prepare margin review', detail: 'For the category manager' },
      { label: 'List items with outdated prices', detail: '27 SKUs · pricing team' },
    ],
  },
  {
    id: 'supply',
    label: 'Supply Chain',
    heading: 'Supply chain · Inventory and procurement',
    modules: ['Inventory', 'Procurement', 'Analytics'],
    kpis: [
      { label: 'Stock value', value: '4.60M', delta: '+2.3% MoM', tone: 'neutral' },
      { label: 'Average cover', value: '18.4 d', delta: '−1.2 d', tone: 'warn' },
      { label: 'Open purchase orders', value: '63', delta: '8 overdue', tone: 'risk' },
      { label: 'Inbound this week', value: '21', delta: 'deliveries', tone: 'neutral' },
    ],
    view: {
      kind: 'cover',
      title: 'Days of cover by category (target shown)',
      items: [
        { label: 'Smartphones', days: 9, target: 14 },
        { label: 'Laptops', days: 22, target: 21 },
        { label: 'Chargers & cables', days: 31, target: 28 },
        { label: 'Audio', days: 12, target: 18 },
        { label: 'Cases & protection', days: 41, target: 30 },
      ],
    },
    prompt: 'Which suppliers are behind on confirmed delivery dates?',
    findings: [
      'Two suppliers account for 6 of the 8 overdue purchase orders, averaging 4 days late.',
      'The overdue orders include 11 smartphone SKUs, where cover is already below target.',
      'A third supplier has confirmed early delivery for audio stock on Wednesday.',
    ],
    actions: [
      { label: 'Draft supplier follow-ups', detail: '2 suppliers · review before sending' },
      { label: 'Check alternative sources', detail: '11 smartphone SKUs' },
    ],
  },
  {
    id: 'intelligence',
    label: 'Intelligence',
    heading: 'Intelligence · Replenishment',
    modules: ['Inventory', 'Sales', 'AI assistant'],
    kpis: [
      { label: 'Branches at risk', value: '3', delta: 'of 5', tone: 'risk' },
      { label: 'SKUs below cover', value: '46', delta: '< 5 days', tone: 'warn' },
      { label: 'Suggested transfers', value: '18', delta: 'draft', tone: 'neutral' },
      { label: 'Suggested POs', value: '7', delta: 'draft', tone: 'neutral' },
    ],
    view: {
      kind: 'table',
      title: 'Branch shortage overview',
      columns: ['Branch', 'SKUs short', 'Min cover', '14-day demand', 'Risk'],
      rows: [
        { cells: ['Riverside', '19', '2.1 d', '+22%', 'High'], tone: 'risk' },
        { cells: ['North Gate', '15', '3.4 d', '+9%', 'Medium'], tone: 'warn' },
        { cells: ['Airport Road', '12', '3.8 d', '+14%', 'Medium'], tone: 'warn' },
        { cells: ['Central', '0', '26.0 d', '−3%', 'Surplus'], tone: 'good' },
        { cells: ['Harbour', '0', '11.5 d', '+2%', 'Low'], tone: 'good' },
      ],
    },
    prompt:
      'Show me which branches have inventory shortages and prepare a replenishment plan based on recent sales.',
    findings: [
      'Riverside has 19 SKUs under 5 days of cover; demand there is up 22% over the last 14 days.',
      'North Gate is short on 15 SKUs, but purchase order PO-2291 arriving Thursday covers 9 of them.',
      'Central holds surplus on 14 of the short SKUs — enough to rebalance without new purchasing.',
    ],
    actions: [
      { label: 'Draft 18 transfers from Central', detail: '112 units → Riverside, Airport Road' },
      { label: 'Draft 7 purchase orders', detail: '3 suppliers · remaining shortfall' },
    ],
  },
]
