import type { IndustryArticle } from '../types'

export const travelTourOperators: IndustryArticle = {
  group: 'travel',
  sub: 'tour-operators',
  eyebrow: 'Travel · Tour Operators',
  title: 'Enterprise software for tour operators',
  metaTitle: 'Tour Operator Software — Itinerary Costing, Supplier Allocations, Departures, Margins',
  metaDescription:
    'How custom enterprise software supports tour operators: itinerary building and costing, supplier contracts and allocations, bookings, departure operations, guides, payments and per-departure margin.',
  intro:
    'Tour operators package other suppliers’ services into a product of their own and take responsibility for delivering it. Their systems must cost, sell and operate that product while commitments on both sides keep changing. This page outlines the operating model and the software it needs.',
  context: [
    'A tour combines accommodation, transport, guides, entrance fees, meals and activities, each from a supplier with its own contract, rates, seasons and cancellation terms. The operator prices the package, sells it directly or through agents, and then manages every component until the travellers return home.',
    'Margins are earned on the difference between selling price and the final cost of each departure — and those costs depend on group size, currency movements, supplier changes and on-trip expenses. Many operators only learn a departure’s true margin weeks after it ends.',
    'Operationally, the critical documents are the departure manifest, rooming lists, supplier confirmations and the guide’s briefing pack. Errors in any of them are felt by travellers directly.',
  ],
  challenges: [
    { title: 'Contracted rates in spreadsheets', body: 'Seasonal rates, child policies, supplements and release dates are hard to apply consistently when each supplier contract lives in its own file.' },
    { title: 'Allocation management', body: 'Room and seat allocations must be tracked against bookings and released on time to avoid penalties.' },
    { title: 'Late changes', body: 'Name changes, extra nights and cancellations ripple through supplier bookings, invoices and manifests.' },
    { title: 'Margin visibility', body: 'Without per-departure costing that updates as bookings and costs change, pricing and yield decisions are made blind.' },
    { title: 'Currency exposure', body: 'Costs in one currency and sales in another create exposure that should be visible per departure.' },
  ],
  operatingModel: [
    'Product teams design itineraries, contract suppliers and price departures for the season. Sales teams and agents sell places, collecting deposits and final payments according to booking terms.',
    'Operations teams confirm services with suppliers, manage allocations and releases, produce manifests and rooming lists, and brief guides. During the trip, guides handle on-the-ground changes and expenses.',
    'After the trip, supplier invoices are matched to bookings, guide expenses are settled and departure profitability is reviewed.',
  ],
  workflows: [
    { name: 'Itinerary costing', steps: ['Build day-by-day itinerary', 'Apply contracted rates by date', 'Calculate cost per group size', 'Set selling price and margin'] },
    { name: 'Booking', steps: ['Check departure availability', 'Capture travellers and requirements', 'Take deposit', 'Issue confirmation'] },
    { name: 'Supplier confirmation', steps: ['Generate service requests', 'Track confirmations', 'Manage allocations and releases', 'Record final costs'] },
    { name: 'Departure operation', steps: ['Finalize manifest and rooming', 'Issue guide pack', 'Record on-trip changes and expenses', 'Close departure'] },
    { name: 'Departure settlement', steps: ['Match supplier invoices', 'Settle guide expenses', 'Calculate actual margin', 'Review against plan'] },
  ],
  modules: [
    { title: 'Supplier contracts and rates', body: 'Seasons, rate types, supplements, child policies, release dates and cancellation terms.' },
    { title: 'Itinerary builder', body: 'Reusable itinerary templates with automatic costing by date and group size.' },
    { title: 'Departures and inventory', body: 'Scheduled departures with capacity, allocations and waitlists.' },
    { title: 'Bookings and travellers', body: 'Traveller details, requirements, documents, payments and communications.' },
    { title: 'Operations', body: 'Supplier service requests, confirmations, manifests, rooming lists and guide assignments.' },
    { title: 'Agent and partner management', body: 'Agent commissions, net rates and agent-facing booking access.' },
    { title: 'Departure accounting', body: 'Per-departure revenue, cost, currency and margin.' },
  ],
  dataModel: {
    entities: ['Supplier', 'Contract', 'Rate', 'Season', 'Service', 'Itinerary', 'Departure', 'Allocation', 'Booking', 'Traveller', 'Service request', 'Guide', 'Supplier invoice'],
    notes: [
      'Rates are resolved by date, room or seat type, occupancy and traveller age, so the costing engine needs explicit rate rules rather than flat prices.',
      'A departure is the unit of profitability; every booking, service and invoice references it.',
      'Currency is stored on every cost and sale, with the exchange rate used for each calculation preserved.',
    ],
    integrations: [
      { title: 'Supplier systems', body: 'Hotel and transport availability or booking APIs where suppliers provide them.' },
      { title: 'Online booking', body: 'Departure availability and booking on the operator’s website.' },
      { title: 'Payments', body: 'Online payment collection for deposits and balances.' },
      { title: 'Accounting', body: 'Revenue recognition at departure and supplier payables.' },
    ],
  },
  ai: [
    { title: 'Itinerary drafting', body: 'Proposing itinerary structures from a brief, using the operator’s own contracted services, for product teams to refine.' },
    { title: 'Supplier contract extraction', body: 'Suggesting structured rates and terms from contract documents, verified before use.' },
    { title: 'Release-date monitoring', body: 'Flagging allocations approaching release relative to booking pace.' },
    { title: 'Departure briefings', body: 'Assembling guide briefing summaries from booking data and traveller requirements.' },
  ],
  reporting: [
    'Booking pace by departure and season',
    'Load factor and allocation utilization',
    'Planned versus actual margin per departure',
    'Agent sales and commissions',
    'Currency exposure by departure',
    'Supplier performance and issues',
  ],
  security: [
    { title: 'Traveller data protection', body: 'Passport and health information restricted to operations roles with retention policies.' },
    { title: 'Agent access', body: 'Agents see only their own bookings and net rates.' },
    { title: 'Financial controls', body: 'Refunds, write-offs and supplier payments require approval.' },
  ],
  deployment: [
    'Cloud hosting suits most operators, with mobile access for guides on tour.',
    'Customization usually concentrates on rate structures, itinerary formats, booking terms and traveller documents.',
  ],
  implementation: [
    { title: 'Supplier and rate structure', body: 'Model contracts and rate rules for the coming season first.' },
    { title: 'Itinerary and departure setup', body: 'Rebuild key products as templates with automatic costing.' },
    { title: 'Bookings and operations', body: 'Move live booking and supplier confirmation into the system ahead of a season.' },
    { title: 'Departure accounting', body: 'Introduce per-departure profitability once invoices flow through.' },
  ],
  diagram: {
    caption: 'Illustrative lifecycle of a tour departure.',
    stages: [
      { label: 'Contract', detail: 'Supplier rates' },
      { label: 'Design', detail: 'Itinerary and price' },
      { label: 'Sell', detail: 'Direct and agents' },
      { label: 'Operate', detail: 'Confirm and run' },
      { label: 'Settle', detail: 'Actual margin' },
    ],
    systems: ['Contracts and rates', 'Departure inventory', 'Bookings', 'Supplier operations', 'Departure ledger'],
  },
  faqs: [
    { q: 'Can the system price a departure for different group sizes?', a: 'Yes. Costing accounts for per-person and per-group costs so prices can be set per occupancy band.' },
    { q: 'Can agents book directly?', a: 'An agent-facing booking interface can show net rates and availability, restricted to each agent.' },
    { q: 'How are currency differences handled?', a: 'Costs and sales retain their currencies, and margin reports show values at planned and actual exchange rates.' },
  ],
  related: ['travel/travel-agencies', 'travel/destination-management', 'travel/ticketing', 'food-hospitality/hotels'],
  insights: ['why-enterprise-software-must-adapt'],
}
