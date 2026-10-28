/**
 * Coverage describes the depth of DeepSuite's domain work in an area. It is
 * not a statement about delivered client deployments.
 */
export type Coverage = 'focus' | 'expertise' | 'emerging'

export const coverageLabels: Record<Coverage, { label: string; description: string }> = {
  focus: {
    label: 'Focus area',
    description: 'Reference architectures and reusable blueprints are an active area of DeepSuite engineering work.',
  },
  expertise: {
    label: 'Available expertise',
    description: 'Domain models and workflows we can design for today, adapted from adjacent blueprints.',
  },
  emerging: {
    label: 'Emerging coverage',
    description: 'Areas we are researching. Engagements start with deeper discovery before any reusable components apply.',
  },
}

export interface SubIndustry {
  slug: string
  name: string
  summary: string
  /** Four or so concrete operational concerns, used on brief pages and menus. */
  focus: string[]
}

export interface IndustryGroup {
  slug: string
  letter: string
  name: string
  shortName: string
  coverage: Coverage
  summary: string
  overview: string[]
  commonModules: string[]
  sharedWorkflows: string[]
  subs: SubIndustry[]
}

export interface TitledText {
  title: string
  body: string
}

export interface WorkflowSpec {
  name: string
  steps: string[]
}

export interface DiagramSpec {
  caption: string
  /** Left-to-right flow of business stages. */
  stages: Array<{ label: string; detail: string }>
  /** Systems or data stores the flow reads from and writes to. */
  systems: string[]
}

/** A full, independently useful industry analysis. Only these are indexed. */
export interface IndustryArticle {
  group: string
  sub: string
  eyebrow: string
  title: string
  metaTitle: string
  metaDescription: string
  intro: string
  context: string[]
  challenges: TitledText[]
  operatingModel: string[]
  workflows: WorkflowSpec[]
  modules: TitledText[]
  dataModel: {
    entities: string[]
    notes: string[]
    integrations: TitledText[]
  }
  ai: TitledText[]
  reporting: string[]
  security: TitledText[]
  deployment: string[]
  implementation: TitledText[]
  diagram: DiagramSpec
  faqs: Array<{ q: string; a: string }>
  related: string[]
  insights: string[]
}
