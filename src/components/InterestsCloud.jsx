import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading.jsx'

// deterministic pseudo-random vertical offsets for the scattered feel
const OFFSETS = [-10, 8, -4, 12, -8, 5, -12, 10]

export default function InterestsCloud({ interests }) {
  return (
    <section
      className="border-y border-line bg-bg-alt"
      aria-label="Interests"
    >
      <div className="mx-auto max-w-5xl px-6 py-20">
        <SectionHeading kicker="♘ Under study" title="On the board" />

        <div className="flex flex-wrap items-center gap-x-4 gap-y-6">
          {interests.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1,
                y: OFFSETS[i % OFFSETS.length],
              }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ scale: 1.08 }}
              className="cursor-default rounded-full border border-line bg-surface px-5 py-2.5 font-mono text-sm text-muted transition-colors duration-300 hover:border-accent hover:bg-accent-soft hover:text-accent"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
