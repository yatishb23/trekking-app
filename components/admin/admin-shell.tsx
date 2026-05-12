"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Mountain,
  Users,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { logoutAdminAction } from "@/lib/data-store";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/treks", label: "Treks", icon: Mountain },
  { href: "/admin/users", label: "Users", icon: Users },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function handleLogout() {
    await logoutAdminAction();
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen bg-[#EDE8DC]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background: "linear-gradient(180deg, #2D5016, #1A3008)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-6">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center text-lg"
              style={{
                background: "rgba(255,255,255,0.15)",
                borderRadius: "50% 40% 50% 38%",
              }}
            >
              🏔
            </div>
            <span className="font-serif text-lg font-medium text-white/90">
              Admin
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white/60 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-4">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? "text-white shadow-lg"
                    : "text-white/60 hover:text-white"
                }`}
                style={
                  isActive
                    ? {
                        background: "rgba(255,255,255,0.12)",
                      }
                    : {}
                }
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-4 pb-6">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-white/50 transition-all hover:bg-white/5 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Top bar */}
        <header
          className="flex items-center justify-between px-6 py-4 lg:px-10"
          style={{ background: "#FDFAF5" }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-[#2D5016] lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="text-right">
            <p className="text-xs font-medium text-[#8B7355]">
              Miles with Nature
            </p>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
