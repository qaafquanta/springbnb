/*
  Warnings:

  - You are about to drop the column `priceRuleType` on the `PeakSeasonRate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PeakSeasonRate" DROP COLUMN "priceRuleType";

-- DropEnum
DROP TYPE "PRICE_RULE_TYPE";
