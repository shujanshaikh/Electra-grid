/*
  Warnings:

  - You are about to drop the `_EVChargingStationToEnergyUsage` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `stationId` on the `EnergyUsage` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_EVChargingStationToEnergyUsage" DROP CONSTRAINT "_EVChargingStationToEnergyUsage_A_fkey";

-- DropForeignKey
ALTER TABLE "_EVChargingStationToEnergyUsage" DROP CONSTRAINT "_EVChargingStationToEnergyUsage_B_fkey";

-- AlterTable
ALTER TABLE "EnergyUsage" DROP COLUMN "stationId",
ADD COLUMN     "stationId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_EVChargingStationToEnergyUsage";

-- AddForeignKey
ALTER TABLE "EnergyUsage" ADD CONSTRAINT "EnergyUsage_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "EVChargingStation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
