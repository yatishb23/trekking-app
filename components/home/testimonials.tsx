"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  return (
    <section className="mx-4 sm:mx-6 lg:mx-8 mb-12 sm:mb-16 overflow-hidden rounded-3xl bg-stone-50 border border-stone-200 px-6 py-20 sm:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-900 shadow-sm">
            Community Stories
          </span>
          <h2 className="text-4xl font-light tracking-tight text-zinc-900 sm:text-5xl" style={{ fontFamily: "var(--font-playfair)" }}>
            Echoes of{" "}
            <em className="font-light italic text-stone-400">
              Adventure
            </em>
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 6).map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.08, duration: 0.6, ease: "easeOut" }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-stone-200 bg-white p-7 transition-all duration-300 hover:shadow-lg hover:shadow-stone-200/50 hover:-translate-y-0.5 sm:p-8"
            >
              {/* Decorative Quote */}
              <div className="pointer-events-none absolute -right-4 -top-8 text-[160px] leading-none text-stone-100 select-none transition-transform duration-500 group-hover:scale-110" style={{ fontFamily: "var(--font-playfair)" }}>
                &ldquo;
              </div>

              <div className="relative z-10">
                {/* Stars */}
                <div className="mb-5 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "text-sm",
                        i < item.rating
                          ? "text-amber-400"
                          : "text-stone-200"
                      )}
                    >
                      &#9733;
                    </span>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="min-h-[80px] text-sm font-light italic leading-relaxed text-stone-500 sm:min-h-[100px] sm:text-base" style={{ fontFamily: "var(--font-playfair)" }}>
                  &ldquo;{item.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="mt-6 flex items-center gap-3.5 border-t border-stone-100 pt-5 sm:mt-8">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-xs font-bold text-white transition-transform duration-300 group-hover:scale-105">
                    {item.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-900">
                      {item.name}
                    </p>
                    <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400">
                      {item.trek}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
