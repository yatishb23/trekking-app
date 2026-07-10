import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { LoginForm } from "@/components/admin/login-form";
import { Mountain } from "lucide-react";

export default async function AdminLoginPage() {
  const isAuthenticated = await getAdminSession();
  if (isAuthenticated) redirect("/admin/dashboard");

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50 p-6">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-stone-200 bg-white p-10 shadow-sm">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-zinc-950 text-white">
              <Mountain className="h-6 w-6" />
            </div>
            <h1
              className="text-2xl font-light text-zinc-950"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Admin Login
            </h1>
            <p className="mt-1 text-sm text-stone-400">
              Miles with Nature
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
