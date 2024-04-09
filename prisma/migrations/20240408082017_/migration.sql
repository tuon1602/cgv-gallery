/*
  Warnings:

  - Added the required column `userCommentId` to the `UserComment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserComment" DROP CONSTRAINT "UserComment_userId_fkey";

-- AlterTable
ALTER TABLE "Image" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "UserComment" ADD COLUMN     "userCommentId" INTEGER NOT NULL,
ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "UserComment" ADD CONSTRAINT "UserComment_userCommentId_fkey" FOREIGN KEY ("userCommentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
