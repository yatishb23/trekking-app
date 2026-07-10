"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/treks", label: "Treks" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/safety", label: "Safety" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full px-4 sm:px-6 lg:px-8 pt-4 sm:pt-5 pointer-events-none">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "pointer-events-auto flex w-full max-w-6xl items-center justify-between rounded-2xl border border-black/[0.06] bg-white/80 px-5 py-3 backdrop-blur-2xl transition-shadow duration-300 sm:px-6",
            scrolled
              ? "shadow-[0_2px_40px_rgb(0,0,0,0.08)]"
              : "shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          )}
        >
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-zinc-950 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-zinc-950/20">
              <Image
                src="/logo.png"
                alt="Logo"
                width={20}
                height={20}
                priority
                className="object-contain brightness-0 invert"
              />
            </div>
            <span className="font-serif text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl">
              Miles with <em className="font-light italic text-stone-500">Nature</em>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 rounded-xl",
                      isActive
                        ? "text-zinc-900 bg-zinc-950/[0.05]"
                        : "text-stone-500 hover:text-zinc-900 hover:bg-zinc-950/[0.04]"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* DESKTOP CTA */}
          <div className="hidden lg:block">
            <Link
              href="/treks"
              className="inline-flex items-center justify-center rounded-xl bg-zinc-950 px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-zinc-800 hover:shadow-lg hover:shadow-zinc-950/20 hover:-translate-y-px"
            >
              Book Now
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950/[0.05] text-zinc-900 transition-all duration-300 hover:bg-zinc-950/[0.1] lg:hidden"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-4 w-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-4 w-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </motion.nav>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-4 right-4 top-20 rounded-2xl border border-black/[0.08] bg-white/95 p-6 shadow-2xl backdrop-blur-2xl"
            >
              <nav className="flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.04 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center rounded-xl px-4 py-3 text-sm font-medium tracking-wide transition-all duration-200",
                          isActive
                            ? "bg-zinc-950/[0.05] text-zinc-900"
                            : "text-stone-600 hover:bg-zinc-950/[0.03] hover:text-zinc-900"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="mt-4 border-t border-black/[0.06] pt-4">
                <Link
                  href="/treks"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center rounded-xl bg-zinc-950 px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-zinc-800"
                >
                  Book Your Trek
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
