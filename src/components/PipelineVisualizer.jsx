import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react'

// Node sequence derived from the LangGraph pipeline in graph.py (see code snippet)
const NODES = [
  { id: 'analyzer', label: 'Analyzer', desc: 'Detects and classifies code vulnerabilities from the incoming webhook payload.' },
  { id: 'prediction_engine', label: 'Prediction Engine', desc: 'Confidence grading — scores each issue on complexity, historical success rate, and pattern similarity.' },
  { id: 'fix_generator', label: 'Fix Generator', desc: 'Generates a candidate patch with the LLM (Groq / Llama 3.1); low-confidence issues route to the human gate instead.' },
  { id: 'human_approval_gate', label: 'Human Approval', desc: 'Human-in-the-loop gate — a reviewer approves or rejects the generated patch before it ships.' },
  { id: 'patch_applier', label: 'Patch Applier', desc: 'Dispatches multi-file diffs to parallel per-file workers via LangGraph’s Send API.' },
  { id: 'file_worker', label: 'File Workers', desc: 'Concurrent per-file patch application instead of serial diffs.' },
  { id: 'patch_join', label: 'Patch Join', desc: 'Joins the parallel worker results back into a single pipeline state.' },
  { id: 'evaluator', label: 'Evaluator', desc: 'Validates the applied patch in an isolated environment before sign-off.' },
  { id: 'memory_updater', label: 'Memory Updater', desc: 'Records the fix outcome to update historical success rates used by the grader — crash-safe checkpointing at every stage.' },
]

export default function PipelineVisualizer() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    if (!playing) return
    const t = setInterval(
      () => setActive((a) => (a + 1) % NODES.length),
      2200,
    )
    return () => clearInterval(t)
  }, [playing])

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
          Pipeline
        </p>
        <div className="flex gap-1.5">
          <button
            onClick={() => { setPlaying(false); setActive((a) => (a - 1 + NODES.length) % NODES.length) }}
            aria-label="Previous node"
            className="rounded border border-line p-1.5 text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <SkipBack size={13} />
          </button>
          <button
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? 'Pause' : 'Play'}
            className="rounded border border-line p-1.5 text-muted transition-colors hover:border-accent hover:text-accent"
          >
            {playing ? <Pause size={13} /> : <Play size={13} />}
          </button>
          <button
            onClick={() => { setPlaying(false); setActive((a) => (a + 1) % NODES.length) }}
            aria-label="Next node"
            className="rounded border border-line p-1.5 text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <SkipForward size={13} />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-stretch gap-0 md:flex-row md:flex-wrap md:items-center">
        {NODES.map((node, i) => (
          <div key={node.id} className="flex flex-col items-center md:flex-row">
            <button
              onClick={() => { setPlaying(false); setActive(i) }}
              className={`rounded-full border px-3 py-1.5 font-mono text-[11px] whitespace-nowrap transition-all duration-300 ${
                i === active
                  ? 'border-accent text-accent shadow-[0_0_12px_var(--accent-soft),0_0_4px_var(--accent)]'
                  : 'border-line text-muted hover:border-accent/50'
              }`}
              aria-current={i === active ? 'step' : undefined}
            >
              {node.label}
            </button>
            {i < NODES.length - 1 && (
              <span className="relative mx-auto my-0.5 block h-4 w-px overflow-hidden bg-line md:mx-0.5 md:my-auto md:h-px md:w-5">
                <motion.span
                  className="absolute h-1.5 w-1.5 rounded-full bg-accent md:h-full md:w-1.5"
                  animate={
                    playing
                      ? { left: ['-20%', '120%'], top: ['-20%', '120%'] }
                      : { opacity: 0 }
                  }
                  transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
                  style={{ left: 0, top: 0 }}
                />
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 min-h-[3.5rem] rounded-lg border border-line bg-surface-alt p-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={NODES[active].id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="text-sm leading-relaxed text-muted"
          >
            <span className="mr-2 font-mono text-xs text-accent">
              {String(active + 1).padStart(2, '0')}/{String(NODES.length).padStart(2, '0')}
            </span>
            {NODES[active].desc}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}
