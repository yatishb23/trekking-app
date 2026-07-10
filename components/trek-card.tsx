"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, TrendingUp, IndianRupee, ArrowUpRight } from "lucide-react";
import type { Trek } from "@/lib/data";

const difficultyStyles: Record<string, string> = {
  Easy: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Moderate: "bg-amber-50 text-amber-700 border-amber-200",
  Challenging: "bg-orange-50 text-orange-700 border-orange-200",
  Extreme: "bg-red-50 text-red-700 border-red-200",
};

export function TrekCard({ trek }: { trek: Trek }) {
  const diffClass = difficultyStyles[trek.difficulty] ?? difficultyStyles.Moderate;
  const primaryImage = trek.images?.[0] || "https://images.unsplash.com/photo-1522345598166-519b671a171d?auto=format&fit=crop&q=80&w=2070";

  return (
    <Link href={`/treks/${trek.slug}`} className="group block">
      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-200/60">
        {/* Image */}
        <div className="relative h-56 overflow-hidden sm:h-60">
          <Image
            src={primaryImage}
            alt={trek.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Badges */}
          <div className="absolute left-4 top-4 flex gap-2">
            {trek.featured && (
              <span className="rounded-lg bg-zinc-950/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                Featured
              </span>
            )}
            {trek.upcoming && (
              <span className="rounded-lg bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-900 backdrop-blur-md">
                Upcoming
              </span>
            )}
          </div>

          {/* Title overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-lg font-semibold text-white mb-1 leading-tight transition-colors duration-300 sm:text-xl" style={{ fontFamily: "var(--font-playfair)" }}>
              {trek.title}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-white/70">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{trek.location}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="mb-4 grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-stone-500">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-50 text-stone-400">
                <Clock className="h-3.5 w-3.5" />
              </div>
              <span className="text-xs font-medium">{trek.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-50 text-stone-400">
                <TrendingUp className="h-3.5 w-3.5" />
              </div>
              <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${diffClass}`}>
                {trek.difficulty}
              </span>
            </div>
          </div>

          <p className="mb-5 line-clamp-2 text-xs leading-relaxed text-stone-400 sm:text-sm">
            {trek.shortDescription}
          </p>

          <div className="flex items-center justify-between border-t border-stone-100 pt-4">
            <div className="flex items-center gap-1">
              <IndianRupee className="h-4 w-4 text-stone-300" />
              <span className="text-lg font-bold text-zinc-900">
                {trek.price.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-50 text-stone-400 transition-all duration-300 group-hover:bg-zinc-950 group-hover:text-white group-hover:shadow-lg group-hover:shadow-zinc-950/20">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
