import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function CodeSnippetBlock({ snippet }) {
  return (
    <figure className="overflow-hidden rounded-lg border border-line">
      <figcaption className="flex items-center justify-between gap-4 border-b border-line bg-surface-alt px-4 py-2.5">
        <span className="font-mono text-xs leading-relaxed text-muted">
          {snippet.label}
        </span>
        <span className="shrink-0 rounded bg-accent-soft px-2 py-0.5 font-mono text-[10px] tracking-wider text-accent uppercase">
          {snippet.language}
        </span>
      </figcaption>
      <SyntaxHighlighter
        language={snippet.language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: '0.78rem',
          background: '#0f1117',
        }}
        wrapLongLines={false}
      >
        {snippet.code}
      </SyntaxHighlighter>
    </figure>
  )
}
