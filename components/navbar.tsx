"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/treks", label: "Treks" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/safety", label: "Safety" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-full max-w-7xl px-6">
      <nav
        className="flex items-center justify-between rounded-full px-6 py-3"
        style={{
          background: "rgba(253,250,245,0.85)",
          backdropFilter: "blur(20px)",
          boxShadow:
            "0 8px 32px rgba(45,80,22,0.14), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.7)",
        }}
      >
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className="flex h-10 w-10 items-center justify-center overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #4A7C3F, #2D5016)",
              borderRadius: "50% 40% 50% 38%",
              boxShadow:
                "0 4px 12px rgba(74,124,63,0.4), inset 0 1px 0 rgba(255,255,255,0.3)",
            }}
          >
            <Image
              src="/logo.png"
              alt="Miles With Nature Logo"
              width={28}
              height={28}
              priority
              className="object-contain"
            />
          </div>
          <span
            className="font-serif text-xl font-medium tracking-tight"
            style={{ color: "#2D5016" }}
          >
            Miles with{" "}
            <em className="font-light not-italic italic" style={{ color: "#8B7355" }}>
              Nature
            </em>
          </span>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-300 rounded-full",
                    isActive
                      ? "text-[#2D5016]"
                      : "text-[#8B7355] hover:text-[#2D5016]"
                  )}
                  style={
                    isActive
                      ? { background: "rgba(74,124,63,0.1)" }
                      : {}
                  }
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
            className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #2D5016, #4A7C3F)",
              boxShadow:
                "0 4px 16px rgba(45,80,22,0.35), inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
          >
            Book Now
          </Link>
        </div>

        {/* MOBILE MENU */}
        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                style={{ color: "#2D5016" }}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex w-full flex-col p-0 sm:w-[380px]"
              style={{ background: "#FDFAF5", borderLeft: "1px solid rgba(184,212,170,0.3)" }}
            >
              <SheetHeader className="p-10 pb-6 text-left">
                <SheetTitle
                  className="text-[11px] font-bold uppercase tracking-[0.25em]"
                  style={{ color: "#8B7355" }}
                >
                  Navigation
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 px-10">
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="font-serif block text-4xl font-medium tracking-tighter transition-colors duration-300"
                        style={{
                          color:
                            pathname === link.href ? "#2D5016" : "rgba(139,115,85,0.4)",
                        }}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>
              <div
                className="p-10 pt-6"
                style={{ borderTop: "1px solid rgba(184,212,170,0.2)" }}
              >
                <div
                  className="flex items-center gap-6 text-[10px] font-medium uppercase tracking-widest"
                  style={{ color: "#8B7355" }}
                >
                  <span>Maharashtra</span>
                  <span
                    className="h-px w-8"
                    style={{ background: "rgba(184,212,170,0.4)" }}
                  />
                  <span>Since 2022</span>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}