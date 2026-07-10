import type { Metadata } from "next"
import Image from "next/image"
import {
  Mountain,
  Droplets,
  Cloud,
  Heart,
  Users,
  Utensils,
  ShieldCheck,
  AlertTriangle,
  Phone,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { safetyTips } from "@/lib/data"

export const metadata: Metadata = {
  title: "Safety Guidelines | Miles With Nature",
  description:
    "Your safety is our top priority. Read our comprehensive trekking safety guidelines before you hit the trail.",
}

const iconMap: Record<string, typeof Mountain> = {
  mountain: Mountain,
  droplets: Droplets,
  cloud: Cloud,
  heart: Heart,
  users: Users,
  utensils: Utensils,
}

const faqs = [
  {
    question: "What happens if someone gets altitude sickness?",
    answer:
      "Our guides are trained in recognizing AMS symptoms. If anyone shows signs, we immediately halt ascent. Mild cases are treated with rest, hydration, and medication. For severe cases, we begin descent immediately and coordinate emergency evacuation if needed.",
  },
  {
    question: "Is there phone network on the treks?",
    answer:
      "Most high-altitude trails have limited or no cellular coverage. Our team carries satellite communication devices and walkie-talkies for emergency communication. We recommend informing your family of this before the trek.",
  },
  {
    question: "What medical facilities are available?",
    answer:
      "All our trek leaders are certified in wilderness first aid. We carry comprehensive first aid kits and basic medications. For serious emergencies, we coordinate helicopter evacuation to the nearest hospital.",
  },
  {
    question: "Should I get travel or trekking insurance?",
    answer:
      "We strongly recommend getting travel insurance that covers high-altitude trekking and emergency evacuation. We can recommend specific policies that cover the altitude ranges of our treks.",
  },
  {
    question: "Are there age restrictions for treks?",
    answer:
      "Most of our moderate treks are suitable for ages 14-60. Easy treks can accommodate ages 10-65. For challenging and extreme treks, we require a fitness certificate and prior trekking experience. Contact us for specific trek requirements.",
  },
]

export default function SafetyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Hero */}
        <section className="bg-stone-50 py-32 text-center px-6 sm:py-40">
          <div className="mx-auto max-w-3xl mt-10">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-stone-200 bg-white shadow-sm">
              <ShieldCheck className="h-8 w-8 text-zinc-900" />
            </div>
            <h1 className="text-5xl font-light tracking-tight text-zinc-900 sm:text-6xl md:text-7xl" style={{ fontFamily: "var(--font-playfair)" }}>
              Safety <em className="italic text-stone-400">First</em>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg font-light leading-relaxed text-stone-500">
              Your safety is our top priority. We follow strict protocols and
              equip every trek with experienced guides and emergency support.
            </p>
          </div>
        </section>

        {/* Safety Tips */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-900">
                Essential Tips
              </span>
              <h2 className="mt-4 text-4xl font-light tracking-tight text-zinc-900 sm:text-5xl" style={{ fontFamily: "var(--font-playfair)" }}>
                Stay Safe on the <em className="italic text-stone-400">Trail</em>
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {safetyTips.map((tip) => {
                const Icon = iconMap[tip.icon] || Mountain
                return (
                  <div key={tip.title} className="group flex flex-col rounded-2xl border border-stone-200 bg-stone-50 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-zinc-950 hover:bg-zinc-950 hover:shadow-2xl hover:shadow-zinc-950/20 sm:p-8">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-stone-200 bg-white transition-all duration-500 group-hover:border-white/10 group-hover:bg-white/10">
                      <Icon className="h-5 w-5 text-zinc-900 transition-colors duration-500 group-hover:text-white" />
                    </div>
                    <h3 className="text-lg font-medium text-zinc-900 transition-colors duration-500 group-hover:text-white" style={{ fontFamily: "var(--font-playfair)" }}>
                      {tip.title}
                    </h3>
                    <p className="mt-3 flex-auto text-sm font-light leading-relaxed text-stone-500 transition-colors duration-500 group-hover:text-stone-300">
                      {tip.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Safety Equipment */}
        <section className="bg-stone-50 border-y border-stone-200 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-stone-200">
                <Image
                  src="/images/safety-gear.jpg"
                  alt="Professional trekking safety equipment"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-900 shadow-sm">
                  Our Equipment
                </span>
                <h2 className="mt-4 text-4xl font-light tracking-tight text-zinc-900 sm:text-5xl" style={{ fontFamily: "var(--font-playfair)" }}>
                  Professional Gear for Your <em className="italic text-stone-400">Safety</em>
                </h2>
                <div className="mt-8 space-y-4">
                  {[
                    "Comprehensive Wilderness First Aid Kits",
                    "Satellite Communication & Walkie-Talkies",
                    "Oxygen Cylinders (for high-altitude treks)",
                    "High-strength Climbing Ropes & Harnesses",
                    "Emergency Rescue Stretchers",
                    "AED & Basic Life Support Equipment",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-4 border-b border-stone-200 pb-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white border border-stone-200">
                        <ShieldCheck className="h-4 w-4 text-zinc-900" />
                      </div>
                      <span className="text-sm text-stone-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-900">
                Have Questions?
              </span>
              <h2 className="mt-4 text-4xl font-light tracking-tight text-zinc-900 sm:text-5xl" style={{ fontFamily: "var(--font-playfair)" }}>
                Safety <em className="italic text-stone-400">FAQs</em>
              </h2>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-stone-200">
                  <AccordionTrigger className="text-left text-base font-light hover:no-underline hover:text-stone-600 transition-colors py-5" style={{ fontFamily: "var(--font-playfair)" }}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm font-light leading-relaxed text-stone-500 pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Emergency Info */}
        <section className="border-t border-stone-200 bg-stone-50 py-16">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-light text-zinc-900" style={{ fontFamily: "var(--font-playfair)" }}>
              Emergency Contact
            </h2>
            <p className="mt-4 text-sm text-stone-500">
              In case of emergency during a trek, contact our 24/7 emergency line:
            </p>
            <div className="mt-6 flex items-center justify-center gap-3 text-xl font-medium text-zinc-900">
              <Phone className="h-5 w-5 text-stone-400" />
              <span>+91 98765 43210</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
