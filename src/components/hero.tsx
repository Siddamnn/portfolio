const WINDOW_COLORS = ["#ffb84d", "#ffb84d", "#ffb84d", "#fff5b8", "#ff2d8b", "#00e5ff"]
const WINDOW_DOTS = Array.from({ length: 60 }, (_, i) => ({
  x: (i * 137) % 1600,
  y: 200 + ((i * 91) % 180),
  fill: WINDOW_COLORS[i % WINDOW_COLORS.length],
  opacity: 0.5 + ((i * 13) % 50) / 100,
}))

function Skyline() {
  return (
    <svg
      className="hero-skyline"
      viewBox="0 0 1600 400"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bld" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0820" />
          <stop offset="100%" stopColor="#000" />
        </linearGradient>
      </defs>
      <g opacity="0.5" fill="#1a0d2a">
        <polygon points="0,400 0,260 60,260 60,220 120,220 120,250 200,250 200,180 280,180 280,240 360,240 360,200 460,200 460,260 540,260 540,210 620,210 620,250 720,250 720,220 800,220 800,260 900,260 900,200 1000,200 1000,250 1100,250 1100,180 1200,180 1200,230 1320,230 1320,200 1420,200 1420,250 1520,250 1520,220 1600,220 1600,400" />
      </g>
      <g fill="#0a0820">
        <polygon points="0,400 0,300 80,300 80,260 160,260 160,290 240,290 240,230 320,230 320,280 400,280 400,250 480,250 480,290 560,290 560,260 640,260 640,200 720,200 720,150 760,150 760,200 820,200 820,250 900,250 900,220 1000,220 1000,280 1080,280 1080,240 1180,240 1180,270 1280,270 1280,230 1380,230 1380,280 1480,280 1480,250 1600,250 1600,400" />
      </g>
      <g fill="url(#bld)">
        <polygon points="0,400 0,340 100,340 100,310 200,310 200,330 320,330 320,280 420,280 420,310 540,310 540,270 640,270 640,200 720,200 720,180 800,180 800,260 920,260 920,300 1040,300 1040,270 1180,270 1180,310 1300,310 1300,280 1420,280 1420,320 1540,320 1540,300 1600,300 1600,400" />
      </g>
      {WINDOW_DOTS.map((d, i) => (
        <rect key={i} x={d.x} y={d.y} width="2" height="3" fill={d.fill} opacity={d.opacity} />
      ))}
    </svg>
  )
}

export function Hero() {
  return (
    <header className="hero" id="hero">
      <div className="hero-sky" />
      <div className="hero-stars" />
      <Skyline />
      <div className="hero-content">
        <div className="hero-meta">
          <div className="col">
            <span className="k">Disciplines</span>
            Frontend · AI · Blockchain · Verse
          </div>
          <div className="col">
            <span className="k">Status</span>
            Open to collabs · Available now
          </div>
          <div className="col">
            <span className="k">Index</span>
            06 Projects · 04 Verses · ∞ Ideas
          </div>
        </div>
        <h1 className="hero-title">
          Sid<span className="note" aria-hidden="true">♪</span>s<br />
          <span className="accent">starlit</span>
          <span className="ampersand"> &amp; </span>
          neon<br />
          stage.
        </h1>
        <div className="hero-tag">
          <p className="lede">
            Frontend, AI, blockchain, and the occasional poem written under
            late-night fluorescents. A small portfolio of things made with care.
          </p>
          <div className="scroll">
            <span className="scroll-line" />
            <span>Scroll</span>
          </div>
        </div>
      </div>
    </header>
  )
}
