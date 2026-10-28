/**
 * Portfolio entries. `kind` must stay honest: only use 'client-project' for
 * genuine, authorized work with the client's permission to publish.
 */
export type WorkKind = 'concept-demonstration' | 'reference-architecture' | 'client-project'

export const workKindLabels: Record<WorkKind, string> = {
  'concept-demonstration': 'Concept Demonstration',
  'reference-architecture': 'Reference Architecture',
  'client-project': 'Client Project',
}

export interface WorkItem {
  slug: string
  title: string
  kind: WorkKind
  industryRef: string
  problem: string
  solution: string[]
  screen: {
    title: string
    kpis: Array<{ label: string; value: string }>
    rows: Array<{ label: string; meta: string; tone: 'good' | 'warn' | 'risk' }>
  }
}

export const work: WorkItem[] = [
  {
    slug: 'multi-branch-retail-operations',
    title: 'Multi-Branch Retail Operations',
    kind: 'concept-demonstration',
    industryRef: 'retail/electronics',
    problem:
      'A retailer with several branches and a trade desk needs one view of serialized stock, transfers and trade credit — while branches keep selling through connectivity outages.',
    solution: [
      'Location-aware inventory with transit and serial-level tracking',
      'Offline-capable point of sale with defined synchronization rules',
      'AI-drafted replenishment plans reviewed by buyers before execution',
    ],
    screen: {
      title: 'Branch network',
      kpis: [
        { label: 'Branches', value: '5' },
        { label: 'In transit', value: '214' },
        { label: 'Below cover', value: '46' },
      ],
      rows: [
        { label: 'Riverside', meta: '19 SKUs short', tone: 'risk' },
        { label: 'North Gate', meta: 'PO arriving Thu', tone: 'warn' },
        { label: 'Central', meta: 'Surplus on 14', tone: 'good' },
      ],
    },
  },
  {
    slug: 'manufacturing-operations-platform',
    title: 'Manufacturing Operations Platform',
    kind: 'reference-architecture',
    industryRef: 'manufacturing/discrete-manufacturing',
    problem:
      'A discrete manufacturer plans in spreadsheets and tracks the floor on paper, so late orders, material shortages and true product costs surface too late to act on.',
    solution: [
      'Versioned BOMs and routings with lot genealogy',
      'Capacity-aware planning with shop-floor reporting by tablet',
      'Schedule-risk alerts explaining which shortages block which orders',
    ],
    screen: {
      title: 'Production schedule',
      kpis: [
        { label: 'Work orders', value: '38' },
        { label: 'On time', value: '91%' },
        { label: 'Blocked', value: '4' },
      ],
      rows: [
        { label: 'WO-1182 · Assembly', meta: 'Awaiting bearings', tone: 'risk' },
        { label: 'WO-1179 · Paint', meta: 'WC-3 at 104%', tone: 'warn' },
        { label: 'WO-1175 · QA', meta: 'Released', tone: 'good' },
      ],
    },
  },
  {
    slug: 'real-estate-portfolio-management',
    title: 'Real Estate Portfolio Management',
    kind: 'concept-demonstration',
    industryRef: 'real-estate/property-management',
    problem:
      'A property manager runs leases in documents, billing in spreadsheets and maintenance through messages, and assembles owner statements by hand each month.',
    solution: [
      'Structured lease terms with critical-date alerts',
      'Automated billing, collections workflow and owner ledgers',
      'AI-assisted lease abstraction with staff verification',
    ],
    screen: {
      title: 'Portfolio overview',
      kpis: [
        { label: 'Units', value: '642' },
        { label: 'Occupancy', value: '94.1%' },
        { label: 'Arrears 30d+', value: '3.8%' },
      ],
      rows: [
        { label: 'Harbour View · L4', meta: 'Lease expires in 60 d', tone: 'warn' },
        { label: 'Park Court · 12B', meta: 'Work order overdue', tone: 'risk' },
        { label: 'Elm Terrace', meta: 'Statements ready', tone: 'good' },
      ],
    },
  },
]
