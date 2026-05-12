"use client";

import { motion } from "framer-motion";
import { ChevronRight, Mountain, Shield, Users, Compass } from "lucide-react";
import Link from "next/link";
import { TrekCard } from "@/components/trek-card";
import { treks } from "@/lib/data";

/* ─────────────────────────────────────────────
   FEATURED TREKS
───────────────────────────────────────────── */
export function FeaturedTreks() {
  const featured = treks.filter((t) => t.featured).slice(0, 3);

  return (
    <section className="mx-6 mb-8">
      {/* Header */}
      <div className="mb-8 flex flex-col items-end justify-between gap-6 md:flex-row">
        <div>
          <span
            className="mb-2 inline-block rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em]"
            style={{
              background: "rgba(74,124,63,0.1)",
              color: "#4A7C3F",
            }}
          >
            Expeditions
          </span>
          <h2
            className="font-serif text-[38px] font-light leading-tight"
            style={{ color: "#2D5016" }}
          >
            Featured{" "}
            <em className="italic font-light" style={{ color: "#8B7355" }}>
              Adventures
            </em>
          </h2>
        </div>

        <Link
          href="/treks"
          className="group flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-200"
          style={{ color: "#4A7C3F" }}
        >
          View All
          <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid gap-5 md:grid-cols-3">
        {featured.map((trek, index) => (
          <motion.div
            key={trek.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.55 }}
          >
            <TrekCard trek={trek} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FEATURES / WHY US
───────────────────────────────────────────── */
const features = [
  {
    icon: Mountain,
    emoji: "🏔",
    title: "Curated Trails",
    description:
      "Handpicked routes through stunning Sahyadri landscapes, vetted for beauty and safety.",
    iconBg: "linear-gradient(135deg, #7BAF6E, #4A7C3F)",
  },
  {
    icon: Shield,
    emoji: "🛡",
    title: "Safety First",
    description:
      "Comprehensive safety protocols, certified guides, and emergency satellite comms.",
    iconBg: "linear-gradient(135deg, #E8935A, #C4622D)",
  },
  {
    icon: Users,
    emoji: "👥",
    title: "Small Groups",
    description:
      "Intimate groups of 8–15 trekkers for a genuine, personal wilderness connection.",
    iconBg: "linear-gradient(135deg, #B5A28C, #8B7355)",
  },
  {
    icon: Compass,
    emoji: "🧭",
    title: "Expert Guides",
    description:
      "Years of Sahyadri experience — local knowledge that transforms a hike into a story.",
    iconBg: "linear-gradient(135deg, #B8D4AA, #7BAF6E)",
  },
];

export function Features() {
  return (
    <section
      className="mx-6 mb-8 px-12 py-14"
      style={{
        background: "#FDFAF5",
        borderRadius: "36px",
        boxShadow:
          "0 12px 40px rgba(45,80,22,0.1), inset 0 1px 0 rgba(255,255,255,0.8)",
      }}
    >
      {/* Header */}
      <div className="mb-2 text-center">
        <span
          className="inline-block rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em]"
          style={{ background: "rgba(74,124,63,0.1)", color: "#4A7C3F" }}
        >
          The Miles Advantage
        </span>
      </div>
      <h2
        className="text-center font-serif text-[38px] font-light leading-tight"
        style={{ color: "#2D5016" }}
      >
        Engineered for{" "}
        <em className="italic font-light" style={{ color: "#8B7355" }}>
          Nature
        </em>
      </h2>

      {/* Feature Cards */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative"
            style={{
              background: "linear-gradient(145deg, #F8F4EE, #EDE8DC)",
              borderRadius: "28px",
              padding: "28px 24px",
              boxShadow:
                "0 8px 24px rgba(139,115,85,0.1), 0 2px 6px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.7)",
              transition: "all 0.3s",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 16px 40px rgba(139,115,85,0.18), 0 4px 12px rgba(0,0,0,0.06)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 8px 24px rgba(139,115,85,0.1), 0 2px 6px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.7)";
            }}
          >
            {/* Icon */}
            <div
              className="mb-5 flex h-12 w-12 items-center justify-center rounded-[18px] text-xl"
              style={{
                background: feature.iconBg,
                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.4)",
              }}
            >
              {feature.emoji}
            </div>

            <h3
              className="font-serif text-[18px] font-normal"
              style={{ color: "#2D5016", marginBottom: "10px" }}
            >
              {feature.title}
            </h3>
            <p
              className="text-[13px] font-light leading-relaxed"
              style={{ color: "#8B7355" }}
            >
              {feature.description}
            </p>

            {/* Animated bottom bar */}
            <div
              className="mt-5 h-[2px] rounded-full transition-all duration-300 group-hover:opacity-60"
              style={{
                background: "linear-gradient(90deg, #4A7C3F, transparent)",
                width: "40px",
                opacity: 0.35,
              }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}