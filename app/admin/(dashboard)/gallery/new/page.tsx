import { GalleryForm } from "@/components/admin/gallery-form";

export default function NewGalleryPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-zinc-900" style={{ fontFamily: "var(--font-playfair)" }}>
        Add Memory
      </h1>
      <p className="mt-1 text-sm text-stone-400">
        Share a photo, story, or moment from a trek.
      </p>
      <div className="mt-8">
        <GalleryForm />
      </div>
    </div>
  );
}
