import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { TrekCard } from "@/components/trek-card";
import { treks } from "@/lib/data";

export const metadata: Metadata = {
  title: "Treks | Miles With Nature",
  description:
    "Browse our curated collection of trekking adventures across the most beautiful mountain ranges in Maharashtra.",
};

export default function TreksPage() {
  return (
    <div style={{ background: "#EDE8DC", minHeight: "100vh" }}>
      <Navbar />
      <main className="pt-28">
        {/* Hero */}
        <section className="px-6 pb-10 pt-4 text-center">
          <span
            className="mb-4 inline-block rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em]"
            style={{ background: "rgba(74,124,63,0.1)", color: "#4A7C3F" }}
          >
            Our Adventures
          </span>
          <h1
            className="font-serif text-5xl font-light sm:text-6xl"
            style={{ color: "#2D5016", lineHeight: 1.08 }}
          >
            Explore Our{" "}
            <em className="italic font-light" style={{ color: "#8B7355" }}>
              Treks
            </em>
          </h1>
          <p
            className="mx-auto mt-5 max-w-xl text-base font-light leading-relaxed"
            style={{ color: "#8B7355" }}
          >
            From beginner-friendly valley walks to challenging summit climbs,
            find the perfect trek that matches your spirit of adventure.
          </p>
        </section>

        {/* Treks Grid */}
        <section className="px-6 pb-16">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {treks.map((trek) => (
              <TrekCard key={trek.slug} trek={trek} />
            ))}
          </div>

          {treks.length === 0 && (
            <div className="py-20 text-center">
              <p style={{ color: "#8B7355" }}>
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