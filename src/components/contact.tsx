const SOCIALS: { label: string; href: string; external?: boolean }[] = [
  { label: "GitHub", href: "https://github.com/Siddamnn", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/siddharth-bhardwaj-tug/", external: true },
  { label: "Instagram", href: "https://www.instagram.com/_siddamn/", external: true },
  { label: "Email", href: "mailto:siddharth0996@outlook.com" },
]

export function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-eyebrow">★ Get In Touch</div>
      <h2>
        Let&apos;s make<br />
        <span className="it">something</span> together.
      </h2>
      <p className="sub">
        Have a project in mind, a question, or just want to say hi? My inbox
        is always open and I&apos;m always listening.
      </p>
      <a href="mailto:siddharth0996@outlook.com" className="cta-button">
        Send a message
        <span className="arrow">→</span>
      </a>
      <div className="socials">
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {s.label}
          </a>
        ))}
      </div>
    </section>
  )
}
