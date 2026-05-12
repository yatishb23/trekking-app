"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  return (
    <section
      className="relative mx-6 mb-8 overflow-hidden px-12 py-14"
      style={{
        background: "linear-gradient(160deg, #2D5016 0%, #1A3008 100%)",
        borderRadius: "36px",
        boxShadow:
          "0 20px 60px rgba(45,80,22,0.35), inset 0 1px 0 rgba(184,212,170,0.15)",
      }}
    >
      {/* Large decorative quote */}
      <div
        className="pointer-events-none absolute -top-10 left-0 select-none font-serif leading-none"
        style={{
          fontSize: "260px",
          color: "rgba(184,212,170,0.04)",
        }}
      >
        "
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span
            className="mb-3 inline-block rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em]"
            style={{
              background: "rgba(184,212,170,0.12)",
              color: "#B8D4AA",
            }}
          >
            Community Stories
          </span>
          <h2
            className="mb-10 font-serif text-[38px] font-light leading-tight"
            style={{ color: "#F5F0E8" }}
          >
            Echoes of{" "}
            <em className="italic font-light" style={{ color: "#B8D4AA" }}>
              Adventure
            </em>
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 6).map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.55 }}
              className="flex flex-col justify-between"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(184,212,170,0.15)",
                borderRadius: "28px",
                padding: "28px",
                backdropFilter: "blur(10px)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
                transition: "all 0.3s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(255,255,255,0.11)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(184,212,170,0.3)";
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(184,212,170,0.15)";
                (e.currentTarget as HTMLElement).style.transform = "";
              }}
            >
              {/* Stars */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "text-[13px]",
                      i < item.rating
                        ? "text-[#E8935A]"
                        : "opacity-20 text-[#E8935A]"
                    )}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Quote mark */}
              <div
                className="mb-2 font-serif text-5xl leading-none"
                style={{ color: "rgba(184,212,170,0.2)" }}
              >
                "
              </div>

              {/* Quote text */}
              <blockquote
                className="flex-1 font-serif text-[15px] font-light italic leading-relaxed"
                style={{ color: "rgba(245,240,232,0.85)" }}
              >
                {item.quote}
              </blockquote>

              {/* Author */}
              <div
                className="mt-6 flex items-center gap-3 pt-5"
                style={{ borderTop: "1px solid rgba(184,212,170,0.12)" }}
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white"
                  style={{
                    background: "linear-gradient(135deg, #7BAF6E, #4A7C3F)",
                    boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
                  }}
                >
                  {item.initials}
                </div>
                <div>
                  <p
                    className="text-[13px] font-semibold"
                    style={{ color: "#F5F0E8" }}
                  >
                    {item.name}
                  </p>
                  <p
                    className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.15em]"
                    style={{ color: "rgba(184,212,170,0.6)" }}
                  >
                    {item.trek}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}