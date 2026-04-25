export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="brand-mark">SIDS</div>
      <div>© {year} Sid&apos;s Starlit Stage · All rights reserved</div>
      <div>Built with care · ★</div>
    </footer>
  )
}
