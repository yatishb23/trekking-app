"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Mountain,
  Users,
  Images,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { logoutAdminAction } from "@/lib/data-store";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/treks", label: "Treks", icon: Mountain },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
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
    <div className="flex min-h-screen bg-gray-50 w-[100vw] ml-[calc(50%-50vw)]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-zinc-950/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-white border-r border-gray-200 transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-gray-100">
          <Link href="/admin/dashboard" className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-950 transition-transform group-hover:scale-105">
              <Mountain className="h-4 w-4 text-white" />
            </div>
            <span className="font-serif text-lg font-medium text-zinc-900">
              Admin
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 hover:text-zinc-900 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-2 p-4">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-zinc-950 text-white shadow-md"
                    : "text-gray-500 hover:bg-gray-100 hover:text-zinc-900"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 transition-all hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between bg-white border-b border-gray-200 px-6 py-4 lg:px-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-500 hover:text-zinc-900 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="text-right ml-auto">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400">
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
