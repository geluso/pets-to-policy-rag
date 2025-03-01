/*
  Warnings:

  - The primary key for the `indexed_chunk` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `indexed_chunk` table. All the data in the column will be lost.
  - The primary key for the `summary_readable` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `summary_readable` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "indexed_chunk" DROP CONSTRAINT "indexed_chunk_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "indexed_chunk_pkey" PRIMARY KEY ("url");

-- AlterTable
ALTER TABLE "summary_readable" DROP CONSTRAINT "summary_readable_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "summary_readable_pkey" PRIMARY KEY ("url");
