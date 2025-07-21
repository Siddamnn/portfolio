import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Projects, type Project } from "@/components/projects"
import { Poems, type Poem } from "@/components/poems"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { Box } from "lucide-react"

const aiProjects: Project[] = [
  {
    title: "Poem Generator",
    description: "An AI that writes poetry in the style of various famous poets. This project uses generative models to create unique verses based on a given topic.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "abstract art poetry",
    tags: ["GenAI", "NLP", "Next.js"],
    liveUrl: "#poems",
  },
  {
    title: "Dream Interpreter",
    description: "A fun tool that provides whimsical interpretations of your dreams using a custom-trained language model. Enter your dream and see what it means.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "dream cloud abstract",
    tags: ["AI", "React", "Firebase"],
    repoUrl: "https://github.com",
  },
  {
    title: "Image Style Transfer",
    description: "Upload an image and have it repainted in the style of famous artists like Van Gogh or Picasso. Utilizes convolutional neural networks.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "style transfer art",
    tags: ["Computer Vision", "Python", "Flask"],
    liveUrl: "#",
  },
]

const blockchainProjects: Project[] = [
  {
    title: "Decentralized Voting",
    description: "A secure and transparent voting system built on the Ethereum blockchain. Each vote is a transaction, ensuring immutability and auditability.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "blockchain voting network",
    tags: ["Ethereum", "Solidity", "dApp"],
    repoUrl: "https://github.com",
    techIcon: <Box className="text-muted-foreground" />,
  },
  {
    title: "Supply Chain Tracker",
    description: "Tracking products from source to consumer using a Hyperledger Fabric blockchain, providing transparency and reducing fraud in supply chains.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "supply chain logistics",
    tags: ["Hyperledger", "Go", "Enterprise"],
    repoUrl: "https://github.com",
    techIcon: <Box className="text-muted-foreground" />,
  },
  {
    title: "NFT Ticketing Platform",
    description: "An event ticketing system where each ticket is a unique NFT, preventing scalping and allowing for a secondary market controlled by the event organizer.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "nft ticket concert",
    tags: ["NFT", "ERC-721", "Web3"],
    liveUrl: "#",
    techIcon: <Box className="text-muted-foreground" />,
  },
]

const frontendProjects: Project[] = [
  {
    title: "Pamodoro Timer",
    description: "A minimalist Pomodoro timer and to-do list designed to help you cultivate focus and grow a virtual garden of delightful plants.",
    imageUrl: "public/pamodoro.png",
    imageHint: "movie poster jazz",
    tags: ["NextJS", "Typescript", "CSS"],
    liveUrl: "https://pamodoro-timer.vercel.app/",
    repoUrl: "https://github.com/Siddamnn/Pamodoro-timer",
  },
  {
    title: "E-commerce Storefront",
    description: "",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "fashion store shopping",
    tags: ["Next.js", "Redux", "Stripe"],
    liveUrl: "#",
    repoUrl: "https://github.com",
  },
  {
    title: "Interactive Data Dashboard",
    description: "A dashboard for visualizing complex datasets with interactive charts and graphs. Built with D3.js and React for a leading analytics company.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "data dashboard charts",
    tags: ["D3.js", "React", "Data Viz"],
    liveUrl: "#",
  },
]

const poems: Poem[] = [
    {
      title: "Neon Heartbeat",
      text: "The city breathes in shades of pink and blue,\nA million stories in the evening dew.\nEach window, a screen, a fleeting scene,\nIn this river of light, this urban dream."
    },
    {
      title: "Starlight on Sunset",
      text: "Asphalt veins under a violet sky,\nWhere dreams take flight and ambitions fly.\nThe day descends, a cinematic fade,\nA promise whispered, a memory made."
    },
    {
      title: "Echoes in the Canyon",
      text: "The concrete whispers tales of old,\nOf silver screens and stories told.\nA lonely saxophone begins to weep,\nSecrets the silent, sleeping city keep."
    },
]


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Projects id="ai-projects" title="AI Projects" projects={aiProjects} />
        <Projects id="blockchain-projects" title="Blockchain Projects" projects={blockchainProjects} />
        <Projects id="frontend-projects" title="Frontend Projects" projects={frontendProjects} />
        <Poems poems={poems}/>
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
