import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { blogPosts } from "@/lib/data"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return { title: "Post Not Found" }
  return {
    title: `${post.title} | Miles With Nature`,
    description: post.excerpt,
  }
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) notFound()

  return (
    <>
      <Navbar />
      <main className="bg-white">
        <article className="pb-24 sm:pb-32">
          {/* Header */}
          <section className="bg-stone-50 pt-32 pb-16 text-center px-6 sm:pt-40">
            <div className="mx-auto max-w-4xl mt-10">
              <Link
                href="/blog"
                className="mb-8 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-900 shadow-sm transition-colors hover:bg-stone-50"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Journal
              </Link>

              <div className="mb-6">
                <span className="inline-block rounded-lg border border-stone-200 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-900">
                  {post.category}
                </span>
              </div>

              <h1 className="text-4xl font-light tracking-tight text-zinc-900 sm:text-5xl md:text-6xl lg:text-7xl" style={{ fontFamily: "var(--font-playfair)" }}>
                {post.title}
              </h1>

              <div className="mt-8 flex items-center justify-center gap-6 text-sm text-stone-400">
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </section>

          <div className="mx-auto max-w-4xl px-6 lg:px-8 -mt-8 relative z-10">
            {/* Featured Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl shadow-2xl bg-stone-100">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>

            {/* Content */}
            <div className="mx-auto mt-14 max-w-3xl sm:mt-16">
              <div className="prose prose-lg prose-stone max-w-none prose-headings:font-serif prose-headings:font-light prose-headings:text-zinc-900 prose-p:font-light prose-p:text-stone-500 prose-p:leading-relaxed prose-strong:font-medium prose-strong:text-zinc-900">
                {post.content.split("\n\n").map((paragraph, index) => {
                  if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                    return (
                      <h3
                        key={index}
                        className="mt-12 mb-6 text-3xl font-light text-zinc-900 first:mt-0"
                      >
                        {paragraph.replace(/\*\*/g, "")}
                      </h3>
                    )
                  }
                  if (paragraph.startsWith("**")) {
                    const parts = paragraph.split("**")
                    return (
                      <p
                        key={index}
                        className="my-6 text-lg font-light leading-relaxed text-stone-500"
                      >
                        <strong className="font-medium text-zinc-900">
                          {parts[1]}
                        </strong>
                        {parts[2]}
                      </p>
                    )
                  }
                  return (
                    <p
                      key={index}
                      className="my-6 text-lg font-light leading-relaxed text-stone-500"
                    >
                      {paragraph}
                    </p>
                  )
                })}
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
