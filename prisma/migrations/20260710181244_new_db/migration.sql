/*
  Warnings:

  - You are about to drop the column `categoryId` on the `treks` table. All the data in the column will be lost.
  - You are about to drop the `batches` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `bookings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `coupons` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `participants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reviews` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "batches" DROP CONSTRAINT "batches_trekId_fkey";

-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_batchId_fkey";

-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_userId_fkey";

-- DropForeignKey
ALTER TABLE "participants" DROP CONSTRAINT "participants_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_trekId_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_userId_fkey";

-- DropForeignKey
ALTER TABLE "treks" DROP CONSTRAINT "treks_categoryId_fkey";

-- AlterTable
ALTER TABLE "treks" DROP COLUMN "categoryId";

-- DropTable
DROP TABLE "batches";

-- DropTable
DROP TABLE "bookings";

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "coupons";

-- DropTable
DROP TABLE "participants";

-- DropTable
DROP TABLE "reviews";

-- DropEnum
DROP TYPE "BookingStatus";
