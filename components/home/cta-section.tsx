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
    <section ref={containerRef} className="mx-4 sm:mx-6 lg:mx-8 mb-12 sm:mb-16">
      <div className="relative flex min-h-[400px] items-center overflow-hidden rounded-3xl border border-stone-200 sm:min-h-[450px]">
        {/* Background image with parallax */}
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&q=80&w=2070"
            alt="Mountain summit"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />

        {/* Content */}
        <div className="relative z-20 px-8 py-16 sm:px-12 sm:py-20 lg:px-20">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 backdrop-blur-md">
                <Compass className="h-3.5 w-3.5" />
                Ready for the journey?
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-4xl font-light leading-tight text-white sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The Mountains Are{" "}
              <em className="font-light italic text-stone-300">
                Calling You
              </em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-6 max-w-md text-base leading-relaxed text-white/50"
            >
              Join a community of explorers and conquer paths unknown.
              Your next adventure awaits just a click away.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-10"
            >
              <Link
                href="/treks"
                className="group inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-950 transition-all duration-300 hover:bg-white/90 hover:shadow-xl hover:shadow-white/10 hover:-translate-y-0.5"
              >
                Start Exploring
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
