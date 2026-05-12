"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/lib/data-store";

function LoginFormInner({
  error,
}: {
  error: string | null;
}) {
  return (
    <div>
      {error && (
        <div
          className="mb-4 rounded-xl px-4 py-3 text-sm font-medium"
          style={{
            background: "rgba(220,80,60,0.1)",
            color: "#8B1A0A",
          }}
        >
          {error}
        </div>
      )}
      <div className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-[#8B7355]"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-2xl border-none px-4 py-3 text-sm outline-none ring-1 ring-[#E8D5B7] transition-all placeholder:text-[#B8A88A] focus:ring-2 focus:ring-[#4A7C3F]"
            style={{
              background: "#FDFAF5",
              color: "#2C2816",
            }}
            placeholder="admin@mileswithnature.com"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-[#8B7355]"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full rounded-2xl border-none px-4 py-3 text-sm outline-none ring-1 ring-[#E8D5B7] transition-all placeholder:text-[#B8A88A] focus:ring-2 focus:ring-[#4A7C3F]"
            style={{
              background: "#FDFAF5",
              color: "#2C2816",
            }}
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="btn-clay-primary w-full justify-center py-3.5 text-xs"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

type State = { error: string | null };

export function LoginForm() {
  const router = useRouter();

  async function handleSubmit(
    _prev: State,
    formData: FormData
  ): Promise<State> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const result = await loginAdmin(email, password);
    if (result.success) {
      router.push("/admin/dashboard");
      return { error: null };
    }
    return { error: result.error ?? "Login failed" };
  }

  const [state, formAction] = useActionState<State, FormData>(handleSubmit, {
    error: null,
  });

  return (
    <form action={formAction}>
      <LoginFormInner error={state.error} />
    </form>
  );
}
