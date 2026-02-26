import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const PHASE_MS = 3800

const PHASES = [
  { id: 'read',    label: 'Reading code' },
  { id: 'cloud',   label: 'Cloud setup'  },
  { id: 'deploy',  label: 'Deploying'    },
  { id: 'live',    label: 'Live'         },
]

const FILES = ['App.jsx', 'server.js', 'database.js', 'package.json', '.env.example']

const CLOUD_CARDS = [
  { label: 'Web App',    delay: 0    },
  { label: 'API Server', delay: 0.18 },
  { label: 'Database',   delay: 0.36 },
  { label: 'CDN',        delay: 0.54 },
  { label: 'SSL',        delay: 0.72 },
  { label: 'Domain',     delay: 0.90 },
]

const DEPLOY_STEPS = [
  { label: 'Build complete',           delay: 0.2 },
  { label: 'Environment configured',   delay: 0.7 },
  { label: 'Domain connected',         delay: 1.2 },
  { label: 'SSL active',               delay: 1.7 },
]

const BAR_HEIGHTS = [42, 65, 38, 74, 55, 82, 44, 68, 50, 77, 41, 70, 57, 80, 46, 63, 52, 75, 48, 71]

// ── Phase panels ────────────────────────────────────────────────────────────

function ReadPanel() {
  return (
    <div className="hiw-vis-panel">
      <div className="hiw-vis-sidebar">
        <div className="hiw-vis-sidebar-title">Your repo</div>
        {FILES.map((f, i) => (
          <motion.div
            key={f}
            className="hiw-vis-file"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.14 }}
          >
            <motion.span
              className="hiw-vis-icon-green"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.14 + 0.25 }}
            >✓</motion.span>
            {f}
          </motion.div>
        ))}
      </div>

      <div className="hiw-vis-code-wrap">
        <div className="hiw-vis-scanner" />
        <div className="hiw-vis-code-lines">
          {[80, 55, 90, 45, 70, 35, 85, 60].map((w, i) => (
            <div key={i} className="hiw-vis-code-line" style={{ width: `${w}%`, animationDelay: `${i * 0.06}s` }} />
          ))}
        </div>
        <div className="hiw-vis-code-output">
          {[
            { text: 'React + Node.js detected',  delay: 0.4  },
            { text: 'PostgreSQL database found',  delay: 0.9  },
            { text: '3 API routes mapped',        delay: 1.4  },
          ].map(({ text, delay }) => (
            <motion.div key={text} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay }}>
              <span className="hiw-vis-icon-green">✓</span> {text}
            </motion.div>
          ))}
          <motion.div className="hiw-vis-scanning-line" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }}>
            <span className="hiw-vis-pulse-dot" /> Building cloud plan…
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function CloudPanel() {
  return (
    <div className="hiw-vis-panel hiw-vis-panel--centered">
      <div className="hiw-vis-cloud-grid">
        {CLOUD_CARDS.map(({ label, delay }) => (
          <motion.div
            key={label}
            className="hiw-vis-cloud-card"
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay, duration: 0.28 }}
          >
            <motion.span
              className="hiw-vis-cloud-check"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: delay + 0.28 }}
            >✓</motion.span>
            {label}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function DeployPanel() {
  return (
    <div className="hiw-vis-panel hiw-vis-panel--col">
      <div className="hiw-vis-url-bar">
        <span>🔒</span>
        <span>your-app.joinanvil.ai</span>
        <motion.span
          className="hiw-vis-going-live"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >Going live…</motion.span>
      </div>

      <div className="hiw-vis-progress-track">
        <motion.div
          className="hiw-vis-progress-fill"
          initial={{ width: '0%' }}
          animate={{ width: '88%' }}
          transition={{ duration: 2.8, ease: 'easeOut' }}
        />
      </div>

      <div className="hiw-vis-deploy-steps">
        {DEPLOY_STEPS.map(({ label, delay }) => (
          <motion.div
            key={label}
            className="hiw-vis-deploy-step"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
          >
            <span className="hiw-vis-icon-green">✓</span> {label}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function LivePanel() {
  return (
    <div className="hiw-vis-panel hiw-vis-panel--col">
      <div className="hiw-vis-live-header">
        <span className="hiw-vis-live-dot" />
        <span className="hiw-vis-live-label">Live</span>
        <span className="hiw-vis-live-url">your-app.joinanvil.ai</span>
      </div>

      <div className="hiw-vis-stats-row">
        {[['99.9%', 'Uptime'], ['142ms', 'Response'], ['0', 'Incidents']].map(([val, lbl]) => (
          <motion.div key={lbl} className="hiw-vis-stat-card" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="hiw-vis-stat-val">{val}</div>
            <div className="hiw-vis-stat-lbl">{lbl}</div>
          </motion.div>
        ))}
      </div>

      <div className="hiw-vis-chart">
        {BAR_HEIGHTS.map((h, i) => (
          <motion.div
            key={i}
            className="hiw-vis-bar"
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ delay: i * 0.04, duration: 0.35, ease: 'easeOut' }}
          />
        ))}
      </div>
    </div>
  )
}

const PANELS = [ReadPanel, CloudPanel, DeployPanel, LivePanel]

// ── Main component ───────────────────────────────────────────────────────────

export default function HowItWorksVisual() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setPhase(p => (p + 1) % PHASES.length), PHASE_MS)
    return () => clearInterval(t)
  }, [])

  const Panel = PANELS[phase]

  return (
    <motion.div
      className="hiw-vis-wrap"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
    >
      {/* Phase tabs */}
      <div className="hiw-vis-tabs">
        {PHASES.map((p, i) => (
          <button
            key={p.id}
            className={`hiw-vis-tab${phase === i ? ' hiw-vis-tab--on' : ''}${i < phase ? ' hiw-vis-tab--done' : ''}`}
            onClick={() => setPhase(i)}
          >
            <span className="hiw-vis-tab-num">{i < phase ? '✓' : `0${i + 1}`}</span>
            {p.label}
          </button>
        ))}
        <motion.div
          className="hiw-vis-tab-bar"
          animate={{ left: `${(phase / PHASES.length) * 100}%`, width: `${100 / PHASES.length}%` }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
      </div>

      {/* Auto-progress strip */}
      <div className="hiw-vis-progress-track hiw-vis-progress-track--top">
        <motion.div
          key={phase}
          className="hiw-vis-progress-fill hiw-vis-progress-fill--auto"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: PHASE_MS / 1000, ease: 'linear' }}
        />
      </div>

      {/* Animated panel */}
      <div className="hiw-vis-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            className="hiw-vis-panel-wrap"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            <Panel />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Preview section */}
      <div className="hiw-vis-preview">
        <div className="hiw-vis-preview-eyebrow">
          <span className="hiw-vis-preview-icon">👁</span>
          Preview before going live
          <span className="hiw-vis-preview-badge">Optional</span>
        </div>
        <p className="hiw-vis-preview-desc">
          Before your app goes public you get a private link — a full working copy only you can see.
          Test every feature, share it with your team, and flip to live in one click when you&rsquo;re ready.
          Nothing goes live until you give the green light.
        </p>
      </div>
    </motion.div>
  )
}
