"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { createTrek, updateTrek } from "@/lib/data-store";
import type { Trek } from "@/lib/data";

const difficulties = ["Easy", "Moderate", "Challenging", "Extreme"] as const;

type State = { error: string | null };

export function TrekForm({ trek }: { trek?: Trek | null }) {
  const router = useRouter();
  const isEditing = !!trek;

  // --- Image parsing helper
  async function parseImage(formData: FormData): Promise<string> {
    const file = formData.get("image") as File;
    const existingImagePath = formData.get("existingImage") as string;

    if (file && file.size > 0) {
      if (file.size > 5 * 1024 * 1024)
        throw new Error("Image must be less than 5MB");
      const buffer = await file.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");
      return `data:${file.type};base64,${base64}`;
    }

    if (existingImagePath) return existingImagePath;
    throw new Error("Image is required");
  }

  async function handleSubmit(
    _prev: State,
    formData: FormData,
  ): Promise<State> {
    let imageString = "";
    try {
      imageString = await parseImage(formData);
    } catch (e) {
      return { error: (e as Error).message };
    }

    const data: Trek = {
      slug: formData.get("slug") as string,
      title: formData.get("title") as string,
      location: formData.get("location") as string,
      duration: formData.get("duration") as string,
      difficulty: formData.get("difficulty") as Trek["difficulty"],
      altitude: formData.get("altitude") as string,
      price: Number(formData.get("price")),
      image: imageString,
      shortDescription: formData.get("shortDescription") as string,
      description: formData.get("description") as string,
      highlights: (formData.get("highlights") as string)
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      itinerary: [
        {
          day: 1,
          title: "Day 1",
          description: formData.get("itinerary") as string,
        },
      ],
      bestSeason: formData.get("bestSeason") as string,
      groupSize: formData.get("groupSize") as string,
      includes: (formData.get("includes") as string)
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      featured: formData.get("featured") === "on",
      upcoming: formData.get("upcoming") === "on",
    };

    try {
      if (isEditing && trek) {
        await updateTrek(trek.slug, data);
      } else {
        await createTrek(data);
      }
      router.push("/admin/treks");
      return { error: null };
    } catch (e) {
      return { error: (e as Error).message };
    }
  }

  const [state, formAction] = useActionState<State, FormData>(handleSubmit, {
    error: null,
  });

  return (
    <form action={formAction}>
      {state.error && (
        <div
          className="mb-6 rounded-xl px-4 py-3 text-sm font-medium"
          style={{
            background: "rgba(220,80,60,0.1)",
            color: "#8B1A0A",
          }}
        >
          {state.error}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left column */}
        <div className="space-y-5">
          <Field
            label="Title"
            name="title"
            defaultValue={trek?.title}
            required
          />
          <Field label="Slug" name="slug" defaultValue={trek?.slug} required />
          <Field
            label="Location"
            name="location"
            defaultValue={trek?.location}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Duration"
              name="duration"
              defaultValue={trek?.duration}
              required
            />
            <Field
              label="Altitude"
              name="altitude"
              defaultValue={trek?.altitude}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-[#8B7355]">
                Difficulty
              </label>
              <select
                name="difficulty"
                defaultValue={trek?.difficulty ?? "Moderate"}
                className="w-full rounded-2xl border-none px-4 py-3 text-sm outline-none ring-1 ring-[#E8D5B7] focus:ring-2 focus:ring-[#4A7C3F]"
                style={{ background: "#FDFAF5", color: "#2C2816" }}
              >
                {difficulties.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <Field
              label="Price (₹)"
              name="price"
              type="number"
              defaultValue={trek?.price?.toString()}
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-[#8B7355]">
              Image Upload
            </label>
            <input
              name="image"
              type="file"
              accept="image/*"
              className="w-full rounded-2xl border-none px-4 py-3 text-sm outline-none ring-1 ring-[#E8D5B7] focus:ring-2 focus:ring-[#4A7C3F]"
              style={{ background: "#FDFAF5", color: "#2C2816" }}
            />
            {trek?.image && (
              <div className="mt-2 text-xs text-[#8B7355]">
                Current image uploaded/stored. Selecting a new file will
                overwrite it.
                <input type="hidden" name="existingImage" value={trek.image} />
              </div>
            )}
          </div>
          <Field
            label="Best Season"
            name="bestSeason"
            defaultValue={trek?.bestSeason}
            required
          />
          <Field
            label="Group Size"
            name="groupSize"
            defaultValue={trek?.groupSize}
            required
          />
        </div>

        {/* Right column */}
        <div className="space-y-5">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-[#8B7355]">
              Short Description
            </label>
            <textarea
              name="shortDescription"
              defaultValue={trek?.shortDescription}
              required
              rows={3}
              className="w-full rounded-2xl border-none px-4 py-3 text-sm outline-none ring-1 ring-[#E8D5B7] placeholder:text-[#B8A88A] focus:ring-2 focus:ring-[#4A7C3F]"
              style={{
                background: "#FDFAF5",
                color: "#2C2816",
                resize: "vertical",
              }}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-[#8B7355]">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={trek?.description}
              required
              rows={5}
              className="w-full rounded-2xl border-none px-4 py-3 text-sm outline-none ring-1 ring-[#E8D5B7] placeholder:text-[#B8A88A] focus:ring-2 focus:ring-[#4A7C3F]"
              style={{
                background: "#FDFAF5",
                color: "#2C2816",
                resize: "vertical",
              }}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-[#8B7355]">
              Highlights (one per line)
            </label>
            <textarea
              name="highlights"
              defaultValue={trek?.highlights?.join("\n")}
              rows={4}
              className="w-full rounded-2xl border-none px-4 py-3 text-sm outline-none ring-1 ring-[#E8D5B7] placeholder:text-[#B8A88A] focus:ring-2 focus:ring-[#4A7C3F]"
              style={{
                background: "#FDFAF5",
                color: "#2C2816",
                resize: "vertical",
              }}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-[#8B7355]">
              Includes (one per line)
            </label>
            <textarea
              name="includes"
              defaultValue={trek?.includes?.join("\n")}
              rows={4}
              className="w-full rounded-2xl border-none px-4 py-3 text-sm outline-none ring-1 ring-[#E8D5B7] placeholder:text-[#B8A88A] focus:ring-2 focus:ring-[#4A7C3F]"
              style={{
                background: "#FDFAF5",
                color: "#2C2816",
                resize: "vertical",
              }}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-[#8B7355]">
              Itinerary (description)
            </label>
            <textarea
              name="itinerary"
              defaultValue={trek?.itinerary?.[0]?.description ?? ""}
              rows={3}
              className="w-full rounded-2xl border-none px-4 py-3 text-sm outline-none ring-1 ring-[#E8D5B7] placeholder:text-[#B8A88A] focus:ring-2 focus:ring-[#4A7C3F]"
              style={{
                background: "#FDFAF5",
                color: "#2C2816",
                resize: "vertical",
              }}
            />
          </div>

          {/* Toggles */}
          <div className="flex gap-6 pt-2">
            <label className="flex items-center gap-2 text-sm text-[#2D5016]">
              <input
                type="checkbox"
                name="featured"
                defaultChecked={trek?.featured}
                className="h-4 w-4 rounded accent-[#4A7C3F]"
              />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm text-[#2D5016]">
              <input
                type="checkbox"
                name="upcoming"
                defaultChecked={trek?.upcoming}
                className="h-4 w-4 rounded accent-[#C4622D]"
              />
              Upcoming
            </label>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="mt-10 flex items-center gap-4">
        <button
          type="submit"
          className="btn-clay-primary rounded-full px-8 py-3 text-xs"
        >
          {isEditing ? "Update Trek" : "Create Trek"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-full px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#8B7355] transition-colors hover:text-[#2D5016]"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-[#8B7355]"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        className="w-full rounded-2xl border-none px-4 py-3 text-sm outline-none ring-1 ring-[#E8D5B7] placeholder:text-[#B8A88A] transition-all focus:ring-2 focus:ring-[#4A7C3F]"
        style={{ background: "#FDFAF5", color: "#2C2816" }}
      />
    </div>
  );
}
