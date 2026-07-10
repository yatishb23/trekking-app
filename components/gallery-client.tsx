"use client"

import { useState } from "react"
import Image from "next/image"
import { X, MapPin, BookOpen } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import type { GalleryImage } from "@/lib/data"

interface GalleryClientProps {
  images: GalleryImage[]
}

export function GalleryClient({ images }: GalleryClientProps) {
  const categories = ["All", ...Array.from(new Set(images.map((img) => img.category)))]
  const [activeCategory, setActiveCategory] = useState("All")
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null)

  const filteredImages =
    activeCategory === "All"
      ? images
      : images.filter((img) => img.category === activeCategory)

  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Hero */}
        <section className="bg-stone-50 py-32 text-center px-6 sm:py-40">
          <div className="mx-auto max-w-3xl mt-10">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-900 shadow-sm">
              Captured Moments
            </span>
            <h1 className="text-5xl font-light tracking-tight text-zinc-900 sm:text-6xl md:text-7xl" style={{ fontFamily: "var(--font-playfair)" }}>
              Visual <em className="italic text-stone-400">Journey</em>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg font-light leading-relaxed text-stone-500">
              A visual journey through the mountains, forests, and valleys we
              have explored together. Every photo tells a story.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="pt-16 pb-8">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2.5 px-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "rounded-xl px-5 py-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 border",
                  activeCategory === category
                    ? "bg-zinc-950 text-white border-zinc-950 shadow-lg shadow-zinc-950/20"
                    : "bg-transparent text-stone-400 border-stone-200 hover:border-zinc-950 hover:text-zinc-900"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-8 pb-24 sm:pb-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {filteredImages.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-lg font-light text-stone-400">
                  No memories in this category yet.
                </p>
              </div>
            ) : (
              <motion.div layout className="columns-1 gap-5 sm:columns-2 lg:columns-3">
                <AnimatePresence>
                  {filteredImages.map((image, index) => (
                    <motion.button
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      key={(image.src || "") + index}
                      onClick={() => setLightboxImage(image)}
                      className="group relative mb-5 block w-full overflow-hidden rounded-2xl bg-stone-100 focus:outline-none"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={600}
                        height={index % 3 === 0 ? 800 : index % 3 === 1 ? 400 : 600}
                        className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="absolute inset-0 flex flex-col items-start justify-end p-5">
                        <span className="translate-y-4 text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                          {image.alt}
                        </span>
                        {image.trekName && (
                          <span className="mt-1 flex items-center gap-1 translate-y-4 text-xs text-white/70 opacity-0 transition-all duration-300 delay-75 group-hover:translate-y-0 group-hover:opacity-100">
                            <MapPin className="h-3 w-3" />
                            {image.trekName}
                          </span>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </section>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
              onClick={() => setLightboxImage(null)}
              role="dialog"
              aria-label="Image lightbox"
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute right-6 top-6 z-10 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
                aria-label="Close lightbox"
              >
                <X className="h-5 w-5" />
              </button>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative max-h-[90vh] max-w-[90vw]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={lightboxImage.src}
                  alt={lightboxImage.alt}
                  width={1200}
                  height={800}
                  className="max-h-[75vh] w-auto rounded-2xl object-contain shadow-2xl"
                />
                {/* Story overlay */}
                {(lightboxImage.story || lightboxImage.trekName) && (
                  <div className="absolute bottom-0 left-0 right-0 rounded-b-2xl bg-gradient-to-t from-black/80 to-transparent p-6 pt-12">
                    <h3 className="text-lg font-medium text-white" style={{ fontFamily: "var(--font-playfair)" }}>
                      {lightboxImage.alt}
                    </h3>
                    {lightboxImage.trekName && (
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-white/60">
                        <MapPin className="h-3 w-3" />
                        {lightboxImage.trekName}
                      </p>
                    )}
                    {lightboxImage.story && (
                      <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/70">
                        {lightboxImage.story}
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}
