"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, TrendingUp, IndianRupee, ArrowUpRight } from "lucide-react";
import type { Trek } from "@/lib/data";

const difficultyStyles: Record<string, { bg: string; color: string }> = {
  Easy: {
    bg: "rgba(184,212,170,0.85)",
    color: "#1A3008",
  },
  Moderate: {
    bg: "rgba(232,213,183,0.85)",
    color: "#6B4A1A",
  },
  Challenging: {
    bg: "rgba(232,147,90,0.85)",
    color: "#4A1A08",
  },
  Extreme: {
    bg: "rgba(220,80,60,0.85)",
    color: "#3A0A08",
  },
};

export function TrekCard({ trek }: { trek: Trek }) {
  const diff = difficultyStyles[trek.difficulty] ?? difficultyStyles.Moderate;

  return (
    <Link href={`/treks/${trek.slug}`} className="group block">
      <div
        className="overflow-hidden transition-all duration-350"
        style={{
          background: "#FDFAF5",
          borderRadius: "32px",
          boxShadow:
            "0 12px 36px rgba(45,80,22,0.12), 0 4px 12px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform =
            "translateY(-6px) scale(1.01)";
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 24px 60px rgba(45,80,22,0.2), 0 8px 24px rgba(0,0,0,0.1)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "";
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 12px 36px rgba(45,80,22,0.12), 0 4px 12px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)";
        }}
      >
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <Image
            src={trek.image}
            alt={trek.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 40%, rgba(45,80,22,0.55))",
            }}
          />

          {/* Badges */}
          <div className="absolute left-4 top-4 flex gap-2">
            <span
              className="rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em]"
              style={{
                background: diff.bg,
                color: diff.color,
                backdropFilter: "blur(12px)",
                boxShadow:
                  "0 2px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.4)",
              }}
            >
              {trek.difficulty}
            </span>
            {trek.featured && (
              <span
                className="rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em]"
                style={{
                  background: "rgba(45,80,22,0.85)",
                  color: "#B8D4AA",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                }}
              >
                Featured
              </span>
            )}
          </div>

          {/* Price pill */}
          <div
            className="absolute bottom-4 right-4 flex items-baseline gap-1 rounded-full px-3 py-1.5"
            style={{
              background: "rgba(253,250,245,0.92)",
              backdropFilter: "blur(12px)",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.8)",
            }}
          >
            <span className="text-[11px] font-bold" style={{ color: "#4A7C3F" }}>
              ₹
            </span>
            <span
              className="font-serif text-lg font-normal"
              style={{ color: "#2D5016" }}
            >
              {trek.price.toLocaleString()}
            </span>
            <span className="text-[9px] font-medium" style={{ color: "#8B7355" }}>
              /person
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Location */}
          <div
            className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{ color: "#8B7355" }}
          >
            <div
              className="h-1 w-1 rounded-full"
              style={{ background: "#7BAF6E" }}
            />
            {trek.location}
          </div>

          {/* Title */}
          <h3
            className="font-serif text-[22px] font-normal leading-tight transition-colors duration-300 group-hover:text-[#4A7C3F]"
            style={{ color: "#2D5016" }}
          >
            {trek.title}
          </h3>

          {/* Description */}
          <p
            className="mt-3 line-clamp-2 text-[12.5px] font-light leading-relaxed"
            style={{ color: "#8B7355" }}
          >
            {trek.shortDescription}
          </p>

          {/* Stats */}
          <div
            className="my-5 grid grid-cols-2 gap-3 py-4"
            style={{
              borderTop: "1.5px solid rgba(184,212,170,0.3)",
              borderBottom: "1.5px solid rgba(184,212,170,0.3)",
            }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(184,212,170,0.4), rgba(122,175,110,0.2))",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
                }}
              >
                <Clock className="h-3.5 w-3.5" style={{ color: "#4A7C3F" }} />
              </div>
              <div>
                <p
                  className="text-[9px] font-bold uppercase tracking-[0.15em]"
                  style={{ color: "rgba(139,115,85,0.6)" }}
                >
                  Duration
                </p>
                <p
                  className="mt-0.5 text-[12.5px] font-semibold"
                  style={{ color: "#2D5016" }}
                >
                  {trek.duration}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(184,212,170,0.4), rgba(122,175,110,0.2))",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
                }}
              >
                <TrendingUp
                  className="h-3.5 w-3.5"
                  style={{ color: "#4A7C3F" }}
                />
              </div>
              <div>
                <p
                  className="text-[9px] font-bold uppercase tracking-[0.15em]"
                  style={{ color: "rgba(139,115,85,0.6)" }}
                >
                  Altitude
                </p>
                <p
                  className="mt-0.5 text-[12.5px] font-semibold"
                  style={{ color: "#2D5016" }}
                >
                  {trek.altitude}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.08em] text-white transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #4A7C3F, #2D5016)",
                boxShadow:
                  "0 4px 16px rgba(74,124,63,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
            >
              Book Trek
              <ArrowUpRight className="h-3.5 w-3.5" />
            </div>

            <div
              className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 group-hover:rotate-45"
              style={{
                border: "1.5px solid rgba(74,124,63,0.3)",
                color: "#4A7C3F",
                background: "rgba(184,212,170,0.15)",
              }}
            >
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}