import { SiteLogo } from "./site-logo"

export function Footer() {
  return (
    <footer className="py-8 bg-gradient-to-t from-accent/80 to-accent">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6 group/footer">
        <SiteLogo isHoverFlicker={true} />
        <p className="text-accent-foreground/80 text-sm text-center md:text-right">
          &copy; {new Date().getFullYear()} Sid's Starlit Stage. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
