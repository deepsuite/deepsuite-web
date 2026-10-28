import { industryGroups } from './industries'

/** Options for the consultation form's industry field. */
export const industryOptions: string[] = [...industryGroups.map((g) => g.name), 'Other']
