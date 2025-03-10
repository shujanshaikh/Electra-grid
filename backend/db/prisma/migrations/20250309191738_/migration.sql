/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `EnergyUsage` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stationId]` on the table `EnergyUsage` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "EnergyUsage" DROP CONSTRAINT "EnergyUsage_userId_fkey";

-- AlterTable
ALTER TABLE "EnergyUsage" ALTER COLUMN "userId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "EnergyUsage_userId_key" ON "EnergyUsage"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "EnergyUsage_stationId_key" ON "EnergyUsage"("stationId");

-- AddForeignKey
ALTER TABLE "EnergyUsage" ADD CONSTRAINT "EnergyUsage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
