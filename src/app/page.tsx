'use client'

import type { CSSProperties } from 'react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

// useLayoutEffect on the client, useEffect on the server (avoids SSR warning).
const useIso = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const links = {
  github: 'https://github.com/phdech04',
  linkedin: 'https://linkedin.com/in/phdech',
  email: 'mailto:dchaba@uwaterloo.ca',
}

const NAME = 'Phemo Den Chaba'
const GLYPHS = '×÷∑∫π∂√≈≠=λΣμθΩ∞∇'
const STMT = 'It’s always mathematical.'

// Deterministic pseudo-random in [0, 1) — stable across SSR + client.
const rand = (seed: number) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

// Per-letter pseudo-random fraction → name flips to real text in random order.
const FLIP_FRAC = NAME.split('').map((c, i) => (c === ' ' ? 0 : rand(i + 50)))

// Intro timeline (milliseconds). Order: type statement (big) → header appears
// at normal size while it's still big → statement shrinks (slow) as paragraph +
// links slide up → small delay → name appears and resolves slowly.
const TYPE_PER = 62 // ms per typed character of the statement
const TYPE_DONE = STMT.length * TYPE_PER // statement fully typed
const HOLD = 500 // pause (caret blinking) after the period
const EYEBROW_AT = TYPE_DONE + HOLD // header fades in (normal size) while statement still big
const SHRINK_START = EYEBROW_AT + 800 // beat with the header showing, then shrink
const SHRINK_MS = 1350 // slower shrink-to-place
const NAME_START = SHRINK_START + SHRINK_MS + 250 // shorter delay, then the name resolves
const FLIP_BASE = NAME_START // first letters start flipping
const FLIP_SPAN = 1300 // gradual spread so it resolves seamlessly
const REVEAL = NAME_START + FLIP_SPAN + 150 // paragraph + links slide up AFTER the name resolves
const END = REVEAL + 900 // stop the clock
const SCALE = 1.6 // how much bigger the statement is while it types

const experience = [
  {
    role: 'Software Engineering Intern',
    company: 'Bitquark',
    when: 'Jan 2026 — Present',
    summary:
      'Building the frontend of a macOS productivity app from first commit to launch.',
    tags: ['Flutter', 'Swift', 'macOS', 'OAuth'],
  },
  {
    role: 'Software Engineering Intern',
    company: 'Gensona',
    when: 'Sep 2025 — Jan 2026',
    summary: 'Core engineer on an AI voice companion, shipped across web and iOS.',
    tags: ['Next.js', 'React', 'SwiftUI', 'Supabase'],
  },
]

const projects = [
  {
    name: 'Cross-ISO Power Spread Analyzer',
    blurb:
      'A quantitative spread-trading platform across all 8 North American power markets — regime detection, ML forecasting, and a Monte Carlo risk engine.',
    tags: ['Python', 'FastAPI', 'PyTorch', 'DuckDB', 'hmmlearn'],
    href: 'https://github.com/phdech04/power-spread-analyzer',
    badge: 'Quant',
  },
  {
    name: 'Quant Factor Research Platform',
    blurb:
      'An agentic research loop that reads finance papers, extracts factor hypotheses, and writes the code to test them against decades of market history.',
    tags: ['Python', 'LangGraph', 'Anthropic', 'Statsmodels', 'Parquet'],
    href: 'https://github.com/phdech04/quant-factor-research',
    badge: 'Quant',
  },
  {
    name: 'Teemane — Neural Chess Engine',
    blurb:
      'A chess engine that learns: a custom ResNet with policy and value heads, trained on millions of grandmaster games and paired with Monte Carlo Tree Search.',
    tags: ['Python', 'PyTorch', 'FastAPI', 'Next.js'],
    href: 'https://github.com/phdech04',
    badge: 'Solo hackathon',
  },
  {
    name: 'PassePartout — EarSightAI',
    blurb:
      'A browser-based, audio-first tour guide that narrates location-specific facts in real time, routing you through a city as it talks.',
    tags: ['FastAPI', 'MongoDB', 'React', 'Leaflet', 'LLM'],
    href: 'https://github.com/ericnem/PassePartout',
    badge: 'Team hackathon',
  },
  {
    name: 'LLM Database Query Assistant',
    blurb:
      'Ask a database questions in plain English and get back SQL or MongoDB queries, with explanations. Schema-aware and multi-database.',
    tags: ['FastAPI', 'PostgreSQL', 'MongoDB', 'LLM'],
    href: 'https://github.com/phdech04/llm-query-assistant',
    badge: null,
  },
  {
    name: 'Semantic Search API',
    blurb:
      'Search research papers by meaning, not keywords — natural-language queries over a corpus using deep-learning embeddings.',
    tags: ['Python', 'Embeddings', 'FastAPI'],
    href: 'https://github.com/phdech04/semantic-search-api',
    badge: null,
  },
]

export default function Home() {
  // Elapsed intro time in ms. Start at END so SSR / no-JS shows the final page.
  const [t, setT] = useState(END)
  // Translate (px) that places the big statement at screen-center while typing.
  const [morph, setMorph] = useState({ tx: 0, ty: 0 })
  const sigRef = useRef<HTMLElement>(null)

  // Drive the intro: clear the flash gate, measure the statement's resting
  // spot, then run the clock (type → shrink to place → name resolves → reveal).
  useIso(() => {
    document.documentElement.setAttribute('data-intro', 'on')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setT(END)
      return
    }
    const el = sigRef.current
    if (el) {
      const r = el.getBoundingClientRect()
      setMorph({
        tx: window.innerWidth / 2 - (r.width * SCALE) / 2 - r.left,
        ty: window.innerHeight / 2 - (r.top + r.height / 2),
      })
    }
    setT(0)
    const start = performance.now()
    let raf = 0
    const step = () => {
      const e = performance.now() - start
      setT(e)
      if (e < END) raf = requestAnimationFrame(step)
      else setT(END)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  const typing = t < SHRINK_START
  const eyebrowShown = t >= EYEBROW_AT
  const revealed = t >= REVEAL
  const nameShown = t >= NAME_START
  const typedCount = typing
    ? Math.min(STMT.length, Math.floor(t / TYPE_PER))
    : STMT.length

  // The statement morph: big & centered while typing, then shrinks to place.
  const sigStyle: CSSProperties = {
    transform: typing
      ? `translate(${morph.tx}px, ${morph.ty}px) scale(${SCALE})`
      : 'none',
    transition: typing ? 'none' : `transform ${SHRINK_MS}ms var(--ease)`,
  }

  // Render one name character: a placeholder symbol, then flip to the letter.
  const renderChar = (i: number) => {
    const c = NAME[i]
    if (c === ' ') return <span key={i}>{' '}</span>
    const flipTime = FLIP_BASE + FLIP_FRAC[i] * FLIP_SPAN
    if (t < flipTime) {
      const glyph = GLYPHS[(Math.floor(t / 150) + i * 3) % GLYPHS.length]
      return (
        <span key={i} className="ch-symbol">
          {glyph}
        </span>
      )
    }
    return (
      <span key={i} className="ch-flip">
        {c}
      </span>
    )
  }

  // A line is fully resolved once all its letters have flipped.
  const lineResolved = (start: number, len: number) => {
    for (let k = 0; k < len; k += 1) {
      const i = start + k
      if (NAME[i] === ' ') continue
      if (t < FLIP_BASE + FLIP_FRAC[i] * FLIP_SPAN) return false
    }
    return true
  }

  // While resolving: per-letter spans. Once resolved: one contiguous span so a
  // script font's letters connect properly.
  const renderLine = (start: number, len: number) =>
    lineResolved(start, len) ? (
      <span>{NAME.slice(start, start + len)}</span>
    ) : (
      Array.from({ length: len }, (_, k) => renderChar(start + k))
    )

  const breakAt = NAME.indexOf(' ')
  const line1 = renderLine(0, breakAt)
  const line2 = renderLine(breakAt + 1, NAME.length - breakAt - 1)

  // Reveal-on-scroll for elements marked [data-reveal].
  // The hidden initial state is gated behind `.reveal-ready`, which is only
  // added here — so if JS never runs, all content stays fully visible.
  useEffect(() => {
    const root = document.documentElement
    root.classList.add('reveal-ready')
    const els = Array.from(document.querySelectorAll('[data-reveal]'))
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="page">
      <div className="grid-overlay" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <main>
        {/* ── Hero ── */}
        <header className="hero">
          <p
            className="eyebrow"
            style={{
              opacity: eyebrowShown ? 1 : 0,
              transform: eyebrowShown ? 'none' : 'translateY(10px)',
              transition:
                'opacity 0.7s var(--ease), transform 0.7s var(--ease)',
            }}
          >
            Mathematics · Quantitative Finance · ML
          </p>
          <h1
            className="hero-title"
            aria-label={NAME}
            style={{
              opacity: nameShown ? 1 : 0,
              transition: 'opacity 0.9s var(--ease)',
            }}
          >
            <span className="title-line">{line1}</span>
            <span className="title-line">{line2}</span>
          </h1>

          <p className="signature">
            <em ref={sigRef} style={sigStyle}>
              {STMT.slice(0, typedCount)}
              {typing && <span className="caret" aria-hidden="true" />}
            </em>
          </p>

          <div
            className="lede-rest"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'none' : 'translateY(30px)',
              transition: 'opacity 0.8s var(--ease), transform 0.8s var(--ease)',
            }}
          >
            <p>
              I study Mathematical Finance and Applied Mathematics at Waterloo,
              with a focus on machine learning.
            </p>
            <p>I build systems that survive contact with the real world.</p>
          </div>

          <nav
            className="hero-links"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'none' : 'translateY(16px)',
              transition:
                'opacity 0.7s var(--ease) 0.12s, transform 0.7s var(--ease) 0.12s',
            }}
          >
            <a href={links.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={links.email}>Email</a>
          </nav>
        </header>

        {/* ── About ── */}
        <section className="section" data-reveal>
          <span className="section-index">01</span>
          <h2 className="section-title">About</h2>
          <div className="prose">
            <p>
              I grew up in Botswana, where I ranked first nationally out of more
              than 37,000 candidates and received the Presidential Award, before
              moving to Canada for Waterloo. Studying the same problems across two
              very different academic cultures is what makes the thinking richer.
            </p>
            <p>
              The curiosity hasn&rsquo;t changed since I first got hooked on
              coding — only the toolkit has. These days I work where
              quantitative finance meets machine learning, and I write research
              code with the same discipline I picked up shipping software to real
              users.
            </p>
          </div>
        </section>

        {/* ── Experience ── */}
        <section className="section" data-reveal>
          <span className="section-index">02</span>
          <h2 className="section-title">Experience</h2>
          <div className="timeline">
            {experience.map((job) => (
              <article className="job" key={job.company}>
                <div className="job-head">
                  <h3>
                    {job.role} <span className="job-company">· {job.company}</span>
                  </h3>
                  <span className="job-when">{job.when}</span>
                </div>
                <p className="job-summary">{job.summary}</p>
                <div className="tags">
                  {job.tags.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Projects ── */}
        <section className="section" data-reveal>
          <span className="section-index">03</span>
          <h2 className="section-title">Selected work</h2>
          <div className="projects">
            {projects.map((proj) => (
              <a
                className="card"
                key={proj.name}
                href={proj.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="card-top">
                  <h3>{proj.name}</h3>
                  <span className="card-meta">
                    {proj.badge && (
                      <span className="badge">{proj.badge}</span>
                    )}
                    <span className="card-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </span>
                </div>
                <p>{proj.blurb}</p>
                <div className="tags">
                  {proj.tags.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── Achievements ── */}
        <section className="section" data-reveal>
          <span className="section-index">04</span>
          <h2 className="section-title">Recognition</h2>
          <div className="awards">
            <div className="award">
              <h3>Presidential Award</h3>
              <p>
                Ranked 1st nationally in Botswana out of 37,629 BGCSE candidates.
              </p>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="footer" data-reveal>
          <p className="footer-line">Let&rsquo;s talk.</p>
          <div className="footer-links">
            <a href={links.email}>dchaba@uwaterloo.ca</a>
            <a href={links.github} target="_blank" rel="noopener noreferrer">
              github.com/phdech04
            </a>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
              linkedin.com/in/phdech
            </a>
          </div>
          <p className="footer-fine">
            Phemo Den Chaba · University of Waterloo · It&rsquo;s always
            mathematical.
          </p>
        </footer>
      </main>
    </div>
  )
}
