import { notFound } from "next/navigation";
import { getGalleryImage } from "@/lib/data-store";
import { GalleryForm } from "@/components/admin/gallery-form";

export default async function EditGalleryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const image = await getGalleryImage(Number(id));

  if (!image) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-zinc-900" style={{ fontFamily: "var(--font-playfair)" }}>
        Edit Memory
      </h1>
      <p className="mt-1 text-sm text-stone-400">
        Editing: {image.alt}
      </p>
      <div className="mt-8">
        <GalleryForm image={image} />
      </div>
    </div>
  );
}
