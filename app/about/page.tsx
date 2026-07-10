import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Mountain, Heart, TreePine, Users } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "About Us | Miles With Nature",
  description:
    "Learn about our mission to connect people with the mountains through safe, sustainable, and unforgettable trekking experiences.",
}

const values = [
  {
    icon: Mountain,
    title: "Adventure",
    description:
      "We believe in pushing boundaries and discovering what lies beyond the next ridge. Every trek is an opportunity for growth.",
  },
  {
    icon: Heart,
    title: "Passion",
    description:
      "The mountains are not just our workplace, they are our home. We bring genuine love for the outdoors to every expedition.",
  },
  {
    icon: TreePine,
    title: "Sustainability",
    description:
      "We practice and preach Leave No Trace principles. Our treks are designed to minimize environmental impact.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Trekking is better together. We foster a welcoming community where lifelong friendships are formed on the trail.",
  },
]

const stats = [
  { value: "200+", label: "Treks Completed" },
  { value: "3,000+", label: "Happy Trekkers" },
  { value: "50+", label: "Unique Routes" },
  { value: "8+", label: "Years Experience" },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Hero */}
        <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-stone-900 sm:min-h-[60vh]">
          <Image
            src="/images/about-team.jpg"
            alt="Our trekking team at a campsite"
            fill
            priority
            className="object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center mt-20">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white/80 backdrop-blur-md">
              Our Story
            </span>
            <h1 className="text-5xl font-light tracking-tight text-white sm:text-6xl md:text-7xl" style={{ fontFamily: "var(--font-playfair)" }}>
              Miles With <em className="italic text-stone-400">Nature</em>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-white/60 sm:text-xl">
              Born from a love for the mountains and a desire to share the magic
              of the trails with fellow adventurers.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-900">
                  Who We Are
                </span>
                <h2 className="mt-4 text-4xl font-light tracking-tight text-zinc-900 sm:text-5xl" style={{ fontFamily: "var(--font-playfair)" }}>
                  A Team of Mountain <em className="italic text-stone-400">Enthusiasts</em>
                </h2>
                <div className="mt-8 flex flex-col gap-5 text-base font-light leading-relaxed text-stone-500">
                  <p>
                    Miles With Nature was founded with a simple belief: the
                    mountains have the power to transform lives. What started as
                    a small group of friends exploring local trails has grown
                    into a community of thousands of passionate trekkers.
                  </p>
                  <p>
                    Our team comprises experienced mountaineers, certified
                    wilderness first responders, and nature enthusiasts who have
                    spent years exploring the Himalayas and beyond. We combine
                    this deep local knowledge with meticulous safety planning to
                    create trekking experiences that are both thrilling and
                    secure.
                  </p>
                  <p>
                    We are committed to responsible tourism. Every trek we
                    organize follows strict environmental guidelines, supports
                    local communities, and aims to leave the mountains better
                    than we found them.
                  </p>
                </div>
                <Link
                  href="/treks"
                  className="mt-10 inline-flex items-center gap-2.5 rounded-xl bg-zinc-950 px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-zinc-800 hover:shadow-xl hover:shadow-zinc-950/20 hover:-translate-y-0.5"
                >
                  See Our Treks <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-stone-100">
                <Image
                  src="/images/gallery-2.jpg"
                  alt="Campsite in mountain valley at dusk"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-stone-200 bg-stone-50 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-4xl font-light text-zinc-900 sm:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-playfair)" }}>
                    {stat.value}
                  </p>
                  <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-900">
                Our Values
              </span>
              <h2 className="mt-4 text-4xl font-light tracking-tight text-zinc-900 sm:text-5xl" style={{ fontFamily: "var(--font-playfair)" }}>
                What Drives Us <em className="italic text-stone-400">Forward</em>
              </h2>
              <p className="mt-5 text-lg font-light leading-relaxed text-stone-500">
                These core principles guide every decision we make and every trail we choose.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="group flex flex-col rounded-2xl border border-stone-200 bg-stone-50 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-zinc-950 hover:bg-zinc-950 hover:shadow-2xl hover:shadow-zinc-950/20 sm:p-8"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-stone-200 bg-white transition-all duration-500 group-hover:border-white/10 group-hover:bg-white/10">
                    <value.icon className="h-5 w-5 text-zinc-900 transition-colors duration-500 group-hover:text-white" />
                  </div>
                  <h3 className="text-lg font-medium text-zinc-900 transition-colors duration-500 group-hover:text-white" style={{ fontFamily: "var(--font-playfair)" }}>
                    {value.title}
                  </h3>
                  <p className="mt-3 flex-auto text-sm font-light leading-relaxed text-stone-500 transition-colors duration-500 group-hover:text-stone-300">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-stone-50 border-y border-stone-200 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-900 shadow-sm">
                The Team
              </span>
              <h2 className="mt-4 text-4xl font-light tracking-tight text-zinc-900 sm:text-5xl" style={{ fontFamily: "var(--font-playfair)" }}>
                Meet Our Expert <em className="italic text-stone-400">Guides</em>
              </h2>
              <p className="mt-5 text-lg font-light leading-relaxed text-stone-500">
                Our experienced leaders ensure your safety and make every trek memorable.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Sagar Shinde",
                  role: "Lead Trekker & Founder",
                  image: "/images/team-1.jpg",
                  bio: "With over 10 years of experience in the Sahyadris, Sagar has led 200+ treks.",
                },
                {
                  name: "Anjali Deshmukh",
                  role: "Safety Expert",
                  image: "/images/team-2.jpg",
                  bio: "Certified Wilderness First Responder with a passion for mountain flora.",
                },
                {
                  name: "Vikram Pawar",
                  role: "Senior Guide",
                  image: "/images/team-3.jpg",
                  bio: "Expert in navigation and historical knowledge of Maratha forts.",
                },
              ].map((member) => (
                <div key={member.name} className="group overflow-hidden rounded-2xl border border-stone-200 bg-white transition-all duration-500 hover:shadow-xl hover:shadow-stone-200/60">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <h3 className="text-xl font-medium text-white" style={{ fontFamily: "var(--font-playfair)" }}>{member.name}</h3>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.15em] text-stone-300">{member.role}</p>
                    <p className="mt-3 text-sm font-light leading-relaxed text-stone-300/80 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
