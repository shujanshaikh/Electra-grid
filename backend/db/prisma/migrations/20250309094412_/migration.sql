/*
  Warnings:

  - The primary key for the `ChatMessage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ChatMessage` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `EVChargingStation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `EVChargingStation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `EnergyUsage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `EnergyUsage` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `_EVChargingStationToEnergyUsage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `ChatMessage` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `EVChargingStation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `EnergyUsage` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `userId` on the `ChatMessage` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `EnergyUsage` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `Subscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `A` on the `_EVChargingStationToEnergyUsage` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_EVChargingStationToEnergyUsage` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "ChatMessage" DROP CONSTRAINT "ChatMessage_userId_fkey";

-- DropForeignKey
ALTER TABLE "EnergyUsage" DROP CONSTRAINT "EnergyUsage_userId_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_userId_fkey";

-- DropForeignKey
ALTER TABLE "_EVChargingStationToEnergyUsage" DROP CONSTRAINT "_EVChargingStationToEnergyUsage_A_fkey";

-- DropForeignKey
ALTER TABLE "_EVChargingStationToEnergyUsage" DROP CONSTRAINT "_EVChargingStationToEnergyUsage_B_fkey";

-- AlterTable
ALTER TABLE "ChatMessage" DROP CONSTRAINT "ChatMessage_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "EVChargingStation" DROP CONSTRAINT "EVChargingStation_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "EVChargingStation_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "EnergyUsage" DROP CONSTRAINT "EnergyUsage_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "EnergyUsage_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_EVChargingStationToEnergyUsage" DROP CONSTRAINT "_EVChargingStationToEnergyUsage_AB_pkey",
DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL,
DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL,
ADD CONSTRAINT "_EVChargingStationToEnergyUsage_AB_pkey" PRIMARY KEY ("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "ChatMessage_id_key" ON "ChatMessage"("id");

-- CreateIndex
CREATE UNIQUE INDEX "EVChargingStation_id_key" ON "EVChargingStation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "EnergyUsage_id_key" ON "EnergyUsage"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_id_key" ON "Subscription"("id");

-- CreateIndex
CREATE INDEX "_EVChargingStationToEnergyUsage_B_index" ON "_EVChargingStationToEnergyUsage"("B");

-- AddForeignKey
ALTER TABLE "EnergyUsage" ADD CONSTRAINT "EnergyUsage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EVChargingStationToEnergyUsage" ADD CONSTRAINT "_EVChargingStationToEnergyUsage_A_fkey" FOREIGN KEY ("A") REFERENCES "EVChargingStation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EVChargingStationToEnergyUsage" ADD CONSTRAINT "_EVChargingStationToEnergyUsage_B_fkey" FOREIGN KEY ("B") REFERENCES "EnergyUsage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
