/*
  Warnings:

  - You are about to drop the column `questionId` on the `Comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_questionId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "questionId";
