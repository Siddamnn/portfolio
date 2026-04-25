"use client"

import { useEffect, useState } from "react"

export type ProjectVisualKind = "orb" | "mic" | "clock" | "waves" | "rain" | "flow"
export type ProjectKind = "ai" | "frontend"
type Filter = "all" | ProjectKind
type LayoutClass = "featured" | "span6" | undefined

export type Project = {
  id: string
  num: string
  title: string
  blurb: string
  tags: string[]
  visual: ProjectVisualKind
  kind: ProjectKind
  featured?: boolean
  liveUrl?: string
  repoUrl?: string
}

function ClockVisual() {
  const [time, setTime] = useState("25:00")
  useEffect(() => {
    let s = 25 * 60
    const id = setInterval(() => {
      s = s > 0 ? s - 1 : 25 * 60
      const m = String(Math.floor(s / 60)).padStart(2, "0")
      const ss = String(s % 60).padStart(2, "0")
      setTime(`${m}:${ss}`)
    }, 1000)
    return () => clearInterval(id)
  }, [])
  return <div className="viz-clock">{time}</div>
}

function WavesVisual() {
  const [bars, setBars] = useState<{ h: number; delay: number; duration: number }[]>([])
  useEffect(() => {
    setBars(
      Array.from({ length: 40 }, (_, i) => ({
        h: 60 + Math.sin(i * 0.45) * 25 + Math.random() * 15,
        delay: -Math.random() * 1.6,
        duration: 0.6 + Math.random() * 0.6,
      })),
    )
  }, [])
  return (
    <div className="viz-waves">
      {bars.map((b, i) => (
        <span
          key={i}
          style={{
            height: `${b.h}%`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

function FlowVisual() {
  const nodes: [number, number, string][] = [
    [30, 30, "#9b5cff"],
    [100, 70, "#ff2d8b"],
    [170, 110, "#9b5cff"],
    [170, 30, "#00e5ff"],
  ]
  return (
    <svg viewBox="0 0 200 140" className="viz-flow-svg">
      <defs>
        <filter id="proj-flow-glow">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M 30 30 Q 80 30, 100 70 T 170 110"
        stroke="#9b5cff"
        strokeWidth="1.5"
        fill="none"
        filter="url(#proj-flow-glow)"
      />
      <path
        d="M 30 30 Q 80 30, 100 70 T 170 30"
        stroke="#00e5ff"
        strokeWidth="1.5"
        fill="none"
        opacity="0.7"
      />
      {nodes.map(([x, y, c], i) => (
        <g key={i}>
          <rect
            x={x - 14}
            y={y - 9}
            width="28"
            height="18"
            rx="3"
            fill="#0d0b18"
            stroke={c}
            strokeWidth="1.2"
            filter="url(#proj-flow-glow)"
          />
          <circle cx={x - 14} cy={y} r="2" fill={c} />
          <circle cx={x + 14} cy={y} r="2" fill={c} />
        </g>
      ))}
    </svg>
  )
}

function VisualInner({ kind }: { kind: ProjectVisualKind }) {
  switch (kind) {
    case "orb":
      return (
        <>
          <div className="viz-rings" />
          <div className="viz-orb" />
        </>
      )
    case "mic":
      return <div className="viz-mic" />
    case "clock":
      return <ClockVisual />
    case "waves":
      return <WavesVisual />
    case "rain":
      return <div className="viz-rain" />
    case "flow":
      return <FlowVisual />
  }
}

function ProjectVisual({ kind }: { kind: ProjectVisualKind }) {
  return (
    <>
      <div className="viz-grid" />
      <VisualInner kind={kind} />
    </>
  )
}

function layoutFor(index: number, total: number): LayoutClass {
  if (index === 0) return "featured"
  if (index === total - 1 && (total - 1) % 3 === 1) return "span6"
  return undefined
}

function ProjectCard({ p, layout }: { p: Project; layout: LayoutClass }) {
  const href = p.liveUrl || p.repoUrl || "#"
  const external = Boolean(p.liveUrl || p.repoUrl)
  const className = layout ? `project-card ${layout}` : "project-card"
  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <div className="glow a" />
      <div className="glow b" />
      <div className="project-num">
        <span>
          {p.num} / {p.featured ? "FEATURED" : "PROJECT"}
        </span>
        <span className="arrow">↗</span>
      </div>
      <div className="visual">
        <ProjectVisual kind={p.visual} />
      </div>
      <h3 className="project-title">{p.title}</h3>
      <p className="blurb">{p.blurb}</p>
      <div className="tags">
        {p.tags.map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>
    </a>
  )
}

export function Projects({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all")

  const counts = projects.reduce(
    (acc, p) => {
      acc[p.kind]++
      return acc
    },
    { ai: 0, frontend: 0 } as Record<ProjectKind, number>,
  )

  const visible = filter === "all" ? projects : projects.filter((p) => p.kind === filter)

  const filters: { id: Filter; label: string; n: number }[] = [
    { id: "all", label: "All", n: projects.length },
    { id: "ai", label: "AI", n: counts.ai },
    { id: "frontend", label: "Frontend", n: counts.frontend },
  ]

  return (
    <section className="wrap" id="projects">
      <div className="section-rule">
        <span className="num">/02</span>
        <span>Selected Work</span>
        <span className="line" />
        <span>2023 — 2026</span>
      </div>
      <div className="projects-head">
        <h2>
          Things I&apos;ve<br />
          <span className="it">made &amp;</span> shipped.
        </h2>
        <div className="filter-bar" role="tablist">
          {filters.map((t) => (
            <button
              key={t.id}
              className={filter === t.id ? "active" : ""}
              onClick={() => setFilter(t.id)}
            >
              {t.label}
              <span className="count">{String(t.n).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="projects-grid">
        {visible.map((p, i) => (
          <ProjectCard key={p.id} p={p} layout={layoutFor(i, visible.length)} />
        ))}
      </div>
    </section>
  )
}
