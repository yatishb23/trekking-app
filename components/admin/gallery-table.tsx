"use client";

import { useActionState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Edit3, Trash2, Star } from "lucide-react";
import { deleteGalleryImage } from "@/lib/data-store";
import type { GalleryImage } from "@/lib/data";

export function GalleryTable({ images }: { images: GalleryImage[] }) {
  const router = useRouter();

  async function handleDelete(_prev: unknown, formData: FormData) {
    const id = Number(formData.get("id"));
    await deleteGalleryImage(id);
    router.refresh();
  }

  const [, formAction] = useActionState(handleDelete, null);

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Trek</th>
              <th className="px-6 py-4">Story</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {images.map((image) => (
              <tr
                key={image.id}
                className="border-b border-stone-100 transition-colors hover:bg-stone-50/50"
              >
                <td className="px-6 py-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-stone-100">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-zinc-900">
                      {image.alt}
                    </span>
                    {image.featured && (
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="rounded-lg border border-stone-200 bg-stone-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-500">
                    {image.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-stone-500">
                  {image.trekName || <span className="text-stone-300">&mdash;</span>}
                </td>
                <td className="px-6 py-4 text-sm text-stone-400 max-w-[200px] truncate">
                  {image.story || <span className="text-stone-300">&mdash;</span>}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/gallery/${image.id}/edit`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-stone-400 transition-colors hover:bg-zinc-950/[0.05] hover:text-zinc-900"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                    </Link>
                    <form action={formAction}>
                      <input type="hidden" name="id" value={image.id} />
                      <button
                        type="submit"
                        onClick={(e) => {
                          if (
                            !confirm(
                              `Are you sure you want to delete "${image.alt}"?`
                            )
                          ) {
                            e.preventDefault();
                          }
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-stone-400 transition-colors hover:bg-red-50 hover:text-red-500"
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
