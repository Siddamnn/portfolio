import { cn } from "@/lib/utils"

type SiteLogoProps = {
  className?: string
  isHoverFlicker?: boolean
}

const MusicNoteIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-5 0 20 20"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M 6 15 Z M 7.113 3.875 V 13.5 a 3.338 3.338 90 1 0 2.225 3.1 V 6.988 l 4.45 -1.78 Z" />
    </svg>
)

export function SiteLogo({ className, isHoverFlicker = false }: SiteLogoProps) {
  return (
    <div
      className={cn(
        "font-logo text-2xl font-bold text-[#ff007f]",
        "border-2 border-[#ff007f] rounded-full p-2",
        isHoverFlicker ? "group-hover/footer:animate-flicker" : "animate-flicker",
        className
      )}
    >
      <div className="flex items-center text-stroke-pink uppercase italic px-2">
        <span>SID</span>
        <MusicNoteIcon className="w-[0.7em] h-[0.55em] -ml-1 fill-[#ff007f] translate-y-[-0.4em]" />
        <span className="-ml-4">S</span>
      </div>
    </div>
  )
}