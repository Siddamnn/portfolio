import { cn } from "@/lib/utils"

type SiteLogoProps = {
  className?: string
  isHoverFlicker?: boolean
}

export function SiteLogo({ className, isHoverFlicker = false }: SiteLogoProps) {
  return (
    <div
      className={cn(
        "font-headline text-2xl font-bold text-[#ff007f]",
        isHoverFlicker ? "group-hover/footer:animate-flicker" : "animate-flicker",
        className
      )}
    >
      Sid&apos;s
    </div>
  )
}
