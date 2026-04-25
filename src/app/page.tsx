import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Marquee } from "@/components/marquee"
import { About } from "@/components/about"
import { Projects, type Project } from "@/components/projects"
import { Poems, type Poem } from "@/components/poems"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

const projects: Project[] = [
  {
    id: "interview",
    num: "01",
    title: "Smart Interview\nAssistant",
    blurb:
      "An AI that listens, transcribes, and whispers context-aware suggestions — turning every conversation into a calmer one.",
    tags: ["GenAI", "NLP", "Next.js", "Gemini"],
    visual: "orb",
    kind: "ai",
    featured: true,
    liveUrl: "https://ai-interview-eta-indol.vercel.app/",
  },
  {
    id: "speakgenie",
    num: "02",
    title: "SpeakGenie",
    blurb:
      "Personalized language learning that listens like a human, corrects like a friend, and remembers like a coach.",
    tags: ["AI", "Language", "Voice"],
    visual: "mic",
    kind: "ai",
    liveUrl: "https://speak-genie-five.vercel.app/",
  },
  {
    id: "pamodoro",
    num: "03",
    title: "Pamodoro",
    blurb:
      "A focus timer with a poet's restraint — twenty-five minutes of stillness, five minutes of breath.",
    tags: ["Next.js", "TypeScript", "CSS"],
    visual: "clock",
    kind: "frontend",
    liveUrl: "https://pamodoro-timer.vercel.app/",
    repoUrl: "https://github.com/Siddamnn/Pamodoro-timer",
  },
  {
    id: "echoes",
    num: "04",
    title: "Echoes\nof You",
    blurb:
      "A confessional little app that listens back — voice memos rewritten as quiet, looping verses.",
    tags: ["Next.js", "Tailwind", "Spotify API"],
    visual: "waves",
    kind: "frontend",
    liveUrl: "https://echoes-of-you.vercel.app/",
    repoUrl: "https://github.com/Siddamnn/Echoes-of-You",
  },
  {
    id: "rainy",
    num: "05",
    title: "Rainy\nWindows",
    blurb:
      "Lo-fi rain on glass, generative and gentle. A browser tab to put the world on pause.",
    tags: ["React", "Next.js", "TypeScript"],
    visual: "rain",
    kind: "frontend",
    liveUrl: "https://rainy-windows-dashboard.vercel.app/",
  },
  {
    id: "flow",
    num: "06",
    title: "React-Flow",
    blurb:
      "Node-based diagrams that snap, drag, and connect. Logic made visible, made beautiful.",
    tags: ["React", "TypeScript", "SVG"],
    visual: "flow",
    kind: "frontend",
    liveUrl: "https://react-flow-ebon.vercel.app/",
  },
]

const poems: Poem[] = [
  {
    id: "neon",
    num: "I",
    title: "Neon Heartbeat",
    preview:
      "The night hums in fluorescent breath, every street a half-finished sentence, every window a paragraph aglow…",
    body: `The night hums in fluorescent breath,
every street a half-finished sentence,
every window a paragraph aglow.

I wear the dark like a borrowed jacket —
two sizes too large, the pockets full
of someone else's loose change and longing.

A slow neon heartbeat keeps the time,
out of step with the clocks I own,
in tune with the ones I don't.

I am twenty-something and lit from within,
a small lamp on a long quiet road,
flickering, flickering, alive.`,
  },
  {
    id: "letters",
    num: "II",
    title: "Letters to No One",
    preview:
      "There is a kind of ache the late hour sings — gentle, dim-lit, half-remembered, like a love letter from no one in particular…",
    body: `There is a kind of ache the late hour sings —
gentle, dim-lit, half-remembered,
like a love letter from no one in particular.

The rooftops hold their breath above the noise,
the trees lean in, listening,
the moon a coin pressed flat against the dark.

You are somewhere in this map,
a pin I keep meaning to drop,
a route I keep almost taking.

Night is just a verb here.
We do it together, even when we are alone.`,
  },
  {
    id: "echoes-poem",
    num: "III",
    title: "Echoes",
    preview:
      "I called your name once, into the dark, and the dark — being polite — gave it back to me, three times softer…",
    body: `I called your name once, into the dark,
and the dark — being polite —
gave it back to me, three times softer.

Now I keep the syllables in my coat pocket
next to the ticket stub from a film
neither of us finished watching.

The dark does this for everyone, I'm told.
Holds onto the things we couldn't carry,
hums them back when the wind is right.

I am learning the difference
between a place that listens
and a place that simply doesn't argue.`,
  },
]

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Projects projects={projects} />
        <Poems poems={poems} />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
