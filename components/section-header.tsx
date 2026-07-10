import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  label?: string
  title: string
  description?: string
  className?: string
  align?: "left" | "center"
}

export function SectionHeader({
  label,
  title,
  description,
  className,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {label && (
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-900">
          {label}
        </span>
      )}
      <h2 className="mt-4 text-3xl font-light tracking-tight text-zinc-900 sm:text-4xl" style={{ fontFamily: "var(--font-playfair)" }}>
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-stone-500">
          {description}
        </p>
      )}
    </div>
  )
}
