-- CreateTable
CREATE TABLE "prompt_configuration" (
    "id" TEXT NOT NULL,
    "system_message" TEXT NOT NULL,
    "document_message" TEXT NOT NULL,
    "human_message" TEXT NOT NULL,

    CONSTRAINT "prompt_configuration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "indexed_chunk" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "chunk_text" TEXT NOT NULL,
    "chunk_index" INTEGER NOT NULL,

    CONSTRAINT "indexed_chunk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "summary_readable" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "summaryReadable" TEXT NOT NULL,

    CONSTRAINT "summary_readable_pkey" PRIMARY KEY ("id")
);
