import TiltedCard from "@/components/ui/tilted-card"

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
        <div className="flex justify-center items-center">
          <TiltedCard
            imageSrc="/me.jpg"
            altText="Sid silhouette against LA skyline"
            containerHeight="400px"
            containerWidth="300px"
            imageHeight="400px"
            imageWidth="300px"
            rotateAmplitude={12}
            scaleOnHover={1.1}
            displayOverlayContent={true}
            overlayContent={
              <div className="w-[300px] h-[400px] flex items-end justify-start p-6">
                <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-5 py-1.5 shadow-lg">
                  <h3 className="text-2xl font-headline font-bold text-white drop-shadow-lg">Sid</h3>
                </div>
              </div>
            }
          />
        </div>
      </div>
    </section>
  )
}
