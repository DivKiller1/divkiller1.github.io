import { lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Github, Star } from 'lucide-react'
import StatusBadge from './StatusBadge.jsx'
import MetricsPendingCard from './MetricsPendingCard.jsx'
import PipelineVisualizer from './PipelineVisualizer.jsx'

const CodeSnippetBlock = lazy(() => import('./CodeSnippetBlock.jsx'))

export default function ProjectCard({ project, open, onToggle }) {
  const {
    id,
    title,
    featured,
    github,
    techStack,
    domains,
    status,
    description,
    features,
    note,
    codeSnippets,
    metrics,
  } = project

  const handleMouse = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--glow-x', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--glow-y', `${e.clientY - r.top}px`)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onToggle()
    }
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouse}
      className={`board-texture card-glow group relative overflow-hidden rounded-xl border bg-surface transition-all duration-500 hover:shadow-[0_8px_40px_var(--accent-soft)] ${
        open ? 'border-accent md:col-span-2' : 'border-line hover:border-accent'
      }`}
    >
      {/* texture brightens slightly on hover */}
      <div className="pointer-events-none absolute inset-0 bg-surface/60 opacity-100 transition-opacity duration-500 group-hover:opacity-30" aria-hidden="true" />

      <div className="relative p-6">
        <div
          role="button"
          tabIndex={0}
          aria-expanded={open}
          onClick={onToggle}
          onKeyDown={handleKey}
          className="cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              {featured && (
                <span className="mb-2 inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.2em] text-accent uppercase">
                  <Star size={10} /> Featured
                </span>
              )}
              <h3 className="font-serif text-xl leading-snug font-semibold">
                {title}
              </h3>
            </div>
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="mt-1 shrink-0 text-muted transition-colors group-hover:text-accent"
              aria-hidden="true"
            >
              <ChevronDown size={20} />
            </motion.span>
          </div>

          <div className="mt-3">
            <StatusBadge status={status} />
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted">
            {description}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {techStack.map((t) => (
              <span
                key={t}
                className="rounded border border-line bg-surface-alt px-2 py-0.5 font-mono text-[11px] text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-6 space-y-8 border-t border-line pt-6">
                {domains?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {domains.map((d) => (
                      <span
                        key={d}
                        className="rounded-full bg-accent-soft px-3 py-1 font-mono text-[11px] text-accent"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                )}

                {features?.length > 0 && (
                  <ul className="space-y-2.5 text-sm leading-relaxed text-muted">
                    {features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className="mt-0.5 text-accent" aria-hidden="true">▸</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                )}

                {note && (
                  <p className="rounded-lg border border-line bg-surface-alt p-4 font-mono text-xs leading-relaxed text-muted">
                    {note}
                  </p>
                )}

                {id === 'autonomous-cicd' && <PipelineVisualizer />}

                {codeSnippets?.length > 0 && (
                  <Suspense
                    fallback={
                      <p className="font-mono text-xs text-muted">
                        loading snippets…
                      </p>
                    }
                  >
                    <div className="space-y-4">
                      {codeSnippets.map((s) => (
                        <CodeSnippetBlock key={s.label} snippet={s} />
                      ))}
                    </div>
                  </Suspense>
                )}

                {metrics && <MetricsPendingCard metrics={metrics} />}

                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 font-mono text-xs text-accent underline-offset-4 transition-all hover:underline"
                  >
                    <Github size={14} /> View source
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  )
}
