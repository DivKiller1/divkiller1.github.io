import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading.jsx'

// chess-piece mapping per the brief: knight=AI/ML, rook=infra, bishop=networking/security,
// queen=cloud, king=devops, pawn=languages; geometric fallbacks elsewhere
const CATEGORY_META = {
  languages: { label: 'Languages', icon: '♟' },
  backend: { label: 'Backend', icon: '▣' },
  frontend: { label: 'Frontend', icon: '◈' },
  databases: { label: 'Databases', icon: '▤' },
  cloudInfrastructure: { label: 'Cloud & Infrastructure', icon: '♛' },
  devopsContainers: { label: 'DevOps & Containers', icon: '♚' },
  observability: { label: 'Observability', icon: '◉' },
  networkingSecurity: { label: 'Networking & Security', icon: '♝' },
  aiMl: { label: 'AI / ML', icon: '♞' },
}

export default function SkillsGrid({ skills }) {
  const categories = Object.entries(skills)

  return (
    <section className="mx-auto max-w-6xl px-6 py-20" aria-label="Stack">
      <SectionHeading kicker="♟ Material count" title="Stack" />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map(([key, list], i) => {
          const meta = CATEGORY_META[key] ?? { label: key, icon: '◆' }
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="flip-scene h-52"
              tabIndex={0}
              aria-label={`${meta.label}: ${list.join(', ')}`}
            >
              <div className="flip-inner relative h-full w-full">
                <div className="flip-face absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl border border-line bg-surface">
                  <span className="text-4xl text-accent" aria-hidden="true">
                    {meta.icon}
                  </span>
                  <h3 className="font-serif text-lg font-semibold">
                    {meta.label}
                  </h3>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-muted uppercase">
                    hover to reveal
                  </span>
                </div>
                <div className="flip-face flip-back absolute inset-0 flex flex-wrap content-center items-center justify-center gap-1.5 overflow-hidden rounded-xl border border-accent/50 bg-surface-alt p-4">
                  {list.map((s) => (
                    <span
                      key={s}
                      className="rounded border border-line bg-surface px-2 py-1 font-mono text-[11px] text-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
