/*
  Warnings:

  - You are about to drop the `Document` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Document";

-- CreateTable
CREATE TABLE "prompt_configuration" (
    "id" TEXT NOT NULL,
    "system_message" TEXT NOT NULL,
    "document_message" TEXT NOT NULL,
    "human_message" TEXT NOT NULL,

    CONSTRAINT "prompt_configuration_pkey" PRIMARY KEY ("id")
);
