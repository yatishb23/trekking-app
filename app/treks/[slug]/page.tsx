import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Clock,
  TrendingUp,
  Users,
  Calendar,
  IndianRupee,
  Check,
  ArrowLeft,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BookTrekButton } from "@/components/book-trek-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getTrek } from "@/lib/data-store";

interface TrekPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: TrekPageProps): Promise<Metadata> {
  const { slug } = await params;
  const trek = await getTrek(slug);
  if (!trek) return { title: "Trek Not Found" };
  return {
    title: `${trek.title} | Miles With Nature`,
    description: trek.shortDescription,
  };
}

export async function generateStaticParams() {
  try {
    const treks = await prisma.trek.findMany({ select: { slug: true } });
    return treks.map((trek: { slug: string }) => ({ slug: trek.slug }));
  } catch {
    return [];
  }
}

const difficultyColors: Record<string, string> = {
  Easy: "bg-emerald-100 text-emerald-800",
  Moderate: "bg-amber-100 text-amber-800",
  Challenging: "bg-orange-100 text-orange-800",
  Extreme: "bg-red-100 text-red-800",
};

export default async function TrekDetailPage({ params }: TrekPageProps) {
  const { slug } = await params;
  const trek = await getTrek(slug);

  if (!trek) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative flex min-h-[50vh] items-end overflow-hidden">
          <Image
            src={trek.images?.[0] || "https://images.unsplash.com/photo-1522345598166-519b671a171d?auto=format&fit=crop&q=80&w=2070"}
            alt={trek.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12 pt-24 lg:px-8">
            <Link
              href="/treks"
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              All Treks
            </Link>
            <Badge className={`${difficultyColors[trek.difficulty]} border-0`}>
              {trek.difficulty}
            </Badge>
            <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl md:text-5xl" style={{ fontFamily: "var(--font-playfair)" }}>
              {trek.title}
            </h1>
            <div className="mt-3 flex items-center gap-1.5 text-sm text-white/70">
              <MapPin className="h-4 w-4" />
              <span>{trek.location}</span>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { icon: Clock, label: "Duration", value: trek.duration },
                    { icon: TrendingUp, label: "Altitude", value: trek.altitude },
                    { icon: Calendar, label: "Best Season", value: trek.bestSeason },
                    { icon: Users, label: "Group Size", value: trek.groupSize },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-stone-200 bg-stone-50 p-4"
                    >
                      <stat.icon className="h-5 w-5 text-zinc-900" />
                      <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400">
                        {stat.label}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-zinc-900">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <div className="mt-10">
                  <h2 className="text-2xl font-semibold text-zinc-900" style={{ fontFamily: "var(--font-playfair)" }}>
                    About This Trek
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-stone-500">
                    {trek.description}
                  </p>
                </div>

                {/* Gallery */}
                {trek.images && trek.images.length > 1 && (
                  <div className="mt-10">
                    <h2 className="text-2xl font-semibold text-zinc-900" style={{ fontFamily: "var(--font-playfair)" }}>
                      Gallery
                    </h2>
                    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {trek.images.slice(1).map((img, idx) => (
                        <div key={idx} className="relative aspect-square overflow-hidden rounded-xl border border-stone-200">
                          <Image
                            src={img}
                            alt={`${trek.title} gallery image ${idx + 1}`}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Highlights */}
                <div className="mt-10">
                  <h2 className="text-2xl font-semibold text-zinc-900" style={{ fontFamily: "var(--font-playfair)" }}>
                    Highlights
                  </h2>
                  <ul className="mt-4 flex flex-col gap-3">
                    {trek.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-3 text-sm text-stone-500"
                      >
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                          <Check className="h-3 w-3 text-emerald-600" />
                        </div>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Itinerary */}
                <div className="mt-10">
                  <h2 className="text-2xl font-semibold text-zinc-900" style={{ fontFamily: "var(--font-playfair)" }}>
                    Day-by-Day Itinerary
                  </h2>
                  <div className="mt-6 flex flex-col gap-3">
                    {trek.itinerary.map((day) => (
                      <div
                        key={day.day}
                        className="flex gap-4 rounded-xl border border-stone-200 bg-stone-50 p-5 transition-colors hover:bg-white"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-sm font-bold text-white">
                          {day.day}
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-zinc-900">
                            {day.title}
                          </h3>
                          <p className="mt-1.5 text-sm leading-relaxed text-stone-500">
                            {day.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div>
                <Card className="sticky top-24 border-stone-200 shadow-lg shadow-stone-200/50">
                  <CardContent className="p-6">
                    <div className="flex items-baseline gap-1">
                      <IndianRupee className="h-5 w-5 text-zinc-900" />
                      <span className="text-3xl font-bold text-zinc-900" style={{ fontFamily: "var(--font-playfair)" }}>
                        {trek.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-stone-400">
                        / person
                      </span>
                    </div>

                    <Separator className="my-6" />

                    <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-900">
                      What is Included
                    </h3>
                    <ul className="mt-4 flex flex-col gap-2.5">
                      {trek.includes.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm text-stone-500"
                        >
                          <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                            <Check className="h-3 w-3 text-emerald-600" />
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <Separator className="my-6" />

                    <BookTrekButton className="w-full" trekName={trek.title} />
                    <p className="mt-3 text-center text-xs text-stone-400">
                      Contact us with any questions before booking.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
