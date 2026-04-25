"use client"

import { useEffect, useState } from "react"

export type Poem = {
  id: string
  num: string
  title: string
  preview: string
  body: string
}

export function Poems({ poems }: { poems: Poem[] }) {
  const [openId, setOpenId] = useState<string | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const active = poems.find((p) => p.id === openId)

  return (
    <section className="wrap poems-section" id="poems">
      <div className="section-rule">
        <span className="num">/03</span>
        <span>Starlit Verses</span>
        <span className="line" />
        <span>{String(poems.length).padStart(2, "0")} Poems</span>
      </div>
      <div className="poems-head">
        <h2>
          Verses for the<br />
          <span className="it">small, late</span> hours.
        </h2>
        <p className="lede">
          A few poems written between commits, under the neon glow of monitors
          and starlit skies. Click one to sit with it a while.
        </p>
      </div>
      <div className="poem-grid">
        {poems.map((p) => (
          <article
            key={p.id}
            className="poem"
            onClick={() => setOpenId(p.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setOpenId(p.id)
            }}
          >
            <div>
              <div className="num">PART {p.num}</div>
              <h3>{p.title}</h3>
              <div className="preview">{p.preview}</div>
            </div>
            <div className="read">Read in full</div>
          </article>
        ))}
      </div>

      <div
        className={`poem-modal-bg ${active ? "open" : ""}`}
        onClick={() => setOpenId(null)}
      >
        {active && (
          <div className="poem-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="close"
              onClick={() => setOpenId(null)}
              aria-label="Close poem"
            >
              ×
            </button>
            <div className="num">PART {active.num}</div>
            <h3>{active.title}</h3>
            <div className="body">{active.body}</div>
          </div>
        )}
      </div>
    </section>
  )
}
