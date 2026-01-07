/*
  Warnings:

  - You are about to drop the column `roomId` on the `PeakSeasonRate` table. All the data in the column will be lost.
  - Added the required column `priceRuleType` to the `PeakSeasonRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomTypeId` to the `PeakSeasonRate` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PRICE_RULE_TYPE" AS ENUM ('YEARLY', 'MONTHLY', 'WEEKLY');

-- DropForeignKey
ALTER TABLE "PeakSeasonRate" DROP CONSTRAINT "PeakSeasonRate_roomId_fkey";

-- AlterTable
ALTER TABLE "PeakSeasonRate" DROP COLUMN "roomId",
ADD COLUMN     "priceRuleType" "PRICE_RULE_TYPE" NOT NULL,
ADD COLUMN     "roomTypeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "PeakSeasonRate" ADD CONSTRAINT "PeakSeasonRate_roomTypeId_fkey" FOREIGN KEY ("roomTypeId") REFERENCES "RoomType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
