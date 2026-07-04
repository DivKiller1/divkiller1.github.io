import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Github, MapPin, GraduationCap, Award, ChevronDown } from 'lucide-react'

function Typewriter({ text, speed = 65, onDone }) {
  const [count, setCount] = useState(0)
  const done = count >= text.length
  useEffect(() => {
    if (done) {
      onDone?.()
      return
    }
    const t = setTimeout(() => setCount((c) => c + 1), speed)
    return () => clearTimeout(t)
  }, [count, done, text, speed, onDone])
  return (
    <span className={done ? 'name-shimmer' : ''}>
      {text.slice(0, count)}
      {!done && <span className="caret text-accent">▌</span>}
    </span>
  )
}

const FLOATING_PIECES = [
  { glyph: '♞', top: '12%', left: '78%', size: '5rem', dur: '9s', delay: '0s' },
  { glyph: '♜', top: '58%', left: '88%', size: '3.5rem', dur: '11s', delay: '1.5s' },
  { glyph: '♝', top: '30%', left: '62%', size: '2.6rem', dur: '8s', delay: '3s' },
  { glyph: '♟', top: '75%', left: '70%', size: '2.2rem', dur: '10s', delay: '0.8s' },
  { glyph: '♛', top: '8%', left: '45%', size: '2.8rem', dur: '12s', delay: '2s' },
]

export default function Hero({ personalInfo, coreDomains }) {
  const [typed, setTyped] = useState(false)
  const { scrollY } = useScroll()
  const parallax = useTransform(scrollY, [0, 600], [0, 120])
  const fade = useTransform(scrollY, [0, 500], [1, 0.15])
  const { name, title, tagline, location, education, achievements, profiles } =
    personalInfo

  const reveal = {
    hidden: { opacity: 0, y: 24 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.15 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    }),
  }

  // duplicate list so the marquee loops seamlessly
  const marqueeDomains = [...coreDomains, ...coreDomains]

  return (
    <header className="relative min-h-screen overflow-hidden">
      <div className="board-texture board-drift pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* floating chess glyphs */}
      <motion.div
        className="pointer-events-none absolute inset-0 hidden sm:block"
        style={{ y: parallax, opacity: fade }}
        aria-hidden="true"
      >
        {FLOATING_PIECES.map((p) => (
          <span
            key={p.glyph + p.top}
            className="absolute text-accent/10 select-none dark:text-accent/15"
            style={{
              top: p.top,
              left: p.left,
              fontSize: p.size,
              animation: `float-piece ${p.dur} ease-in-out ${p.delay} infinite`,
            }}
          >
            {p.glyph}
          </span>
        ))}
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="relative mx-auto max-w-5xl px-6 pt-28 pb-24 sm:pt-36"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.6em' }}
          animate={{ opacity: 1, letterSpacing: '0.3em' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="mb-4 font-mono text-xs text-accent uppercase"
        >
          ♞ Opening position
        </motion.p>

        <h1 className="font-serif text-4xl font-semibold sm:text-6xl">
          <Typewriter text={name} onDone={() => setTyped(true)} />
        </h1>

        {typed && (
          <motion.div initial="hidden" animate="show">
            <motion.p
              variants={reveal}
              custom={1}
              className="mt-4 font-mono text-lg text-accent sm:text-xl"
            >
              {title}
            </motion.p>

            <motion.p
              variants={reveal}
              custom={2}
              className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
            >
              {tagline}
            </motion.p>

            <motion.div
              variants={reveal}
              custom={3}
              className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-muted"
            >
              <span className="flex items-center gap-1.5">
                <MapPin size={13} className="text-accent" /> {location}
              </span>
              <span className="flex items-center gap-1.5">
                <GraduationCap size={13} className="text-accent" />
                {education.degree} · {education.institution} ·{' '}
                {education.timeline}
              </span>
            </motion.div>

            {/* auto-scrolling domains marquee */}
            <motion.div
              variants={reveal}
              custom={4}
              className="relative mt-8 overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
            >
              <div className="marquee-track flex gap-2">
                {marqueeDomains.map((d, i) => (
                  <span
                    key={d + i}
                    className="shrink-0 rounded-full border border-line bg-surface px-3.5 py-1.5 font-mono text-xs text-muted transition-all duration-300 hover:border-accent hover:text-accent"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={reveal}
              custom={5}
              className="mt-6 flex flex-wrap gap-2"
            >
              {achievements.map((a) => (
                <span
                  key={a}
                  title={a}
                  className="group relative flex cursor-default items-center gap-1.5 rounded-md border border-line bg-surface-alt px-3 py-1.5 text-xs text-ink transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[0_4px_20px_var(--accent-soft)]"
                >
                  <Award size={12} className="text-accent" />
                  {a}
                </span>
              ))}
            </motion.div>

            <motion.a
              variants={reveal}
              custom={6}
              href={profiles.github}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="group relative mt-10 inline-flex items-center gap-2 overflow-hidden rounded-md border border-accent px-6 py-3 font-mono text-sm text-accent transition-colors duration-300 hover:text-bg"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Github size={16} /> GitHub
              </span>
              <span className="absolute inset-0 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
            </motion.a>
          </motion.div>
        )}
      </motion.div>

      {/* scroll cue */}
      {typed && (
        <motion.a
          href="#experience"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted transition-colors hover:text-accent"
          aria-label="Scroll to experience"
        >
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="block"
          >
            <ChevronDown size={22} />
          </motion.span>
        </motion.a>
      )}
    </header>
  )
}
