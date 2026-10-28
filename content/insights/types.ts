export const insightCategories = [
  { slug: 'enterprise-ai', name: 'Enterprise AI', description: 'How AI fits into governed business systems — where it helps, where it should not act alone.' },
  { slug: 'erp-business-systems', name: 'ERP and Business Systems', description: 'The structure of operational systems: finance, inventory, operations and the data that ties them together.' },
  { slug: 'industry-research', name: 'Industry Research', description: 'How specific industries operate, and what their systems need to reflect.' },
  { slug: 'software-architecture', name: 'Software Architecture', description: 'Engineering perspectives on designing maintainable enterprise applications.' },
  { slug: 'digital-transformation', name: 'Digital Transformation', description: 'Modernizing systems and processes without disrupting the business.' },
  { slug: 'engineering-implementation', name: 'Engineering and Implementation', description: 'Practical guides to delivering enterprise software from requirements to production.' },
  { slug: 'deepsuite-updates', name: 'DeepSuite Updates', description: 'News about DeepSuite, its methodology and its work.' },
] as const

export type InsightCategorySlug = (typeof insightCategories)[number]['slug']

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; id: string; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'quote'; text: string }

export interface Insight {
  slug: string
  title: string
  description: string
  category: InsightCategorySlug
  format: 'Perspective' | 'Research' | 'Guide'
  /** ISO date. Leave undefined until the article has a real publication date. */
  publishedAt?: string
  updatedAt?: string
  industries: string[]
  body: Block[]
}

/** Small authoring helpers keep article files readable. */
export const p = (text: string): Block => ({ type: 'p', text })
export const h2 = (id: string, text: string): Block => ({ type: 'h2', id, text })
export const h3 = (text: string): Block => ({ type: 'h3', text })
export const ul = (...items: string[]): Block => ({ type: 'ul', items })
export const ol = (...items: string[]): Block => ({ type: 'ol', items })
export const quote = (text: string): Block => ({ type: 'quote', text })
