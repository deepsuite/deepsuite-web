import type { Block } from '@/content/insights/types'

export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-ds">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'p':
            return <p key={i}>{b.text}</p>
          case 'h2':
            return (
              <h2 key={i} id={b.id}>
                {b.text}
              </h2>
            )
          case 'h3':
            return <h3 key={i}>{b.text}</h3>
          case 'ul':
            return (
              <ul key={i}>
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            )
          case 'ol':
            return (
              <ol key={i}>
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ol>
            )
          case 'quote':
            return (
              <blockquote key={i}>
                <p>{b.text}</p>
              </blockquote>
            )
        }
      })}
    </div>
  )
}
