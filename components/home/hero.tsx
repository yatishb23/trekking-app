"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Mountain } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }

  return (
    <section className="relative flex min-h-[100svh] w-[100dvw] ml-[calc(50%-50dvw)] items-center justify-center overflow-hidden bg-zinc-950">
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070"
          alt="Mountain landscape"
          fill
          priority
          className="object-cover opacity-50"
          sizes="100vw"
        />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-zinc-950/30 via-transparent to-zinc-950" />

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-5xl px-6 text-center">
        {/* Badge */}
        <motion.div
          {...fadeIn}
          transition={{ delay: 0.2 }}
          className="mb-8 flex items-center justify-center gap-3"
        >
          <span className="h-px w-10 bg-white/20" />
          <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/60">
            Since 2024 &bull; Miles With Nature
          </span>
          <span className="h-px w-10 bg-white/20" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeIn}
          transition={{ delay: 0.4 }}
          className="text-5xl font-light tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Walk the Trails <br className="hidden sm:block" />
          <span className="relative inline-block italic text-stone-300">
            Less Traveled
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 10" fill="none">
              <path d="M1 9C50 3 150 3 299 9" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
            </svg>
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          {...fadeIn}
          transition={{ delay: 0.6 }}
          className="mx-auto mt-10 max-w-xl text-base leading-relaxed text-white/60 md:text-lg font-light tracking-wide"
        >
          Escape the noise. Curated trekking experiences designed for the
          wandering soul across Earth&apos;s most silent peaks.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeIn}
          transition={{ delay: 0.8 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5"
        >
          <Button
            size="lg"
            asChild
            className="group h-13 rounded-xl bg-white px-8 text-zinc-950 transition-all duration-300 hover:bg-white/90 hover:shadow-xl hover:shadow-white/10 hover:-translate-y-0.5 sm:h-14 sm:px-10"
          >
            <Link href="/treks">
              <span className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.15em]">
                Explore Treks
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </Button>

          <Button
            size="lg"
            variant="ghost"
            asChild
            className="h-13 rounded-xl px-8 text-white/80 transition-all duration-300 hover:bg-white/10 hover:text-white sm:h-14 sm:px-10"
          >
            <Link href="/about" className="flex items-center gap-2.5">
              <Mountain className="h-4 w-4 opacity-50" />
              <span className="text-xs font-bold uppercase tracking-[0.15em]">Our Story</span>
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/30">
            Scroll
          </span>
          <div className="h-10 w-px bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  )
}
