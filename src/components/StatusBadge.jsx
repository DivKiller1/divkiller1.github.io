const dotColor = (status) => {
  if (status.startsWith('Production')) return 'bg-status-green'
  if (status.startsWith('Designed')) return 'bg-status-blue'
  return 'bg-accent'
}

export default function StatusBadge({ status }) {
  return (
    <span className="inline-flex items-start gap-2 rounded-md border border-line bg-surface-alt px-3 py-1.5 font-mono text-xs leading-relaxed text-muted">
      <span
        className={`mt-1 h-2 w-2 shrink-0 rounded-full ${dotColor(status)}`}
        aria-hidden="true"
      />
      {status}
    </span>
  )
}
