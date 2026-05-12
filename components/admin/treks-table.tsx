"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Edit3, Trash2 } from "lucide-react";
import { deleteTrek } from "@/lib/data-store";
import type { Trek } from "@/lib/data";

export function TreksTable({ treks }: { treks: Trek[] }) {
  const router = useRouter();

  async function handleDelete(_prev: unknown, formData: FormData) {
    const slug = formData.get("slug") as string;
    await deleteTrek(slug);
    router.refresh();
  }

  const [, formAction] = useActionState(handleDelete, null);

  return (
    <div className="clay-card-sm overflow-hidden rounded-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr
              className="text-xs font-bold uppercase tracking-widest text-[#8B7355]"
              style={{ background: "#F5F0E8" }}
            >
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Difficulty</th>
              <th className="px-6 py-4">Duration</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {treks.map((trek) => (
              <tr
                key={trek.slug}
                className="border-t border-[#E8D5B7]/50 transition-colors hover:bg-[#F5F0E8]/50"
              >
                <td className="px-6 py-4">
                  <div>
                    <span className="font-medium text-[#2D5016]">
                      {trek.title}
                    </span>
                    {trek.featured && (
                      <span
                        className="ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                        style={{
                          background: "rgba(45,80,22,0.1)",
                          color: "#2D5016",
                        }}
                      >
                        Featured
                      </span>
                    )}
                    {trek.upcoming && (
                      <span
                        className="ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                        style={{
                          background: "rgba(196,98,45,0.1)",
                          color: "#C4622D",
                        }}
                      >
                        Upcoming
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-[#8B7355]">{trek.location}</td>
                <td className="px-6 py-4">
                  <DifficultyBadge difficulty={trek.difficulty} />
                </td>
                <td className="px-6 py-4 text-[#8B7355]">{trek.duration}</td>
                <td className="px-6 py-4 font-medium text-[#2D5016]">
                  ₹{trek.price}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/treks/${trek.slug}/edit`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-[#4A7C3F]/10"
                      style={{ color: "#4A7C3F" }}
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                    </Link>
                    <form action={formAction}>
                      <input type="hidden" name="slug" value={trek.slug} />
                      <button
                        type="submit"
                        onClick={(e) => {
                          if (
                            !confirm(
                              `Are you sure you want to delete "${trek.title}"?`
                            )
                          ) {
                            e.preventDefault();
                          }
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-red-50"
                        style={{ color: "#C4622D" }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DifficultyBadge({
  difficulty,
}: {
  difficulty: Trek["difficulty"];
}) {
  const styles: Record<string, { bg: string; color: string }> = {
    Easy: { bg: "rgba(184,212,170,0.85)", color: "#1A3008" },
    Moderate: { bg: "rgba(232,213,183,0.85)", color: "#6B4A1A" },
    Challenging: { bg: "rgba(232,147,90,0.85)", color: "#4A1A08" },
    Extreme: { bg: "rgba(220,80,60,0.85)", color: "#3A0A08" },
  };

  const style = styles[difficulty] ?? styles.Moderate;

  return (
    <span
      className="rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider"
      style={style}
    >
      {difficulty}
    </span>
  );
}
