/*
  Warnings:

  - You are about to alter the column `Points` on the `SeasonAverages` table. The data in that column could be lost. The data in that column will be cast from `Decimal(4,1)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "SeasonAverages" ALTER COLUMN "Points" SET DATA TYPE DOUBLE PRECISION;
