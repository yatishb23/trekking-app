"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Compass } from "lucide-react";

export function CtaSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={containerRef} className="mx-6 mb-8">
      <div
        className="relative flex min-h-[420px] items-center overflow-hidden"
        style={{
          borderRadius: "36px",
          boxShadow: "0 20px 60px rgba(196,98,45,0.25)",
        }}
      >
        {/* Background image with parallax */}
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&q=80&w=2070"
            alt="Mountain summit"
            fill
            className="object-cover brightness-90"
            sizes="100vw"
          />
        </motion.div>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(100deg, rgba(45,20,8,0.82) 0%, rgba(196,98,45,0.6) 55%, transparent 100%)",
          }}
        />

        {/* Decorative blobs */}
        <div
          className="absolute -right-12 -top-20 z-10 h-96 w-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(45,80,22,0.2) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 z-10 h-48 w-48 rounded-full"
          style={{
            left: "45%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div className="relative z-20 px-16 py-20">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-6 flex items-center gap-3"
            >
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em]"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  color: "rgba(245,240,232,0.9)",
                }}
              >
                <Compass className="h-3.5 w-3.5" />
                Ready for the journey?
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-serif text-[54px] font-light leading-[1.06]"
              style={{ color: "#FDFAF5" }}
            >
              The Mountains Are{" "}
              <em
                className="italic font-light"
                style={{ color: "rgba(245,240,232,0.55)" }}
              >
                Calling You
              </em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-6 max-w-md text-[15px] font-light leading-relaxed"
              style={{ color: "rgba(253,250,245,0.75)" }}
            >
              Whether you are a seasoned trekker or stepping onto a trail for the
              first time, your perfect expedition starts here.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-10 flex flex-col items-start gap-4 sm:flex-row"
            >
              {/* Primary button */}
              <Link
                href="/treks"
                className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.08em] transition-all duration-250 hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #F5F0E8, #EDE8DC)",
                  color: "#2D5016",
                  boxShadow:
                    "0 8px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.9)",
                }}
              >
                Book Your Adventure
                <ArrowRight className="h-4 w-4" />
              </Link>

              {/* Ghost button */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-[12px] font-medium transition-all duration-250 hover:bg-white/20"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.22)",
                  color: "rgba(245,240,232,0.88)",
                }}
              >
                Inquire Now
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}