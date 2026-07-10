"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { setAdminSession } from "./auth";
import type { Trek, GalleryImage } from "./data";
import bcrypt from "bcryptjs";

function toTrek(t: {
  id: number;
  slug: string;
  title: string;
  location: string;
  duration: string;
  difficulty: string;
  altitude: string;
  price: number;
  images: string[];
  shortDescription: string;
  description: string;
  highlights: string[];
  itinerary: unknown;
  bestSeason: string;
  groupSize: string;
  includes: string[];
  featured: boolean;
  upcoming: boolean;
  createdAt: Date;
  updatedAt: Date;
}): Trek {
  return {
    slug: t.slug,
    title: t.title,
    location: t.location,
    duration: t.duration,
    difficulty: t.difficulty as Trek["difficulty"],
    altitude: t.altitude,
    price: t.price,
    images: t.images,
    shortDescription: t.shortDescription,
    description: t.description,
    highlights: t.highlights,
    itinerary: t.itinerary as Trek["itinerary"],
    bestSeason: t.bestSeason,
    groupSize: t.groupSize,
    includes: t.includes,
    featured: t.featured,
    upcoming: t.upcoming,
  };
}

export async function getTreks(): Promise<Trek[]> {
  try {
    const treks = await prisma.trek.findMany({
      orderBy: { createdAt: "desc" },
    });
    return treks.map(toTrek);
  } catch (error) {
    console.error("Failed to fetch treks from database:", error);
    return [];
  }
}

export async function getTrekTitles(): Promise<string[]> {
  try {
    const treks = await prisma.trek.findMany({
      select: { title: true },
      orderBy: { title: "asc" },
    });
    return treks.map((t) => t.title);
  } catch {
    return [];
  }
}

export async function getTrek(slug: string): Promise<Trek | null> {
  const treks = await getTreks();
  const decodedSlug = decodeURIComponent(slug);
  const trek = treks.find((t) => t.slug === slug || t.slug === decodedSlug);
  return trek || null;
}

export async function createTrek(data: Trek) {
  const existing = await getTrek(data.slug);
  if (existing) {
    throw new Error("A trek with this slug already exists");
  }

  await prisma.trek.create({
    data: {
      slug: data.slug,
      title: data.title,
      location: data.location,
      duration: data.duration,
      difficulty: data.difficulty,
      altitude: data.altitude,
      price: data.price,
      images: data.images,
      shortDescription: data.shortDescription,
      description: data.description,
      highlights: data.highlights ?? [],
      itinerary: data.itinerary ?? [],
      bestSeason: data.bestSeason,
      groupSize: data.groupSize,
      includes: data.includes ?? [],
      featured: data.featured ?? false,
      upcoming: data.upcoming ?? false,
    },
  });

  revalidatePath("/treks");
  revalidatePath("/admin/(dashboard)/treks");
}

export async function updateTrek(slug: string, data: Trek) {
  const existing = await prisma.trek.findUnique({
    where: { slug },
  });

  if (!existing) throw new Error("Trek not found");

  await prisma.trek.update({
    where: { id: existing.id },
    data: {
      title: data.title,
      location: data.location,
      duration: data.duration,
      difficulty: data.difficulty,
      altitude: data.altitude,
      price: data.price,
      images: data.images,
      shortDescription: data.shortDescription,
      description: data.description,
      highlights: data.highlights ?? [],
      itinerary: data.itinerary ?? [],
      bestSeason: data.bestSeason,
      groupSize: data.groupSize,
      includes: data.includes ?? [],
      featured: data.featured ?? false,
      upcoming: data.upcoming ?? false,
    },
  });

  revalidatePath("/treks");
  revalidatePath("/admin/(dashboard)/treks");
}

export async function deleteTrek(slug: string) {
  try {
    const existing = await prisma.trek.findUnique({
      where: { slug },
    });

    if (existing) {
      await prisma.trek.delete({
        where: { id: existing.id },
      });
    }
  } catch {
    // catch block
  }
  revalidatePath("/treks");
  revalidatePath("/admin/(dashboard)/treks");
}

export async function logoutAdminAction() {
  const { logoutAdmin } = await import("./auth");
  await logoutAdmin();
  revalidatePath("/admin");
}

export async function loginAdmin(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { success: false, error: "Invalid email or password" };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { success: false, error: "Invalid email or password" };
    }

    if (user.isAdmin) {
      await setAdminSession();
      return { success: true };
    }

    return { success: false, error: "Access denied. Not an admin." };
  } catch (error) {
    console.error("Login Error:", error);
    return { success: false, error: "Internal server error" };
  }
}

// ─── Gallery Actions ────────────────────────────────────────────────

function toGalleryImage(g: {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  trekName: string;
  story: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}): GalleryImage {
  return {
    id: g.id,
    src: g.imageUrl,
    alt: g.title,
    category: g.category,
    trekName: g.trekName || undefined,
    story: g.story || undefined,
    featured: g.featured,
    createdAt: g.createdAt,
    updatedAt: g.updatedAt,
  };
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: { createdAt: "desc" },
    });
    return images.map(toGalleryImage);
  } catch (error) {
    console.error("Failed to fetch gallery images:", error);
    return [];
  }
}

export async function getGalleryImage(id: number): Promise<GalleryImage | null> {
  try {
    const image = await prisma.galleryImage.findUnique({ where: { id } });
    return image ? toGalleryImage(image) : null;
  } catch {
    return null;
  }
}

export async function createGalleryImage(data: {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  trekName: string;
  story: string;
  featured: boolean;
}) {
  await prisma.galleryImage.create({ data });
  revalidatePath("/gallery");
  revalidatePath("/admin/(dashboard)/gallery");
}

export async function updateGalleryImage(
  id: number,
  data: {
    title: string;
    description: string;
    imageUrl: string;
    category: string;
    trekName: string;
    story: string;
    featured: boolean;
  }
) {
  const existing = await prisma.galleryImage.findUnique({ where: { id } });
  if (!existing) throw new Error("Gallery image not found");

  await prisma.galleryImage.update({ where: { id }, data });
  revalidatePath("/gallery");
  revalidatePath("/admin/(dashboard)/gallery");
}

export async function deleteGalleryImage(id: number) {
  try {
    await prisma.galleryImage.delete({ where: { id } });
  } catch {
    // Image might not exist
  }
  revalidatePath("/gallery");
  revalidatePath("/admin/(dashboard)/gallery");
}
