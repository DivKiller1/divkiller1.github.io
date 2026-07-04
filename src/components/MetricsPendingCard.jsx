export default function MetricsPendingCard({ metrics }) {
  return (
    <div>
      <p className="mb-3 font-mono text-xs text-muted">{metrics.status}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {metrics.plannedMetrics.map((m) => (
          <div
            key={m}
            className="rounded-lg border border-line bg-surface-alt p-4 transition-colors duration-300 hover:border-accent/50"
          >
            <p className="font-serif text-3xl text-muted" aria-hidden="true">
              —
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted">{m}</p>
            <span className="mt-2 inline-block rounded-full bg-accent-soft px-2 py-0.5 font-mono text-[10px] tracking-wider text-accent uppercase">
              pending
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
