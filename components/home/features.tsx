"use client"

import { motion } from "framer-motion"
import { Mountain, Shield, Users, Compass } from "lucide-react"

const features = [
  { icon: Mountain, title: "Curated Trails", description: "Handpicked routes through stunning landscapes tailored for true explorers." },
  { icon: Shield, title: "Safety First", description: "Comprehensive safety protocols and certified guides for absolute peace of mind." },
  { icon: Users, title: "Small Groups", description: "Intimate groups of 8-15 ensuring a personal connection with nature and peers." },
  { icon: Compass, title: "Expert Guides", description: "Years of Himalayan and Sahyadri experience walking at your side." },
]

export function Features() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-900"
          >
            The Miles Advantage
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-light tracking-tight text-zinc-900 sm:text-5xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Engineered for <em className="italic text-stone-400">Nature</em>
          </motion.h2>
        </div>

        <div className="mx-auto mt-20 grid max-w-lg gap-12 sm:max-w-none sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, margin: "-80px" }}
              className="group flex flex-col"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-stone-100 bg-stone-50 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-zinc-950 group-hover:bg-zinc-950 group-hover:shadow-xl group-hover:shadow-zinc-950/20">
                <feature.icon className="h-6 w-6 text-stone-500 transition-colors duration-500 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-medium text-zinc-900" style={{ fontFamily: "var(--font-playfair)" }}>
                {feature.title}
              </h3>
              <p className="mt-4 flex-auto text-sm leading-relaxed text-stone-500">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
