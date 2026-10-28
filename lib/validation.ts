/**
 * Consultation enquiry schema, shared by the browser form and the API route
 * so both enforce identical rules.
 */

export const projectTypes = [
  'Custom ERP',
  'Enterprise application development',
  'Legacy modernization',
  'AI integration',
  'Workflow automation',
  'System integration',
  'Ongoing engineering partnership',
  'Other',
] as const

export const organizationSizes = ['1–49 people', '50–249 people', '250–999 people', '1,000–4,999 people', '5,000+ people'] as const

export interface ConsultationInput {
  fullName: string
  email: string
  company: string
  role: string
  industry: string
  organizationSize: string
  projectType: string
  currentSystems: string
  goals: string
  preferredTime: string
  consent: boolean
}

export type FieldErrors = Partial<Record<keyof ConsultationInput, string>>

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const limits = {
  fullName: 120,
  email: 200,
  company: 160,
  role: 120,
  industry: 120,
  currentSystems: 1500,
  goals: 4000,
  preferredTime: 200,
  goalsMin: 30,
} as const

function str(v: unknown): string {
  return typeof v === 'string' ? v.trim() : ''
}

export function normalize(raw: Record<string, unknown>): ConsultationInput {
  return {
    fullName: str(raw.fullName),
    email: str(raw.email).toLowerCase(),
    company: str(raw.company),
    role: str(raw.role),
    industry: str(raw.industry),
    organizationSize: str(raw.organizationSize),
    projectType: str(raw.projectType),
    currentSystems: str(raw.currentSystems),
    goals: str(raw.goals),
    preferredTime: str(raw.preferredTime),
    consent: raw.consent === true || raw.consent === 'on' || raw.consent === 'true',
  }
}

export function validate(input: ConsultationInput, industries: readonly string[]): FieldErrors {
  const e: FieldErrors = {}
  if (input.fullName.length < 2) e.fullName = 'Enter your full name.'
  else if (input.fullName.length > limits.fullName) e.fullName = `Use ${limits.fullName} characters or fewer.`

  if (!input.email) e.email = 'Enter your work email address.'
  else if (!EMAIL.test(input.email) || input.email.length > limits.email) e.email = 'Enter a valid email address, like name@company.com.'

  if (input.company.length < 2) e.company = 'Enter your company or organization name.'
  else if (input.company.length > limits.company) e.company = `Use ${limits.company} characters or fewer.`

  if (input.role.length < 2) e.role = 'Enter your job title or role.'
  else if (input.role.length > limits.role) e.role = `Use ${limits.role} characters or fewer.`

  if (!input.industry) e.industry = 'Select the industry closest to your organization.'
  else if (!industries.includes(input.industry)) e.industry = 'Select an industry from the list.'

  if (input.organizationSize && !(organizationSizes as readonly string[]).includes(input.organizationSize))
    e.organizationSize = 'Select an organization size from the list.'

  if (!input.projectType) e.projectType = 'Select the type of project.'
  else if (!(projectTypes as readonly string[]).includes(input.projectType)) e.projectType = 'Select a project type from the list.'

  if (input.currentSystems.length > limits.currentSystems) e.currentSystems = `Use ${limits.currentSystems} characters or fewer.`

  if (input.goals.length < limits.goalsMin)
    e.goals = `Tell us a little more about what you want to achieve (at least ${limits.goalsMin} characters).`
  else if (input.goals.length > limits.goals) e.goals = `Use ${limits.goals} characters or fewer.`

  if (input.preferredTime.length > limits.preferredTime) e.preferredTime = `Use ${limits.preferredTime} characters or fewer.`

  if (!input.consent) e.consent = 'Confirm that we may use these details to respond to your enquiry.'
  return e
}

export const fieldOrder: Array<keyof ConsultationInput> = [
  'fullName',
  'email',
  'company',
  'role',
  'industry',
  'organizationSize',
  'projectType',
  'currentSystems',
  'goals',
  'preferredTime',
  'consent',
]
