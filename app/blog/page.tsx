import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, User } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { blogPosts } from "@/lib/data"

export const metadata: Metadata = {
  title: "Blog | Miles With Nature",
  description:
    "Tips, stories, and guides from the trails. Read our blog for trekking inspiration and practical advice.",
}

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        {/* Hero */}
        <section className="bg-stone-50 py-32 text-center px-6 sm:py-40">
          <div className="mx-auto max-w-3xl mt-10">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-900 shadow-sm">
              From the Trail
            </span>
            <h1 className="text-5xl font-light tracking-tight text-zinc-900 sm:text-6xl md:text-7xl" style={{ fontFamily: "var(--font-playfair)" }}>
              Our <em className="italic text-stone-400">Journal</em>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg font-light leading-relaxed text-stone-500">
              Stories, guides, and insights from seasoned trekkers to help you
              prepare for your next adventure.
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-200/60"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute left-4 top-4 rounded-lg border border-white/20 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-900 backdrop-blur-md">
                      {post.category}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <div className="flex items-center gap-4 text-xs text-stone-400">
                      <span className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(post.date).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <h3 className="mt-4 text-xl font-medium tracking-tight text-zinc-900 transition-colors duration-300 group-hover:text-stone-600 line-clamp-2" style={{ fontFamily: "var(--font-playfair)" }}>
                      {post.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm font-light leading-relaxed text-stone-400 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-900 transition-colors duration-300 group-hover:text-stone-400">
                      Read Article
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {blogPosts.length === 0 && (
              <div className="py-32 text-center">
                <p className="text-lg font-light text-stone-400">
                  No journal entries available at the moment. Check back soon!
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
