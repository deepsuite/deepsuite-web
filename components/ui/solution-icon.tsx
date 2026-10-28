import { BrainCircuit, Layers, Network, RefreshCcw, Server, Sparkles, Users, Workflow, type LucideProps } from 'lucide-react'
import type { SolutionIcon as SolutionIconName } from '@/content/solutions'

const icons = {
  sparkles: Sparkles,
  layers: Layers,
  refresh: RefreshCcw,
  workflow: Workflow,
  brain: BrainCircuit,
  network: Network,
  server: Server,
  users: Users,
} satisfies Record<SolutionIconName, React.ComponentType<LucideProps>>

export function SolutionIcon({ name, ...props }: { name: SolutionIconName } & LucideProps) {
  const Icon = icons[name]
  return <Icon aria-hidden="true" strokeWidth={1.6} {...props} />
}
