import { HoverButton } from "@/components/ui/hover-button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Instagram, Mail } from 'lucide-react'
import Link from 'next/link'
import { Card } from "@/components/ui/card"

export function Contact() {
  return (
    <section id="contact" className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-4xl lg:text-5xl font-headline font-bold text-primary mb-4">Get In Touch</h2>
        <p className="text-lg text-muted-foreground mb-12">
          Have a project in mind, a question, or just want to say hi? My inbox is always open.
        </p>
        <Card className="text-left p-8 shadow-xl">
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input type="text" placeholder="Your Name" aria-label="Your Name" />
              <Input type="email" placeholder="Your Email" aria-label="Your Email" />
            </div>
            <Textarea placeholder="Your Message" rows={6} aria-label="Your Message" />
            <div className="text-right">
              <HoverButton type="submit">Send Message</HoverButton>
            </div>
          </form>
        </Card>
        <div className="mt-16">
          <p className="text-muted-foreground mb-4">Or connect with me here:</p>
          <div className="flex justify-center gap-6">
            {[
              { href: "https://www.linkedin.com/in/siddharth-bhardwaj-tug/", label: "LinkedIn", icon: <Linkedin size={28} />, external: true },
              { href: "https://github.com/Siddamnn", label: "GitHub", icon: <Github size={28} />, external: true },
              { href: "https://www.instagram.com/_siddamn/", label: "Instagram", icon: <Instagram size={28} />, external: true },
              { href: "mailto:siddharth0996@outlook.com", label: "Email", icon: <Mail size={28} />, external: false },
            ].map(({ href, label, icon, external }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
