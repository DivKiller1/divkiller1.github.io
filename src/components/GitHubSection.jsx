import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Users, BookMarked, Star, GitFork, ExternalLink } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'

const username = (url) => url.split('/').filter(Boolean).pop()

export default function GitHubSection({ profiles, projects }) {
  const user = username(profiles.github)
  const [profile, setProfile] = useState(null)
  const [repos, setRepos] = useState({})

  useEffect(() => {
    let cancelled = false
    fetch(`https://api.github.com/users/${user}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => !cancelled && d && setProfile(d))
      .catch(() => {})

    const withRepos = projects.filter((p) => p.github)
    Promise.all(
      withRepos.map((p) => {
        const path = p.github.split('github.com/')[1]
        return fetch(`https://api.github.com/repos/${path}`)
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null)
      }),
    ).then((results) => {
      if (cancelled) return
      const map = {}
      withRepos.forEach((p, i) => {
        if (results[i]) map[p.id] = results[i]
      })
      setRepos(map)
    })
    return () => { cancelled = true }
  }, [user, projects])

  const stats = profile
    ? [
        { icon: Users, label: 'Followers', value: profile.followers },
        { icon: BookMarked, label: 'Public repos', value: profile.public_repos },
        {
          icon: Star,
          label: 'Stars on featured repos',
          value: Object.values(repos).reduce(
            (n, r) => n + (r.stargazers_count ?? 0),
            0,
          ),
        },
      ]
    : []

  return (
    <section className="mx-auto max-w-6xl px-6 py-20" aria-label="GitHub">
      <SectionHeading kicker="♖ Open files" title="GitHub" />

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* profile card */}
        <motion.a
          href={profiles.github}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="card-glow group relative flex flex-col items-center gap-3 rounded-xl border border-line bg-surface p-6 text-center transition-all duration-300 hover:border-accent hover:shadow-[0_8px_40px_var(--accent-soft)]"
        >
          {profile ? (
            <img
              src={profile.avatar_url}
              alt={`${user} avatar`}
              className="h-24 w-24 rounded-full border-2 border-accent/40 transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <span className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-line text-4xl text-accent">
              ♞
            </span>
          )}
          <p className="font-serif text-lg font-semibold">
            {profile?.name ?? user}
          </p>
          <p className="flex items-center gap-1.5 font-mono text-xs text-muted">
            <Github size={13} /> @{user}
            <ExternalLink size={11} className="opacity-0 transition-opacity group-hover:opacity-100" />
          </p>
          {profile?.bio && (
            <p className="text-xs leading-relaxed text-muted">{profile.bio}</p>
          )}
          <div className="mt-2 grid w-full grid-cols-3 gap-2 border-t border-line pt-4">
            {stats.map((s) => (
              <div key={s.label} title={s.label}>
                <p className="font-serif text-xl text-accent">{s.value}</p>
                <p className="font-mono text-[9px] leading-tight text-muted uppercase">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </motion.a>

        <div className="flex flex-col gap-6">
          {/* contribution graph */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="overflow-hidden rounded-xl border border-line bg-surface p-5 transition-colors duration-300 hover:border-accent/60"
          >
            <p className="mb-3 font-mono text-xs tracking-[0.2em] text-accent uppercase">
              Contribution graph
            </p>
            <img
              src={`https://ghchart.rshah.org/c9a84c/${user}`}
              alt={`${user}'s GitHub contribution chart`}
              loading="lazy"
              className="w-full opacity-90"
            />
          </motion.div>

          {/* live repo cards */}
          <div className="grid gap-3 sm:grid-cols-2">
            {projects
              .filter((p) => p.github)
              .map((p, i) => {
                const r = repos[p.id]
                return (
                  <motion.a
                    key={p.id}
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                    className="group rounded-lg border border-line bg-surface p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent"
                  >
                    <p className="flex items-center gap-2 font-mono text-sm text-ink transition-colors group-hover:text-accent">
                      <BookMarked size={14} className="shrink-0 text-accent" />
                      {p.github.split('/').pop()}
                    </p>
                    <div className="mt-2 flex items-center gap-4 font-mono text-[11px] text-muted">
                      {r?.language && (
                        <span className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                          {r.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Star size={11} /> {r?.stargazers_count ?? '—'}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork size={11} /> {r?.forks_count ?? '—'}
                      </span>
                    </div>
                  </motion.a>
                )
              })}
          </div>
        </div>
      </div>
    </section>
  )
}
