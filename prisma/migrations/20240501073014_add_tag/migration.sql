/*
  Warnings:

  - The `imageUrl` column on the `Image` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `description` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "imageUrl",
ADD COLUMN     "imageUrl" TEXT[];

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LikedBy" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ImageTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_LikedBy_AB_unique" ON "_LikedBy"("A", "B");

-- CreateIndex
CREATE INDEX "_LikedBy_B_index" ON "_LikedBy"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ImageTags_AB_unique" ON "_ImageTags"("A", "B");

-- CreateIndex
CREATE INDEX "_ImageTags_B_index" ON "_ImageTags"("B");

-- AddForeignKey
ALTER TABLE "_LikedBy" ADD CONSTRAINT "_LikedBy_A_fkey" FOREIGN KEY ("A") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikedBy" ADD CONSTRAINT "_LikedBy_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImageTags" ADD CONSTRAINT "_ImageTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ImageTags" ADD CONSTRAINT "_ImageTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
