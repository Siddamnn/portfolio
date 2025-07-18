import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"

export function About() {
  return (
    <section id="about" className="py-20 lg:py-32">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl lg:text-5xl font-headline font-bold text-primary">About Me</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            I&apos;m Sid, a creative soul navigating the digital landscape where technology meets art. From crafting elegant frontend experiences and diving deep into the decentralized world of blockchain, to training AI models and penning starlit verses, I find joy in building beautiful and meaningful things. This is my stage, my neon dream, a collection of projects and poems from my journey so far.
          </p>
        </div>
        <div className="flex justify-center">
          <Card className="overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-105 hover:shadow-primary/20 -rotate-2 hover:rotate-0">
            <CardContent className="p-0">
              <Image
                src="/me.jpg"
                alt="Sid silhouette against LA skyline"
                width={600}
                height={800}
                className="w-full h-auto"
                data-ai-hint="silhouette man los angeles skyline"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
