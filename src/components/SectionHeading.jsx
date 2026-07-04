import { motion } from 'framer-motion'

export default function SectionHeading({ kicker, title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12"
    >
      <p className="mb-2 font-mono text-xs tracking-[0.3em] text-accent uppercase">
        {kicker}
      </p>
      <h2 className="font-serif text-3xl font-semibold sm:text-4xl">{title}</h2>
      <div className="mt-4 h-px w-16 bg-accent" />
    </motion.div>
  )
}
