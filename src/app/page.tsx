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
    id: "free",
    num: "I",
    title: "Free",
    preview:
      "The cold wind on my face, the star studded sky. The endless broad roads. The bright street lights…",
    body: `The cold wind on my face,
the star studded sky.
The endless broad roads.
The bright street lights.

It is freedom that I yearn.
Like the birds I idolize.
The heart beats to drums of liberation.
I dance with the mice.

It is going to be hard.
But it is going to be free.
It will not be much.
But I will be free.

After all life is spent.
If someone asks, "Who was he?"
Then let the name be faded.
Say three words: He was free.`,
  },
  {
    id: "ink",
    num: "II",
    title: "Red Ink",
    preview:
      "What use are these words I write, when they no longer spell your name…",
    body: `What use are these words I write,
when they no longer spell your name.

And if it does not bring you closer,
then why would I even bother playing my game?

This open field you're hiding in,
holds that in which I cannot see myself within.

No god could return you to me,
so why shy away from giving in to the sins?

These hands in which I hold the world,
why would they hold anything
if you do not hold them anymore?

This reality in which we are not together,
why bother saving it from the gore?

Now that you're ignorant to my existence,
what would I do with my fame?

Tell me, why do I keep spilling
this red ink on the paper,
knowing that all the letters in my world
will never be able to spell your name.`,
  },
  {
    id: "stranger",
    num: "III",
    title: "Stranger",
    preview:
      "It's strange the way times change, and stranger the way people do…",
    body: `It's strange the way times change
and stranger the way people do.
Stranger still would be your disbelief
if I came over and said I love you.

You shamed me like I had always been hunting
a prey on the run.
You poured the oil and you lit the spark
then blamed me for the bridges I burned.

You went so quickly so far away
it hadn't even been one day.
It made sense that you stopped having fun,
when I realised it was because of a third one.

You pushed me away
as if I was nothing more than a fling.
And if you always cared for me so little
that I cannot now dare call it love,
then tell me one thing:

If you could not love me
when I loved you like I did,
then why did you hate me
when I treated you like you did.`,
  },
  {
    id: "dream",
    num: "IV",
    title: "Dream",
    preview:
      "I showed her the sight of the stars, she said the bright blue sky looks so much more clean…",
    body: `I showed her the sight of the stars,
she said the bright blue sky looks so much more clean.

And before I could tell her
we grew old together — her, in mine —
she said it's been years
since she even had a dream.`,
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
