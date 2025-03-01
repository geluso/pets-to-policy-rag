/*
  Warnings:

  - The primary key for the `indexed_chunk` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `summary_readable` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "indexed_chunk" DROP CONSTRAINT "indexed_chunk_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "indexed_chunk_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "summary_readable" DROP CONSTRAINT "summary_readable_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "summary_readable_pkey" PRIMARY KEY ("id");
