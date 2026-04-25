import Image from "next/image"

export function About() {
  return (
    <section className="wrap" id="about">
      <div className="section-rule">
        <span className="num">/01</span>
        <span>About</span>
        <span className="line" />
        <span>SID DAMN</span>
      </div>
      <div className="about">
        <div className="about-text">
          <h2>
            Where<br />
            <span className="it">technology</span><br />
            meets<br />
            <span className="it">art.</span>
          </h2>
          <p>
            I&apos;m Sid — a creative soul navigating the digital landscape where
            <span className="em"> technology meets art</span>. From crafting
            elegant frontend experiences to diving into blockchain, training AI
            models, and penning starlit verses.
          </p>
          <p>
            This is my stage, my neon dream — a collection of projects and
            poems from a journey that&apos;s still very much in motion.
          </p>
        </div>
        <aside className="about-card">
          <div className="portrait">
            <Image
              src="/me.jpg"
              alt="Sid"
              fill
              sizes="(max-width: 880px) 100vw, 480px"
            />
          </div>
          <dl className="meta">
            <dt>Name</dt><dd>Sid</dd>
            <dt>Disciplines</dt><dd>FE · AI · Web3 · Verse</dd>
            <dt>Currently</dt><dd>Building &amp; writing</dd>
            <dt>Status</dt><dd>Open to collabs</dd>
          </dl>
        </aside>
      </div>
    </section>
  )
}
