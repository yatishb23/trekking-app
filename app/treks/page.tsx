import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { TrekCard } from "@/components/trek-card";
import { getTreks } from "@/lib/data-store";

export const metadata: Metadata = {
  title: "Treks | Miles With Nature",
  description:
    "Browse our curated collection of trekking adventures across the most beautiful mountain ranges in Maharashtra.",
};

export default async function TreksPage() {
  const treks = await getTreks();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pb-24 sm:pb-32">
        {/* Hero */}
        <section className="bg-stone-50 pt-32 pb-16 text-center px-6 sm:pt-40 sm:pb-20">
          <div className="mx-auto max-w-3xl mt-10">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-900 shadow-sm">
              Our Adventures
            </span>
            <h1 className="text-5xl font-light tracking-tight text-zinc-900 sm:text-6xl md:text-7xl" style={{ fontFamily: "var(--font-playfair)" }}>
              Explore Our <em className="italic text-stone-400">Treks</em>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg font-light leading-relaxed text-stone-500">
              From beginner-friendly valley walks to challenging summit climbs,
              find the perfect trek that matches your spirit of adventure.
            </p>
          </div>
        </section>

        {/* Treks Grid */}
        <section className="mx-auto max-w-7xl px-6 pt-16 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {treks.map((trek) => (
              <TrekCard key={trek.slug} trek={trek} />
            ))}
          </div>

          {treks.length === 0 && (
            <div className="py-32 text-center">
              <p className="text-lg font-light text-stone-400">
                No treks available at the moment. Check back soon!
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
