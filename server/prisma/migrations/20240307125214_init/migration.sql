/*
  Warnings:

  - You are about to drop the `_CommentLiked` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ViewedQuestion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CommentLiked" DROP CONSTRAINT "_CommentLiked_A_fkey";

-- DropForeignKey
ALTER TABLE "_CommentLiked" DROP CONSTRAINT "_CommentLiked_B_fkey";

-- DropForeignKey
ALTER TABLE "_ViewedQuestion" DROP CONSTRAINT "_ViewedQuestion_A_fkey";

-- DropForeignKey
ALTER TABLE "_ViewedQuestion" DROP CONSTRAINT "_ViewedQuestion_B_fkey";

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "_CommentLiked";

-- DropTable
DROP TABLE "_ViewedQuestion";
