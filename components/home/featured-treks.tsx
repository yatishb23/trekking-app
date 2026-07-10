"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { TrekCard } from "@/components/trek-card";
import type { Trek } from "@/lib/data";

export function FeaturedTreks({ treks }: { treks: Trek[] }) {
  const featured = treks.filter((t) => t.featured).slice(0, 3);

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-900">
              Expeditions
            </span>
            <h2 className="text-4xl font-light tracking-tight text-zinc-900 sm:text-5xl" style={{ fontFamily: "var(--font-playfair)" }}>
              Featured <em className="italic text-stone-400">Adventures</em>
            </h2>
          </div>

          <Link
            href="/treks"
            className="group flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400 transition-colors duration-300 hover:text-zinc-900"
          >
            View All
            <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((trek, index) => (
            <motion.div
              key={trek.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
            >
              <TrekCard trek={trek} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
