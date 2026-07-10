import type { Metadata } from "next"
import { getGalleryImages } from "@/lib/data-store"
import { galleryImages as fallbackImages } from "@/lib/data"
import { GalleryClient } from "@/components/gallery-client"

export const metadata: Metadata = {
  title: "Gallery | Miles With Nature",
  description:
    "A visual journey through the mountains, forests, and valleys we have explored together.",
}

export default async function GalleryPage() {
  let images = await getGalleryImages()

  // Fall back to static data if database is empty
  if (images.length === 0) {
    images = fallbackImages
  }

  return <GalleryClient images={images} />
}
