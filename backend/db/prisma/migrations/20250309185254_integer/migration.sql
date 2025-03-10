/*
  Warnings:

  - You are about to alter the column `energyUsed` on the `EnergyUsage` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "EnergyUsage" ALTER COLUMN "energyUsed" SET DATA TYPE INTEGER;
