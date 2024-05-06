/*
  Warnings:

  - You are about to drop the `_LikedBy` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_LikedBy" DROP CONSTRAINT "_LikedBy_A_fkey";

-- DropForeignKey
ALTER TABLE "_LikedBy" DROP CONSTRAINT "_LikedBy_B_fkey";

-- DropTable
DROP TABLE "_LikedBy";
