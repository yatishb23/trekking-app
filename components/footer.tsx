"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, MapPin, Instagram } from "lucide-react";
import Image from "next/image";

const quickLinks = [
  { href: "/treks", label: "Upcoming Treks" },
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
  { href: "/safety", label: "Safety Guidelines" },
  { href: "/contact", label: "Contact Us" },
];

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="border-t border-stone-200 bg-stone-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-center gap-2.5 group w-max">
              <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-zinc-950 transition-all duration-300 group-hover:shadow-lg">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={18}
                  height={18}
                  priority
                  className="object-contain brightness-0 invert"
                />
              </div>
              <span className="font-serif text-xl font-semibold tracking-tight text-zinc-900">
                Miles with <em className="font-light italic text-stone-400">Nature</em>
              </span>
            </Link>
            <p className="mt-6 max-w-sm font-serif text-sm font-light italic leading-relaxed text-stone-400">
              &ldquo;To climb mountains is to discover what they are made of, and what you are made of.&rdquo;
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone-500">
              We are a passionate group of trekkers based in Pune, exploring the
              magnificent Sahyadri ranges and forts of Maharashtra.
            </p>
            <div className="mt-8">
              <a
                href="https://www.instagram.com/miles_with_nature"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-400 transition-all duration-300 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white hover:shadow-lg"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 lg:col-start-7">
            <h3 className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-900">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-500 transition-colors duration-200 hover:text-zinc-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h3 className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-900">
              Get in Touch
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-stone-100">
                  <MapPin className="h-3.5 w-3.5 text-stone-400" />
                </div>
                <span className="pt-1 text-sm text-stone-500">
                  Pune, Maharashtra, India
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-stone-100">
                  <Phone className="h-3.5 w-3.5 text-stone-400" />
                </div>
                <div className="flex flex-col gap-1.5 pt-1 text-sm text-stone-500">
                  <a href="tel:+918308083818" className="transition-colors hover:text-zinc-900">
                    +91 83080 83818
                  </a>
                  <a href="tel:+919226501308" className="transition-colors hover:text-zinc-900">
                    +91 92265 01308
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-stone-200 py-8 sm:flex-row">
          <p className="text-xs text-stone-400">
            &copy; {new Date().getFullYear()} Miles With Nature. All rights reserved.
          </p>
          <p className="text-xs text-stone-400">
            Crafted with care in Pune, India
          </p>
        </div>
      </div>
    </footer>
  );
}
