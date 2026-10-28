/** Small original line diagrams used on capability cards. Decorative only. */

const S = { stroke: '#cfd7db', fill: '#fff' }
const T = '#35c6b1'
const I = '#7778e8'
const INK = '#101820'

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 280 120" className="h-auto w-full" aria-hidden="true" fontFamily="var(--font-geist-mono)">
      {children}
    </svg>
  )
}

export function VisualAiNative() {
  const nodes = [
    [40, 30], [40, 90], [140, 60], [240, 30], [240, 90],
  ] as const
  return (
    <Frame>
      {[[0, 2], [1, 2], [2, 3], [2, 4]].map(([a, b]) => (
        <line key={`${a}${b}`} x1={nodes[a!]![0]} y1={nodes[a!]![1]} x2={nodes[b!]![0]} y2={nodes[b!]![1]} stroke={S.stroke} />
      ))}
      <line x1="40" y1="30" x2="140" y2="60" stroke={T} strokeDasharray="3 6" className="animate-flow" />
      {nodes.map(([x, y], i) =>
        i === 2 ? (
          <g key={i}>
            <rect x={x - 34} y={y - 16} width="68" height="32" rx="6" fill={INK} />
            <text x={x} y={y + 4} textAnchor="middle" fontSize="10" fill="#fff">model</text>
          </g>
        ) : (
          <g key={i}>
            <rect x={x - 26} y={y - 12} width="52" height="24" rx="5" fill={S.fill} stroke={S.stroke} />
            <circle cx={x - 15} cy={y} r="2.5" fill={i < 2 ? T : I} />
            <rect x={x - 8} y={y - 2} width="24" height="4" rx="2" fill="#e3e8ea" />
          </g>
        ),
      )}
    </Frame>
  )
}

export function VisualErp() {
  const rows = ['Finance', 'Inventory', 'Procurement', 'Operations']
  return (
    <Frame>
      {rows.map((r, i) => (
        <g key={r} transform={`translate(${30 + i * 10}, ${14 + i * 24})`}>
          <rect width="200" height="20" rx="4" fill={i === 1 ? '#e8f7f4' : S.fill} stroke={i === 1 ? T : S.stroke} />
          <text x="10" y="13.5" fontSize="9" fill={i === 1 ? '#0d7c6d' : '#5f6c78'}>{r}</text>
          <rect x="150" y="7" width={30 - i * 4} height="6" rx="3" fill={i === 1 ? T : '#e3e8ea'} />
        </g>
      ))}
    </Frame>
  )
}

export function VisualWorkflow() {
  return (
    <Frame>
      <line x1="20" y1="60" x2="250" y2="60" stroke={S.stroke} />
      <rect x="18" y="48" width="44" height="24" rx="5" fill={S.fill} stroke={S.stroke} />
      <path d="M118 42 L136 60 L118 78 L100 60 Z" fill="#efeffc" stroke={I} />
      <path d="M118 42 V22 H200" fill="none" stroke={S.stroke} />
      <rect x="200" y="12" width="56" height="22" rx="5" fill="#fff4e3" stroke="#d99a3c" />
      <text x="228" y="26" fontSize="8.5" textAnchor="middle" fill="#8a5a12">review</text>
      <rect x="200" y="48" width="56" height="24" rx="5" fill={INK} />
      <text x="228" y="63" fontSize="8.5" textAnchor="middle" fill="#fff">done</text>
      <circle cx="80" cy="60" r="3" fill={T} className="animate-pulse-soft" />
      <circle cx="165" cy="60" r="3" fill={T} className="animate-pulse-soft" style={{ animationDelay: '0.8s' }} />
    </Frame>
  )
}

export function VisualLegacy() {
  return (
    <Frame>
      <rect x="20" y="28" width="80" height="64" rx="4" fill="#f7f8f6" stroke={S.stroke} strokeDasharray="3 3" />
      <text x="60" y="64" fontSize="9" textAnchor="middle" fill="#5f6c78">legacy</text>
      <path d="M112 60 H152" stroke={T} markerEnd="url(#cv-arrow)" />
      <defs>
        <marker id="cv-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill={T} />
        </marker>
      </defs>
      {[0, 1, 2].map((r) =>
        [0, 1].map((c) => (
          <rect
            key={`${r}${c}`}
            x={168 + c * 46}
            y={24 + r * 26}
            width="40"
            height="20"
            rx="4"
            fill={r === 0 && c === 0 ? '#e8f7f4' : S.fill}
            stroke={r === 0 && c === 0 ? T : S.stroke}
          />
        )),
      )}
    </Frame>
  )
}

export function VisualIntegration() {
  const spokes = [[40, 24], [40, 96], [240, 24], [240, 96], [140, 108]] as const
  return (
    <Frame>
      {spokes.map(([x, y], i) => (
        <line key={i} x1="140" y1="56" x2={x} y2={y} stroke={i === 0 ? T : S.stroke} strokeDasharray={i === 0 ? '3 5' : undefined} className={i === 0 ? 'animate-flow' : undefined} />
      ))}
      {spokes.map(([x, y], i) => (
        <rect key={`n${i}`} x={x - 22} y={y - 10} width="44" height="20" rx="4" fill={S.fill} stroke={S.stroke} />
      ))}
      <circle cx="140" cy="56" r="20" fill={INK} />
      <circle cx="140" cy="56" r="6" fill={T} />
    </Frame>
  )
}

export function VisualDeployment() {
  const envs = ['managed', 'your cloud', 'on-prem']
  return (
    <Frame>
      {envs.map((e, i) => (
        <g key={e} transform={`translate(${16 + i * 88}, 30)`}>
          <rect width="76" height="60" rx="5" fill={i === 1 ? '#e8f7f4' : S.fill} stroke={i === 1 ? T : S.stroke} />
          <text x="38" y="50" fontSize="8.5" textAnchor="middle" fill={i === 1 ? '#0d7c6d' : '#5f6c78'}>{e}</text>
          <text x="38" y="28" fontSize="13" textAnchor="middle" fill={INK}>{'{ }'}</text>
        </g>
      ))}
    </Frame>
  )
}
