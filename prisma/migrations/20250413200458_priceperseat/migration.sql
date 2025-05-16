/*
  Warnings:

  - You are about to drop the column `zoneName` on the `Ride` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ride" DROP COLUMN "zoneName",
ADD COLUMN     "pricePerSeat" DOUBLE PRECISION NOT NULL DEFAULT 0;
