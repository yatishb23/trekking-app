"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/lib/data-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function LoginFormInner({
  error,
}: {
  error: string | null;
}) {
  return (
    <div>
      {error && (
        <div className="mb-4 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm font-medium text-destructive">
          {error}
        </div>
      )}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-[11px] font-bold uppercase tracking-[0.15em] text-stone-400"
          >
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="admin@mileswithnature.com"
            className="h-11 rounded-xl border-stone-200 bg-stone-50 text-sm placeholder:text-stone-300 focus-visible:border-zinc-950 focus-visible:ring-zinc-950/50"
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-[11px] font-bold uppercase tracking-[0.15em] text-stone-400"
          >
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            placeholder="••••••••"
            className="h-11 rounded-xl border-stone-200 bg-stone-50 text-sm placeholder:text-stone-300 focus-visible:border-zinc-950 focus-visible:ring-zinc-950/50"
          />
        </div>
        <Button
          type="submit"
          className="w-full rounded-xl bg-zinc-950 py-5 text-[11px] font-bold uppercase tracking-[0.15em] text-white hover:bg-zinc-900 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
        >
          Sign In
        </Button>
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
