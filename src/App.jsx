import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import portfolio from './data/portfolio.json'
import Hero from './components/Hero.jsx'
import ExperienceTimeline from './components/ExperienceTimeline.jsx'
import ProjectsSection from './components/ProjectsSection.jsx'
import SkillsGrid from './components/SkillsGrid.jsx'
import InterestsCloud from './components/InterestsCloud.jsx'
import GitHubSection from './components/GitHubSection.jsx'
import Footer from './components/Footer.jsx'

const SECTIONS = [
  { id: 'experience', label: 'Experience', glyph: '♜' },
  { id: 'projects', label: 'Active Services', glyph: '♛' },
  { id: 'stack', label: 'Stack', glyph: '♟' },
  { id: 'github', label: 'GitHub', glyph: '♖' },
  { id: 'interests', label: 'On the board', glyph: '♘' },
]

export default function App() {
  const [dark, setDark] = useState(true)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.3,
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  // cursor spotlight follows the mouse across the whole page
  useEffect(() => {
    const onMove = (e) => {
      document.documentElement.style.setProperty('--spot-x', `${e.clientX}px`)
      document.documentElement.style.setProperty('--spot-y', `${e.clientY}px`)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div className="min-h-screen bg-bg text-ink">
      {/* scroll progress bar */}
      <motion.div
        className="fixed top-0 right-0 left-0 z-[60] h-[2px] origin-left bg-accent"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />

      {/* cursor spotlight */}
      <div
        className="spotlight pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
      />

      {/* sticky section nav (desktop) */}
      <nav
        aria-label="Sections"
        className="fixed top-1/2 left-4 z-50 hidden -translate-y-1/2 flex-col gap-4 lg:flex"
      >
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            title={s.label}
            className="group relative flex h-8 w-8 items-center justify-center rounded-full border border-line bg-surface/70 text-sm text-muted backdrop-blur transition-all duration-300 hover:scale-110 hover:border-accent hover:text-accent"
          >
            {s.glyph}
            <span className="pointer-events-none absolute left-11 rounded border border-line bg-surface px-2 py-1 font-mono text-[10px] whitespace-nowrap text-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {s.label}
            </span>
          </a>
        ))}
      </nav>

      <button
        onClick={() => setDark((d) => !d)}
        aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        className="fixed top-5 right-5 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-muted transition-all duration-300 hover:scale-110 hover:rotate-45 hover:border-accent hover:text-accent"
      >
        {dark ? <Sun size={17} /> : <Moon size={17} />}
      </button>

      <div className="relative z-10">
        <Hero
          personalInfo={portfolio.personalInfo}
          coreDomains={portfolio.coreDomains}
        />
        <div id="experience">
          <ExperienceTimeline experience={portfolio.experience} />
        </div>
        <div id="projects">
          <ProjectsSection projects={portfolio.projects} />
        </div>
        <div id="stack">
          <SkillsGrid skills={portfolio.skills} />
        </div>
        <div id="github">
          <GitHubSection
            profiles={portfolio.personalInfo.profiles}
            projects={portfolio.projects}
          />
        </div>
        <div id="interests">
          <InterestsCloud interests={portfolio.interests} />
        </div>
        <Footer personalInfo={portfolio.personalInfo} />
      </div>
    </div>
  )
}
