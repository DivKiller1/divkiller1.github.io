import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading.jsx'

export default function ExperienceTimeline({ experience }) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20" aria-label="Experience">
      <SectionHeading kicker="♜ Game record" title="Experience" />

      <div className="relative">
        <motion.div
          className="absolute top-0 left-[7px] w-px bg-line sm:left-1/2"
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          aria-hidden="true"
        />

        <ol className="space-y-12">
          {experience.map((job, i) => {
            const active = /present/i.test(job.timeline)
            const left = i % 2 === 0
            return (
              <li key={job.company} className="relative">
                <span
                  className={`absolute top-1.5 left-0 h-[15px] w-[15px] rounded-full border-2 border-bg sm:left-1/2 sm:-translate-x-1/2 ${
                    active ? 'pulse-dot bg-status-green' : 'bg-muted'
                  }`}
                  aria-hidden="true"
                />
                <motion.div
                  initial={{ opacity: 0, x: left ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={`ml-8 sm:ml-0 sm:w-[calc(50%-2.5rem)] ${
                    left ? '' : 'sm:ml-auto'
                  }`}
                >
                  <div className="rounded-lg border border-line bg-surface p-6 transition-colors duration-300 hover:border-accent/60">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-sm text-accent">
                        {String(i + 1).padStart(2, '0')}.
                      </span>
                      <div>
                        <h3 className="font-serif text-lg font-semibold">
                          {job.company}
                        </h3>
                        <p className="font-mono text-xs text-muted">
                          {job.role} · {job.timeline}
                          {active && (
                            <span className="ml-2 text-status-green">
                              ● active
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                      {job.highlights.map((h) => (
                        <li key={h} className="flex gap-2">
                          <span className="mt-0.5 text-accent" aria-hidden="true">
                            ▸
                          </span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
