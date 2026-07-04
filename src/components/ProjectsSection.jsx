import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading.jsx'
import ProjectCard from './ProjectCard.jsx'

export default function ProjectsSection({ projects }) {
  const [filter, setFilter] = useState(null)
  const [openId, setOpenId] = useState(null)

  const allDomains = useMemo(
    () => [...new Set(projects.flatMap((p) => p.domains ?? []))],
    [projects],
  )

  const visible = filter
    ? projects.filter((p) => p.domains?.includes(filter))
    : projects

  return (
    <section
      className="border-y border-line bg-bg-alt"
      aria-label="Active Services"
    >
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading kicker="♛ Deployed pieces" title="Active Services" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-wrap gap-2"
        >
          <button
            onClick={() => setFilter(null)}
            className={`rounded-full border px-3.5 py-1.5 font-mono text-xs transition-all duration-300 ${
              !filter
                ? 'border-accent bg-accent-soft text-accent'
                : 'border-line text-muted hover:border-accent hover:text-accent'
            }`}
          >
            All
          </button>
          {allDomains.map((d) => (
            <button
              key={d}
              onClick={() => setFilter(filter === d ? null : d)}
              className={`rounded-full border px-3.5 py-1.5 font-mono text-xs transition-all duration-300 ${
                filter === d
                  ? 'border-accent bg-accent-soft text-accent'
                  : 'border-line text-muted hover:border-accent hover:text-accent'
              }`}
            >
              {d}
            </button>
          ))}
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {visible.map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
              open={openId === p.id}
              onToggle={() => setOpenId(openId === p.id ? null : p.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
