'use client'

import { useEffect, useRef } from 'react'

const links = {
  github: 'https://github.com/phdech04',
  linkedin: 'https://linkedin.com/in/phdech',
  email: 'mailto:dchaba@uwaterloo.ca',
}

const experience = [
  {
    role: 'Software Engineering Intern',
    company: 'Bitquark, Inc',
    place: 'San Francisco',
    when: 'Jan 2026 — Present',
    points: [
      'Leading frontend of a macOS productivity app from first commit to launch — a translucent overlay panel in Flutter with native Swift integration for window management and system-level interactions.',
      'Shipped calendar, contacts, and meeting-location features: event resizing, Google Calendar / OAuth, real-time routing, and Wi-Fi–based location.',
    ],
  },
  {
    role: 'Software Engineering Intern',
    company: 'Gensona, Inc',
    place: 'San Francisco',
    when: 'Sep 2025 — Jan 2026',
    points: [
      'Core engineer on a 4-person team building an AI voice-companion platform across web (Next.js, React) and native iOS (SwiftUI) — 581+ commits over four months.',
      'Owned the data layer end-to-end on Supabase PostgreSQL: schema design, migrations for rapid iteration, and the user-facing management UI.',
    ],
  },
]

const projects = [
  {
    name: 'Cross-ISO Power Spread Analyzer',
    blurb:
      'Institutional-grade spread-trading platform across all 8 North American ISOs. Cointegration testing, Ornstein–Uhlenbeck half-life estimation, HMM regime detection, and LSTM / Transformer forecasting, with a VaR/CVaR Monte Carlo risk engine over 10,000+ paths.',
    tags: ['Python', 'FastAPI', 'PyTorch', 'DuckDB', 'hmmlearn'],
    href: 'https://github.com/phdech04/power-spread-analyzer',
    badge: 'Quant',
  },
  {
    name: 'Quant Factor Research Platform',
    blurb:
      'Reproducible pipeline ingesting 2.87M stock-day rows into DuckDB / Parquet, plus an agentic loop (LangGraph + Claude) that reads arXiv papers, extracts factor hypotheses as JSON specs, and writes the pandas code to test them against history.',
    tags: ['Python', 'LangGraph', 'Anthropic', 'Statsmodels', 'Parquet'],
    href: 'https://github.com/phdech04/quant-factor-research',
    badge: 'Quant',
  },
  {
    name: 'Teemane — Neural Chess Engine',
    blurb:
      'A custom ResNet CNN with dual policy/value heads (4,544 move dimensions) trained on 52 GB of super-GM games, paired with Monte Carlo Tree Search for real-time inference. Data pipeline aggregating 5M+ PGN games into a cleaned 3.9 GB corpus.',
    tags: ['Python', 'PyTorch', 'FastAPI', 'Next.js'],
    href: 'https://github.com/phdech04',
    badge: 'Solo hackathon',
  },
  {
    name: 'PassePartout — EarSightAI',
    blurb:
      'A browser-based, audio-first tour guide that narrates location-specific facts in real time. Geospatial routing (OSRM, a TSP solver, OpenStreetMap) feeding an LLM narration pipeline. Built with a team.',
    tags: ['FastAPI', 'MongoDB', 'React', 'Leaflet', 'LLM/RAG'],
    href: 'https://github.com/ericnem/PassePartout',
    badge: 'Team hackathon',
  },
  {
    name: 'LLM Database Query Assistant',
    blurb:
      'Translates natural-language questions into SQL and MongoDB queries with human-readable explanations. Schema-aware and multi-database, served through a FastAPI backend.',
    tags: ['FastAPI', 'PostgreSQL', 'MongoDB', 'LLM'],
    href: 'https://github.com/phdech04/llm-query-assistant',
    badge: null,
  },
  {
    name: 'Semantic Search API',
    blurb:
      'End-to-end semantic search over research papers — query a corpus in natural language and retrieve the most relevant documents using deep-learning embeddings rather than keyword matching.',
    tags: ['Python', 'Embeddings', 'FastAPI'],
    href: 'https://github.com/phdech04/semantic-search-api',
    badge: null,
  },
]

const achievements = [
  {
    title: 'Presidential Award',
    detail: 'Ranked 1st nationally in Botswana out of 37,629 BGCSE candidates.',
  },
]

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null)

  // Pointer-following spotlight: write cursor position to CSS variables.
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    let frame = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        el.style.setProperty('--mx', `${e.clientX}px`)
        el.style.setProperty('--my', `${e.clientY}px`)
      })
    }
    window.addEventListener('pointermove', onMove)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  // Reveal-on-scroll for elements marked [data-reveal].
  useEffect(() => {
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
    <div className="page" ref={rootRef}>
      <div className="spotlight" aria-hidden="true" />
      <div className="grid-overlay" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <main>
        {/* ── Hero ── */}
        <header className="hero">
          <p className="eyebrow hero-load" style={{ animationDelay: '0.05s' }}>
            <span className="dot" /> Mathematics · Quantitative Finance · ML
          </p>
          <h1 className="hero-title hero-load" style={{ animationDelay: '0.12s' }}>
            Den
            <br />
            Chaba
          </h1>
          <p className="lede hero-load" style={{ animationDelay: '0.2s' }}>
            <em>It&rsquo;s always mathematical.</em> I study Mathematical Finance
            and Applied Mathematics at the University of Waterloo, and I build
            quantitative-trading platforms, factor-research engines, and AI
            systems that survive contact with real data.
          </p>
          <nav className="hero-links hero-load" style={{ animationDelay: '0.28s' }}>
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
              The curiosity has stayed the same since I first marvelled at the
              Fibonacci sequence; the toolkit has grown. Today that means
              replicating Fama–French momentum series to a 0.90 Pearson
              correlation, validating Newey–West standard errors to four decimal
              places, and writing research code with the same discipline I learned
              shipping software to real users.
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
                    {job.role}{' '}
                    <span className="job-company">· {job.company}</span>
                  </h3>
                  <span className="job-when">{job.when}</span>
                </div>
                <span className="job-place">{job.place}</span>
                <ul>
                  {job.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
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
                  {proj.badge && <span className="badge">{proj.badge}</span>}
                </div>
                <p>{proj.blurb}</p>
                <div className="tags">
                  {proj.tags.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
                <span className="card-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* ── Achievements ── */}
        <section className="section" data-reveal>
          <span className="section-index">04</span>
          <h2 className="section-title">Recognition</h2>
          <div className="awards">
            {achievements.map((a) => (
              <div className="award" key={a.title}>
                <h3>{a.title}</h3>
                <p>{a.detail}</p>
              </div>
            ))}
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
            Den Chaba · University of Waterloo · It&rsquo;s always mathematical.
          </p>
        </footer>
      </main>
    </div>
  )
}
