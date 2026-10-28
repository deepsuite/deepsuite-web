/** Decorative layered-architecture illustration used on featured article cards. */
const layers = ['Domain core', 'Action layer', 'Read models', 'AI orchestration', 'Approval + audit']

export function ArchitectureLayers({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 290" className={className} aria-hidden="true">
      {layers.map((t, i) => (
        <g key={t} transform={`translate(${40 + i * 14}, ${20 + i * 52})`}>
          <rect width="280" height="38" rx="6" fill={i === 3 ? 'rgba(53,198,177,0.12)' : '#17232d'} stroke={i === 3 ? '#35c6b1' : '#2d3943'} />
          <circle cx="18" cy="19" r="3" fill={i === 3 ? '#35c6b1' : i === 4 ? '#7778e8' : '#5f6c78'} />
          <text x="32" y="23.5" fontSize="12" fill={i === 3 ? '#35c6b1' : '#d6dde2'}>
            {t}
          </text>
          {i < layers.length - 1 && <line x1="140" y1="38" x2="154" y2="52" stroke="#2d3943" />}
        </g>
      ))}
    </svg>
  )
}
