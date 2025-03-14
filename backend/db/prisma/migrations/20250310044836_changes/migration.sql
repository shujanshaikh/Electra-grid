/*
  Warnings:

  - Made the column `userId` on table `EnergyUsage` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "EnergyUsage" DROP CONSTRAINT "EnergyUsage_userId_fkey";

-- AlterTable
ALTER TABLE "EnergyUsage" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "EnergyUsage" ADD CONSTRAINT "EnergyUsage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
