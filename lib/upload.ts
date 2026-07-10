"use server";

import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import crypto from "crypto";

/**
 * Uploads an array of File objects to the public/uploads/treks directory
 * and returns their relative URLs.
 */
export async function uploadTrekImages(files: File[]): Promise<string[]> {
  const uploadDir = join(process.cwd(), "public", "uploads", "treks");

  // Ensure directory exists
  try {
    await mkdir(uploadDir, { recursive: true });
  } catch (err) {
    // Directory might already exist
  }

  const uploadedPaths: string[] = [];

  for (const file of files) {
    if (file && file.size > 0) {
      if (file.size > 5 * 1024 * 1024) {
        throw new Error(`Image ${file.name} must be less than 5MB`);
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      // Generate a unique filename while preserving extension
      const extension = file.name.split('.').pop() || 'jpg';
      const uniqueFilename = `${crypto.randomUUID()}.${extension}`;
      const filePath = join(uploadDir, uniqueFilename);

      await writeFile(filePath, buffer);

      // Return the public URL path
      uploadedPaths.push(`/uploads/treks/${uniqueFilename}`);
    }
  }

  return uploadedPaths;
}

/**
 * Uploads an array of File objects to the public/uploads/gallery directory
 * and returns their relative URLs.
 */
export async function uploadGalleryImages(files: File[]): Promise<string[]> {
  const uploadDir = join(process.cwd(), "public", "uploads", "gallery");

  try {
    await mkdir(uploadDir, { recursive: true });
  } catch {
    // Directory might already exist
  }

  const uploadedPaths: string[] = [];

  for (const file of files) {
    if (file && file.size > 0) {
      if (file.size > 5 * 1024 * 1024) {
        throw new Error(`Image ${file.name} must be less than 5MB`);
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const extension = file.name.split('.').pop() || 'jpg';
      const uniqueFilename = `${crypto.randomUUID()}.${extension}`;
      const filePath = join(uploadDir, uniqueFilename);

      await writeFile(filePath, buffer);
      uploadedPaths.push(`/uploads/gallery/${uniqueFilename}`);
    }
  }

  return uploadedPaths;
}
