-- CreateTable
CREATE TABLE "Komik" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "japanese_title" TEXT NOT NULL,
    "pretty_title" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "upload_date" INTEGER NOT NULL,
    "num_pages" INTEGER NOT NULL,
    "num_favorites" INTEGER NOT NULL,

    CONSTRAINT "Komik_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tags" (
    "id" INTEGER NOT NULL,
    "komikId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pages" (
    "id" TEXT NOT NULL,
    "komikId" INTEGER NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "Pages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tags" ADD CONSTRAINT "Tags_komikId_fkey" FOREIGN KEY ("komikId") REFERENCES "Komik"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pages" ADD CONSTRAINT "Pages_komikId_fkey" FOREIGN KEY ("komikId") REFERENCES "Komik"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
