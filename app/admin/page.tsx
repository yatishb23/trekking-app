import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { LoginForm } from "@/components/admin/login-form";

export default async function AdminLoginPage() {
  const isAuthenticated = await getAdminSession();
  if (isAuthenticated) redirect("/admin/dashboard");

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#EDE8DC] p-6">
      <div className="w-full max-w-md">
        <div className="clay-card-sm p-10">
          <div className="mb-8 text-center">
            <div
              className="mx-auto mb-4 flex h-14 w-14 items-center justify-center text-2xl"
              style={{
                background: "linear-gradient(135deg, #4A7C3F, #2D5016)",
                borderRadius: "50% 40% 50% 38%",
                boxShadow:
                  "0 4px 12px rgba(74,124,63,0.4), inset 0 1px 0 rgba(255,255,255,0.3)",
              }}
            >
              🏔
            </div>
            <h1 className="font-serif text-2xl font-semibold text-[#2D5016]">
              Admin Login
            </h1>
            <p className="mt-1 text-sm text-[#8B7355]">
              Miles with Nature
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
