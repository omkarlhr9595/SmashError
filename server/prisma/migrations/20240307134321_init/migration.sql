/*
  Warnings:

  - You are about to drop the column `QuestionId` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `questionId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_QuestionId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "QuestionId",
ADD COLUMN     "questionId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
