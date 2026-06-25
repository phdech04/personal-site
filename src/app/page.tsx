'use client'

import { useEffect, useState } from 'react'

const links = {
  github: 'https://github.com/phdech04',
  linkedin: 'https://linkedin.com/in/phdech',
  email: 'mailto:dchaba@uwaterloo.ca',
}

const NAME = 'Phemo Den Chaba'
const GLYPHS = '×÷∑∫π∂√%+−=≈≠∞λΣ'

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
  const [name, setName] = useState(NAME)

  // Resolve the name out of cycling mathematical symbols on load.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setName(NAME)
      return
    }
    const chars = NAME.split('')
    const settle = chars.map((c, i) => (c === ' ' ? 0 : 16 + i * 5))
    const end = Math.max(...settle) + 1
    let frame = 0
    let raf = 0
    const step = () => {
      frame += 1
      const out = chars
        .map((c, i) => {
          if (c === ' ') return ' '
          if (frame >= settle[i]) return c
          return GLYPHS[(frame * 3 + i * 7) % GLYPHS.length]
        })
        .join('')
      setName(out)
      if (frame < end) raf = requestAnimationFrame(step)
      else setName(NAME)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
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
    <div className="page">
      <div className="grid-overlay" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <main>
        {/* ── Hero ── */}
        <header className="hero">
          <p className="eyebrow hero-load" style={{ animationDelay: '0.05s' }}>
            <span className="dot" /> Mathematics · Quantitative Finance · ML
          </p>
          <h1
            className="hero-title hero-load"
            style={{ animationDelay: '0.12s' }}
            aria-label={NAME}
          >
            {(() => {
              const words = name.split(' ')
              const lines =
                words.length > 1
                  ? [words[0], words.slice(1).join(' ')]
                  : words
              return lines.map((line, i) => (
                <span className="title-line" key={i}>
                  {line}
                </span>
              ))
            })()}
          </h1>

          <div className="lede hero-load" style={{ animationDelay: '0.22s' }}>
            <p className="signature">
              <em>It&rsquo;s always mathematical.</em>
            </p>
            <p>
              I study Mathematical Finance and Applied Mathematics at Waterloo,
              with a focus on machine learning.
            </p>
            <p>I build systems that survive contact with the real world.</p>
          </div>

          <nav className="hero-links hero-load" style={{ animationDelay: '0.3s' }}>
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
              The curiosity hasn&rsquo;t changed since I first got hooked on the
              Fibonacci sequence — only the toolkit has. These days I work where
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
