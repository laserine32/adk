/*
  Warnings:

  - You are about to drop the column `komikId` on the `Tags` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tags" DROP CONSTRAINT "Tags_komikId_fkey";

-- AlterTable
ALTER TABLE "Tags" DROP COLUMN "komikId";

-- CreateTable
CREATE TABLE "TagsOnKomik" (
    "komikId" INTEGER NOT NULL,
    "tagsId" INTEGER NOT NULL,

    CONSTRAINT "TagsOnKomik_pkey" PRIMARY KEY ("komikId","tagsId")
);

-- AddForeignKey
ALTER TABLE "TagsOnKomik" ADD CONSTRAINT "TagsOnKomik_komikId_fkey" FOREIGN KEY ("komikId") REFERENCES "Komik"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnKomik" ADD CONSTRAINT "TagsOnKomik_tagsId_fkey" FOREIGN KEY ("tagsId") REFERENCES "Tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
