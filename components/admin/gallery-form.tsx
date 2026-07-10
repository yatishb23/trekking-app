"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { createGalleryImage, updateGalleryImage } from "@/lib/data-store";
import { uploadGalleryImages } from "@/lib/upload";
import type { GalleryImage } from "@/lib/data";

const categories = [
  "Mountains",
  "Forts",
  "Sunsets",
  "Camping",
  "Waterfalls",
  "Lakes",
  "Team",
  "Wildlife",
  "Trails",
  "Other",
];

type State = { error: string | null };

export function GalleryForm({ image }: { image?: GalleryImage | null }) {
  const router = useRouter();
  const isEditing = !!image;
  const [existingImage, setExistingImage] = useState<string>(image?.src || "");

  async function handleSubmit(
    _prev: State,
    formData: FormData,
  ): Promise<State> {
    let imageUrl = existingImage;

    // Upload new image if provided
    const file = formData.get("image") as File;
    if (file && file.size > 0) {
      try {
        const paths = await uploadGalleryImages([file]);
        if (paths.length > 0) {
          imageUrl = paths[0];
        }
      } catch (e) {
        return { error: (e as Error).message };
      }
    }

    if (!imageUrl) {
      return { error: "An image is required" };
    }

    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string || "",
      imageUrl,
      category: formData.get("category") as string,
      trekName: formData.get("trekName") as string || "",
      story: formData.get("story") as string || "",
      featured: formData.get("featured") === "on",
    };

    try {
      if (isEditing && image?.id) {
        await updateGalleryImage(image.id, data);
      } else {
        await createGalleryImage(data);
      }
      router.push("/admin/gallery");
      return { error: null };
    } catch (e) {
      return { error: (e as Error).message };
    }
  }

  const [state, formAction, isPending] = useActionState(handleSubmit, {
    error: null,
  });

  return (
    <form action={formAction} className="mx-auto max-w-4xl space-y-8 rounded-2xl border border-stone-200 bg-white p-8">
      {state?.error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Left column */}
        <div className="space-y-5">
          <Field
            label="Title"
            name="title"
            defaultValue={image?.alt}
            placeholder="e.g. Sunset from Harishchandragad"
            required
          />

          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
              Category
            </label>
            <select
              name="category"
              defaultValue={image?.category}
              required
              className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm outline-none transition-colors focus:border-zinc-950 focus:bg-white"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <Field
            label="Trek Name (optional)"
            name="trekName"
            defaultValue={image?.trekName}
            placeholder="e.g. Harishchandragad Trek"
          />

          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
              Image
            </label>
            <input
              name="image"
              type="file"
              accept="image/*"
              className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm outline-none transition-colors file:mr-3 file:rounded-lg file:border-0 file:bg-zinc-950 file:px-3 file:py-1 file:text-xs file:font-bold file:text-white file:uppercase file:tracking-wider hover:file:bg-zinc-800"
            />
            {existingImage && (
              <div className="relative mt-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={existingImage}
                  alt="Current"
                  className="h-40 w-full rounded-xl object-cover border border-stone-200"
                />
                <button
                  type="button"
                  onClick={() => setExistingImage("")}
                  className="absolute top-2 right-2 rounded-lg bg-zinc-950/70 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-colors hover:bg-zinc-950/90"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          <label className="flex items-center gap-3 text-sm text-stone-600">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={image?.featured}
              className="h-4 w-4 rounded border-stone-300 text-zinc-950 focus:ring-zinc-950"
            />
            Featured on homepage
          </label>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          <TextAreaField
            label="Description"
            name="description"
            defaultValue={image?.story}
            placeholder="Brief description of the image..."
            rows={3}
          />

          <TextAreaField
            label="Story / Memory"
            name="story"
            defaultValue={image?.story}
            placeholder="Share the story or memory behind this photo. What made this moment special?"
            rows={8}
          />
        </div>
      </div>

      {/* Submit */}
      <div className="flex items-center gap-4 border-t border-stone-200 pt-6">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-xl bg-zinc-950 px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-zinc-800 disabled:opacity-50"
        >
          {isPending
            ? "Saving..."
            : isEditing
              ? "Update Memory"
              : "Add Memory"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-stone-400 transition-colors hover:text-zinc-900"
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
  placeholder = "",
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm outline-none transition-colors focus:border-zinc-950 focus:bg-white"
      />
    </div>
  );
}

function TextAreaField({
  label,
  name,
  defaultValue,
  required = false,
  rows = 3,
  placeholder = "",
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
        {label}
      </label>
      <textarea
        name={name}
        defaultValue={defaultValue}
        required={required}
        rows={rows}
        placeholder={placeholder}
        className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm outline-none transition-colors focus:border-zinc-950 focus:bg-white"
        style={{ resize: "vertical" }}
      />
    </div>
  );
}
