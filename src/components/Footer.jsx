import { Github } from 'lucide-react'

export default function Footer({ personalInfo }) {
  return (
    <footer className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-6 py-14 text-center">
      <p className="font-serif text-lg font-semibold">{personalInfo.name}</p>
      <p className="font-mono text-xs text-muted">Built from verified data.</p>
      <a
        href={personalInfo.profiles.github}
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub profile"
        className="mt-1 text-muted transition-colors duration-300 hover:text-accent"
      >
        <Github size={18} />
      </a>
      <p className="font-mono text-[11px] text-muted">
        ♞ {new Date().getFullYear()}
      </p>
    </footer>
  )
}
