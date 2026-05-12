"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, MapPin, Instagram } from "lucide-react";

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
    <footer
      className="mx-6 mb-6"
      style={{
        background: "#FDFAF5",
        borderRadius: "36px 36px 20px 20px",
        padding: "48px",
        boxShadow:
          "0 -8px 32px rgba(45,80,22,0.1), inset 0 1px 0 rgba(255,255,255,0.8)",
      }}
    >
      <div
        className="grid gap-12"
        style={{ gridTemplateColumns: "2fr 1fr 1fr", marginBottom: "40px" }}
      >
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center text-lg"
              style={{
                background: "linear-gradient(135deg, #4A7C3F, #2D5016)",
                borderRadius: "50% 40% 50% 38%",
                boxShadow:
                  "0 4px 12px rgba(74,124,63,0.4), inset 0 1px 0 rgba(255,255,255,0.3)",
              }}
            >
              🏔
            </div>
          </div>
          <p
            className="mt-3 font-serif text-xl font-medium"
            style={{ color: "#2D5016" }}
          >
            Miles with{" "}
            <em className="font-light italic" style={{ color: "#8B7355" }}>
              Nature
            </em>
          </p>
          <p
            className="mt-2 text-sm font-light italic leading-relaxed"
            style={{ color: "#8B7355", fontFamily: "Georgia, serif" }}
          >
            "To climb mountains is to discover what they are made of, and what
            you are made of."
          </p>
          <p
            className="mt-3 text-sm font-light leading-relaxed"
            style={{ color: "rgba(139,115,85,0.75)" }}
          >
            We are a passionate group of trekkers based in Pune, exploring the
            magnificent Sahyadri ranges and forts of Maharashtra. Join us to
            discover the Western Ghats.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href="https://www.instagram.com/miles_with_nature"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200"
              style={{
                background: "rgba(74,124,63,0.1)",
                color: "#4A7C3F",
                boxShadow: "0 2px 8px rgba(74,124,63,0.1)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#4A7C3F";
                (e.currentTarget as HTMLElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(74,124,63,0.1)";
                (e.currentTarget as HTMLElement).style.color = "#4A7C3F";
              }}
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3
            className="mb-5 text-sm font-semibold uppercase tracking-wider"
            style={{
              fontFamily: "Georgia, serif",
              color: "#2D5016",
              letterSpacing: "0.12em",
            }}
          >
            Quick Links
          </h3>
          <ul className="flex flex-col gap-3">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-light transition-colors duration-200"
                  style={{ color: "#8B7355" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3
            className="mb-5 text-sm font-semibold uppercase tracking-wider"
            style={{
              fontFamily: "Georgia, serif",
              color: "#2D5016",
              letterSpacing: "0.12em",
            }}
          >
            Get in Touch
          </h3>
          <ul className="flex flex-col gap-4">
            <li className="flex items-start gap-3 text-sm" style={{ color: "#8B7355" }}>
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                style={{ background: "rgba(74,124,63,0.1)", color: "#4A7C3F", marginTop: 1 }}
              >
                <MapPin className="h-3.5 w-3.5" />
              </span>
              <span className="font-light">Pune, Maharashtra, India</span>
            </li>
            <li className="flex items-start gap-3 text-sm" style={{ color: "#8B7355" }}>
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                style={{ background: "rgba(74,124,63,0.1)", color: "#4A7C3F", marginTop: 1 }}
              >
                <Phone className="h-3.5 w-3.5" />
              </span>
              <div className="flex flex-col gap-1 font-light">
                <a href="tel:+917020212486" className="hover:text-[#2D5016] transition-colors">
                  +91 70202 12486
                </a>
                <a href="tel:+919561026436" className="hover:text-[#2D5016] transition-colors">
                  +91 95610 26436
                </a>
              </div>
            </li>
            <li className="flex items-center gap-3 text-sm" style={{ color: "#8B7355" }}>
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                style={{ background: "rgba(74,124,63,0.1)", color: "#4A7C3F" }}
              >
                <Instagram className="h-3.5 w-3.5" />
              </span>
              <a
                href="https://www.instagram.com/miles_with_nature"
                target="_blank"
                rel="noopener noreferrer"
                className="font-light hover:text-[#2D5016] transition-colors"
              >
                @miles_with_nature
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="flex flex-col items-center justify-between gap-4 pt-7 text-xs sm:flex-row"
        style={{
          borderTop: "1.5px solid rgba(184,212,170,0.3)",
          color: "rgba(139,115,85,0.6)",
        }}
      >
        <p>© 2026 Miles With Nature. All rights reserved.</p>
        <div className="flex gap-6">
          <Link
            href="/safety"
            className="transition-colors hover:text-[#4A7C3F]"
          >
            Safety Policy
          </Link>
          <Link
            href="/contact"
            className="transition-colors hover:text-[#4A7C3F]"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}