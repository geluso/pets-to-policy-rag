/*
  Warnings:

  - You are about to drop the column `summaryReadable` on the `summary_readable` table. All the data in the column will be lost.
  - Added the required column `summary_readable` to the `summary_readable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "summary_readable" DROP COLUMN "summaryReadable",
ADD COLUMN     "summary_readable" TEXT NOT NULL;
