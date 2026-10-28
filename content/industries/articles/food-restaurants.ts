import type { IndustryArticle } from '../types'

export const foodRestaurants: IndustryArticle = {
  group: 'food-hospitality',
  sub: 'restaurants',
  eyebrow: 'Food and Hospitality · Restaurants and Cafés',
  title: 'Enterprise software for restaurants and cafés',
  metaTitle: 'Restaurant Management Software — Recipe Costing, Ingredient Inventory, Kitchen and Branch Operations',
  metaDescription:
    'How custom enterprise software supports restaurants and cafés: menu engineering, recipe costing, ingredient-level inventory, procurement, kitchen operations, table service, delivery platforms and branch reporting.',
  intro:
    'A restaurant sells dishes but buys ingredients, and the difference between the two is where its margin lives. This page explains how restaurant operations work behind the counter and what software designed around them needs to do.',
  context: [
    'Restaurants run a manufacturing process in miniature every service. Ingredients are bought by the kilogram or case, prepared into components, combined into dishes according to recipes, and sold with modifiers and combos. Waste, over-portioning and price changes from suppliers all affect cost — often invisibly.',
    'Front of house is just as demanding. Orders arrive from tables, the counter, phone, the restaurant’s own website and multiple delivery platforms, each with its own menu, pricing and payment flow. The kitchen needs a single, well-ordered queue regardless of where an order came from.',
    'For operators with more than one branch, the questions multiply: are recipes followed consistently, which branch has the highest food cost and why, and where should stock be bought centrally rather than locally?',
  ],
  challenges: [
    { title: 'Theoretical versus actual food cost', body: 'Without recipe-level consumption, it is hard to tell whether rising cost comes from supplier prices, waste, portioning or theft.' },
    { title: 'Fragmented order channels', body: 'Delivery platforms, phone orders and dine-in often run on separate tablets and systems, creating re-keying, errors and reconciliation gaps.' },
    { title: 'Menu changes that outpace systems', body: 'Seasonal specials, price changes and modifier updates must reach the point of sale, kitchen displays and delivery menus consistently.' },
    { title: 'Perishable stock', body: 'Ingredients have short shelf lives, and over-ordering turns directly into waste while under-ordering removes dishes from the menu.' },
    { title: 'Labour scheduling', body: 'Staffing must follow demand patterns by day and hour; overstaffed quiet shifts and understaffed peaks both cost money.' },
  ],
  operatingModel: [
    'A head chef or central culinary team defines recipes and portion sizes. Purchasing is done by the branch or a central buyer from a small group of regular suppliers, with deliveries several times a week for fresh produce.',
    'During service, orders are taken and routed to stations — grill, fry, cold, bar — and expedited to tables or packaged for delivery. Payment is settled at the table, counter or through the delivery platform.',
    'After service, staff record waste, count key items and prepare orders for the next delivery. Managers review sales, covers, average spend, labour cost and food cost by day and week.',
  ],
  workflows: [
    { name: 'Order to kitchen', steps: ['Capture order from any channel', 'Apply modifiers and combos', 'Route items to kitchen stations', 'Expedite and close the order'] },
    { name: 'Recipe costing', steps: ['Define recipe and yields', 'Link ingredients to supplier items', 'Recalculate on price changes', 'Compare to menu price'] },
    { name: 'Ingredient replenishment', steps: ['Estimate usage from forecast sales', 'Check par levels and stock', 'Raise purchase orders', 'Receive and check deliveries'] },
    { name: 'Stock count and variance', steps: ['Count key ingredients', 'Calculate theoretical usage', 'Report variance by item', 'Investigate and act'] },
    { name: 'Day close', steps: ['Reconcile payments by method', 'Reconcile delivery platform orders', 'Record waste', 'Publish daily branch report'] },
  ],
  modules: [
    { title: 'Menu and recipe management', body: 'Menu items, modifiers, combos and multi-level recipes including prepared components, with yields and portion sizes.' },
    { title: 'Point of sale and table service', body: 'Table plans, course firing, bill splitting, tips and counter service.' },
    { title: 'Kitchen display and routing', body: 'Station-based tickets, timing, bump screens and order readiness for runners and couriers.' },
    { title: 'Ingredient inventory', body: 'Stock by location in purchase and recipe units, with par levels, counts, waste logging and transfers between branches or a central kitchen.' },
    { title: 'Procurement', body: 'Supplier catalogues, purchase orders, delivery checks against orders and invoice matching.' },
    { title: 'Delivery channel integration', body: 'Orders from delivery platforms and the restaurant’s own online ordering in one kitchen queue.' },
    { title: 'Labour and scheduling', body: 'Shift planning against forecast demand, time records and labour-cost reporting.' },
  ],
  dataModel: {
    entities: ['Menu', 'Menu item', 'Modifier group', 'Recipe', 'Prep component', 'Ingredient', 'Supplier item', 'Unit conversion', 'Order', 'Kitchen ticket', 'Stock count', 'Waste record', 'Shift'],
    notes: [
      'Recipes are hierarchical: a burger uses a patty, which is itself a recipe of mince and seasoning. Costs and consumption roll up through every level.',
      'Unit conversion is essential — a supplier sells flour in 25 kg sacks while recipes use grams — and must be explicit per ingredient.',
      'Menus are channel-specific views over shared items, so a price or availability change can apply to one channel or all.',
    ],
    integrations: [
      { title: 'Delivery platforms', body: 'Order ingestion, menu publishing, availability toggles and settlement reconciliation where platform APIs permit.' },
      { title: 'Payments', body: 'Card terminals, mobile wallets and pay-at-table, reconciled per shift.' },
      { title: 'Suppliers', body: 'Price lists and ordering through supplier portals or structured email where available.' },
      { title: 'Accounting and payroll', body: 'Daily sales journals and labour data posted to existing finance and payroll systems.' },
    ],
  },
  ai: [
    { title: 'Prep and purchase forecasting', body: 'Estimating ingredient needs from historical sales, day-of-week patterns and known events, presented as suggested order quantities.' },
    { title: 'Food-cost variance explanation', body: 'Summarizing which ingredients drive a branch’s variance between theoretical and actual cost, so managers know where to look.' },
    { title: 'Menu engineering insight', body: 'Grouping items by popularity and margin to inform menu changes, with the data visible behind each suggestion.' },
    { title: 'Operational questions in plain language', body: 'Allowing an operations manager to ask, for example, which branches had the highest waste on dairy last week.' },
  ],
  reporting: [
    'Sales, covers and average spend by branch, day-part and channel',
    'Theoretical versus actual food cost by branch and ingredient',
    'Menu item popularity and contribution margin',
    'Waste by ingredient and reason',
    'Labour cost as a percentage of sales',
    'Delivery platform sales and commission reconciliation',
    'Supplier price movement on key ingredients',
  ],
  security: [
    { title: 'Void and discount controls', body: 'Voids, comps and discounts require reasons and, above thresholds, manager authorization, with a complete audit log.' },
    { title: 'Cash handling', body: 'Drawer assignment per staff member and variance reporting at cash-up.' },
    { title: 'Recipe confidentiality', body: 'Recipes and costing visible only to authorized culinary and management roles.' },
    { title: 'Food-safety records', body: 'Temperature checks and allergen information recorded with time and user where required.' },
  ],
  deployment: [
    'Service cannot stop for an internet outage. Point-of-sale and kitchen applications should continue to operate locally and synchronize when connectivity returns.',
    'Single-site restaurants and groups have different needs; the same architecture should support one branch or many, including central kitchens supplying satellite outlets.',
    'Customization most often involves recipe structures, kitchen routing, loyalty rules and reporting formats.',
  ],
  implementation: [
    { title: 'Recipe and menu capture', body: 'Work with the kitchen to document recipes, yields and units before any costing is trusted.' },
    { title: 'Front-of-house first', body: 'Launch ordering, kitchen routing and payments, since they deliver immediate operational value.' },
    { title: 'Inventory and procurement', body: 'Introduce counts, purchasing and variance reporting once sales data is flowing accurately.' },
    { title: 'Multi-branch rollout', body: 'Extend branch by branch, comparing metrics as each joins.' },
  ],
  diagram: {
    caption: 'Illustrative flow from order to cost in a restaurant operation.',
    stages: [
      { label: 'Order', detail: 'Table, counter, delivery' },
      { label: 'Kitchen', detail: 'Station routing' },
      { label: 'Consume', detail: 'Recipe depletion' },
      { label: 'Replenish', detail: 'Par and forecast' },
      { label: 'Report', detail: 'Food and labour cost' },
    ],
    systems: ['Menu and recipes', 'Ingredient inventory', 'Payments', 'Delivery platforms', 'Branch analytics'],
  },
  faqs: [
    { q: 'Can orders from delivery platforms go straight to the kitchen?', a: 'Where the platform provides an integration API, orders can be ingested into the same kitchen queue as dine-in orders. Availability depends on each platform’s terms and technical options.' },
    { q: 'How does recipe costing handle changing supplier prices?', a: 'Recipe costs are recalculated from the latest received cost of each ingredient, and changes are visible in margin reports.' },
    { q: 'Will the point of sale work offline?', a: 'Offline operation is designed in for counters and kitchen displays, with transactions synchronized once the connection returns.' },
    { q: 'Does this suit a single café or only large groups?', a: 'The architecture scales in both directions. What changes is the scope of modules and the depth of multi-branch features.' },
  ],
  related: ['food-hospitality/restaurant-groups', 'food-hospitality/quick-service', 'food-hospitality/catering', 'food-hospitality/salons'],
  insights: ['enterprise-software-for-multi-branch-retail', 'why-enterprise-software-must-adapt'],
}
