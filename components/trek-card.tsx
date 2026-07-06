"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, TrendingUp, IndianRupee, ArrowUpRight } from "lucide-react";
import type { Trek } from "@/lib/data";

const difficultyStyles: Record<string, string> = {
  Easy: "bg-green-100 text-green-800",
  Moderate: "bg-yellow-100 text-yellow-800",
  Challenging: "bg-orange-100 text-orange-800",
  Extreme: "bg-red-100 text-red-800",
};

export function TrekCard({ trek }: { trek: Trek }) {
  const diffClass = difficultyStyles[trek.difficulty] ?? difficultyStyles.Moderate;
  const primaryImage = trek.images?.[0] || "https://images.unsplash.com/photo-1522345598166-519b671a171d?auto=format&fit=crop&q=80&w=2070"; // Fallback image

  return (
    <Link href={`/treks/${trek.slug}`} className="group block">
      <div className="overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <Image
            src={primaryImage}
            alt={trek.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Badges */}
          <div className="absolute left-4 top-4 flex gap-2">
            {trek.featured && (
              <span className="rounded-full bg-black/80 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-md">
                Featured
              </span>
            )}
            {trek.upcoming && (
              <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-black backdrop-blur-md">
                Upcoming
              </span>
            )}
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white mb-1 leading-tight group-hover:text-gray-200 transition-colors">
              {trek.title}
            </h3>
            <div className="flex items-center gap-1.5 text-sm text-gray-200">
              <MapPin className="h-3.5 w-3.5" />
              <span className="truncate">{trek.location}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="mb-4 grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-50 text-gray-500">
                <Clock className="h-3.5 w-3.5" />
              </div>
              <span className="font-medium">{trek.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-50 text-gray-500">
                <TrendingUp className="h-3.5 w-3.5" />
              </div>
              <span className={`font-medium px-2 py-0.5 rounded-md text-xs ${diffClass}`}>
                {trek.difficulty}
              </span>
            </div>
          </div>

          <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-gray-500">
            {trek.shortDescription}
          </p>

          <div className="flex items-center justify-between border-t border-gray-100 pt-4">
            <div className="flex items-center gap-1">
              <IndianRupee className="h-4 w-4 text-gray-400" />
              <span className="text-lg font-bold text-black">
                {trek.price.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-50 text-black transition-colors group-hover:bg-black group-hover:text-white">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}