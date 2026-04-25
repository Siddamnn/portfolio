const ITEMS = [
  "AVAILABLE NOW · 2026",
  "★",
  "FRONTEND · AI · BLOCKCHAIN",
  "★",
  "WRITING POEMS BETWEEN COMMITS",
  "★",
  "OPEN TO COLLABS",
  "★",
  "BUILDING QUIET, BEAUTIFUL THINGS",
  "★",
]

const TRACK = [...ITEMS, ...ITEMS]

export function Marquee() {
  return (
    <div className="marquee">
      <div className="marquee-track">
        {TRACK.map((t, i) => (
          <span key={i} className={t === "★" ? "star" : ""}>
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
