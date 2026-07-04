"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { setAdminSession } from "./auth";
import { verifyAdmin } from "./auth";
import type { Trek } from "./data";

const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

function toTrek(t: {
  id: number;
  slug: string;
  title: string;
  location: string;
  duration: string;
  difficulty: string;
  altitude: string;
  price: number;
  image: string;
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
    image: t.image,
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
    const res = await fetch(`${baseUrl}/api/trek`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    let treks = await res.json();

    // Try sorting newly fetched manually since API did not provide orderBy
    treks = treks.sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    return treks.map(toTrek);
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

  const res = await fetch(`${baseUrl}/api/trek`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      slug: data.slug,
      title: data.title,
      location: data.location,
      duration: data.duration,
      difficulty: data.difficulty,
      altitude: data.altitude,
      price: data.price,
      image: data.image,
      shortDescription: data.shortDescription,
      description: data.description,
      highlights: data.highlights ?? [],
      itinerary: data.itinerary ?? [],
      bestSeason: data.bestSeason,
      groupSize: data.groupSize,
      includes: data.includes ?? [],
      featured: data.featured ?? false,
      upcoming: data.upcoming ?? false,
    }),
  });

  if (!res.ok) throw new Error("Failed to create trek");

  revalidatePath("/treks");
  revalidatePath("/admin/(dashboard)/treks");
}

export async function updateTrek(slug: string, data: Trek) {
  // We need the ID for the PUT request to /api/trek
  const allTreksResponse = await fetch(
    `${baseUrl}/api/trek`,
    { cache: "no-store" },
  );
  const allTreks = await allTreksResponse.json();
  const existing = allTreks.find((t: any) => t.slug === slug);

  if (!existing) throw new Error("Trek not found");

  const res = await fetch(
    `${baseUrl}/api/trek?id=${existing.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: data.title,
        location: data.location,
        duration: data.duration,
        difficulty: data.difficulty,
        altitude: data.altitude,
        price: data.price,
        image: data.image,
        shortDescription: data.shortDescription,
        description: data.description,
        highlights: data.highlights ?? [],
        itinerary: data.itinerary ?? [],
        bestSeason: data.bestSeason,
        groupSize: data.groupSize,
        includes: data.includes ?? [],
        featured: data.featured ?? false,
        upcoming: data.upcoming ?? false,
      }),
    },
  );

  if (!res.ok) throw new Error("Failed to update trek");

  revalidatePath("/treks");
  revalidatePath("/admin/(dashboard)/treks");
}

export async function deleteTrek(slug: string) {
  try {
    const allTreksResponse = await fetch(
      `${baseUrl}/api/trek`,
      { cache: "no-store" },
    );
    const allTreks = await allTreksResponse.json();
    const existing = allTreks.find((t: any) => t.slug === slug);

    if (existing) {
      await fetch(
        `${baseUrl}/api/trek?id=${existing.id}`,
        {
          method: "DELETE",
        },
      );
    }
  } catch (error) {
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
    const res = await fetch(`${baseUrl}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const user = await res.json();
      if (user.isAdmin) {
        await setAdminSession();
        return { success: true };
      }
      return { success: false, error: "Access denied. Not an admin." };
    }

    const errData = await res.json();
    return {
      success: false,
      error: errData.error || "Invalid email or password",
    };
  } catch (error) {
    return { success: false, error: "Internal server error" };
  }
}
