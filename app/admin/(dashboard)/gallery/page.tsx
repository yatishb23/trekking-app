import Link from "next/link";
import { Images } from "lucide-react";
import { getGalleryImages } from "@/lib/data-store";
import { GalleryTable } from "@/components/admin/gallery-table";

export default async function AdminGalleryPage() {
  const images = await getGalleryImages();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900" style={{ fontFamily: "var(--font-playfair)" }}>
            Gallery
          </h1>
          <p className="mt-1 text-sm text-stone-400">
            Manage trek memories &mdash; photos, stories, and moments ({images.length} total)
          </p>
        </div>
        <Link
          href="/admin/gallery/new"
          className="rounded-xl bg-zinc-950 px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-zinc-800 hover:shadow-lg hover:shadow-zinc-950/20"
        >
          Add Memory
        </Link>
      </div>

      <div className="mt-8">
        {images.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 py-20">
            <Images className="mb-4 h-12 w-12 text-stone-300" />
            <p className="text-lg font-medium text-stone-400">
              No memories yet
            </p>
            <p className="mt-1 text-sm text-stone-300">
              Add your first trek memory to get started.
            </p>
          </div>
        ) : (
          <GalleryTable images={images} />
        )}
      </div>
    </div>
  );
}
