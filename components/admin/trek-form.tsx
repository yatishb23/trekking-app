"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { createTrek, updateTrek } from "@/lib/data-store";
import { uploadTrekImages } from "@/lib/upload";
import type { Trek } from "@/lib/data";

const difficulties = ["Easy", "Moderate", "Challenging", "Extreme"] as const;

type State = { error: string | null };

export function TrekForm({ trek }: { trek?: Trek | null }) {
  const router = useRouter();
  const isEditing = !!trek;
  const [existingImages, setExistingImages] = useState<string[]>(trek?.images || []);

  async function parseImages(formData: FormData): Promise<string[]> {
    const files = formData.getAll("images") as File[];
    
    // Only upload files that actually have data
    const validFiles = files.filter(f => f && f.size > 0);
    let newImagePaths: string[] = [];
    
    if (validFiles.length > 0) {
      newImagePaths = await uploadTrekImages(validFiles);
    }

    return [...existingImages, ...newImagePaths];
  }

  async function handleSubmit(
    _prev: State,
    formData: FormData,
  ): Promise<State> {
    let imagesArray: string[] = [];
    try {
      imagesArray = await parseImages(formData);
    } catch (e) {
      return { error: (e as Error).message };
    }

    if (imagesArray.length === 0) {
      return { error: "At least one image is required" };
    }

    const data: Trek = {
      slug: formData.get("slug") as string,
      title: formData.get("title") as string,
      location: formData.get("location") as string,
      duration: formData.get("duration") as string,
      difficulty: formData.get("difficulty") as Trek["difficulty"],
      altitude: formData.get("altitude") as string,
      price: Number(formData.get("price")),
      images: imagesArray,
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

  const [state, formAction, isPending] = useActionState(handleSubmit, {
    error: null,
  });

  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <form action={formAction} className="mx-auto max-w-4xl space-y-8 rounded-xl bg-white p-8 shadow-sm border border-gray-100">
      {state?.error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-600 border border-red-100">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Left column */}
        <div className="space-y-5">
          <Field label="Title" name="title" defaultValue={trek?.title} required />
          <Field label="Slug" name="slug" defaultValue={trek?.slug} required />
          <Field label="Location" name="location" defaultValue={trek?.location} required />

          <div className="grid grid-cols-2 gap-4">
            <Field label="Duration" name="duration" defaultValue={trek?.duration} required />
            <Field label="Altitude" name="altitude" defaultValue={trek?.altitude} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                Difficulty
              </label>
              <select
                name="difficulty"
                defaultValue={trek?.difficulty}
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
              >
                {difficulties.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <Field label="Price (₹)" name="price" type="number" defaultValue={trek?.price?.toString()} required />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">
              Images Upload
            </label>
            <input
              name="images"
              type="file"
              accept="image/*"
              multiple
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
            />
            {existingImages.length > 0 && (
              <div className="mt-4">
                <p className="text-xs text-gray-500 mb-2">Existing Images:</p>
                <div className="flex flex-wrap gap-2">
                  {existingImages.map((img, i) => (
                    <div key={i} className="relative group w-20 h-20 rounded-md overflow-hidden border border-gray-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt={`Preview ${i}`} className="object-cover w-full h-full" />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(i)}
                        className="absolute inset-0 bg-zinc-950/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <Field label="Best Season" name="bestSeason" defaultValue={trek?.bestSeason} required />
          <Field label="Group Size" name="groupSize" defaultValue={trek?.groupSize} required />
        </div>

        {/* Right column */}
        <div className="space-y-5">
          <TextAreaField label="Short Description" name="shortDescription" defaultValue={trek?.shortDescription} required rows={3} />
          <TextAreaField label="Description" name="description" defaultValue={trek?.description} required rows={5} />
          <TextAreaField label="Highlights (one per line)" name="highlights" defaultValue={trek?.highlights?.join("\n")} rows={4} />
          <TextAreaField label="Includes (one per line)" name="includes" defaultValue={trek?.includes?.join("\n")} rows={4} />
          <TextAreaField label="Itinerary (description)" name="itinerary" defaultValue={trek?.itinerary?.[0]?.description ?? ""} rows={3} />

          {/* Toggles */}
          <div className="flex gap-6 pt-2">
            <label className="flex items-center gap-2 text-sm text-gray-700 font-medium">
              <input type="checkbox" name="featured" defaultChecked={trek?.featured} className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700 font-medium">
              <input type="checkbox" name="upcoming" defaultChecked={trek?.upcoming} className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" />
              Upcoming
            </label>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="mt-8 flex items-center gap-4 pt-4 border-t border-gray-100">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-zinc-950 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
        >
          {isPending ? "Saving..." : isEditing ? "Update Trek" : "Create Trek"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-md px-4 py-2.5 text-sm font-semibold text-gray-500 hover:text-black transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function Field({ label, name, defaultValue, type = "text", required = false }: any) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none transition-colors focus:border-black focus:ring-1 focus:ring-black"
      />
    </div>
  );
}

function TextAreaField({ label, name, defaultValue, required = false, rows = 3 }: any) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">
        {label}
      </label>
      <textarea
        name={name}
        defaultValue={defaultValue}
        required={required}
        rows={rows}
        className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none transition-colors focus:border-black focus:ring-1 focus:ring-black"
        style={{ resize: "vertical" }}
      />
    </div>
  );
}
