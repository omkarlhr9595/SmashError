/*
  Warnings:

  - You are about to drop the `_DownvotedAnswer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DownvotedQuestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UpvotedAnswer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UpvotedQuestion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DownvotedAnswer" DROP CONSTRAINT "_DownvotedAnswer_A_fkey";

-- DropForeignKey
ALTER TABLE "_DownvotedAnswer" DROP CONSTRAINT "_DownvotedAnswer_B_fkey";

-- DropForeignKey
ALTER TABLE "_DownvotedQuestion" DROP CONSTRAINT "_DownvotedQuestion_A_fkey";

-- DropForeignKey
ALTER TABLE "_DownvotedQuestion" DROP CONSTRAINT "_DownvotedQuestion_B_fkey";

-- DropForeignKey
ALTER TABLE "_UpvotedAnswer" DROP CONSTRAINT "_UpvotedAnswer_A_fkey";

-- DropForeignKey
ALTER TABLE "_UpvotedAnswer" DROP CONSTRAINT "_UpvotedAnswer_B_fkey";

-- DropForeignKey
ALTER TABLE "_UpvotedQuestion" DROP CONSTRAINT "_UpvotedQuestion_A_fkey";

-- DropForeignKey
ALTER TABLE "_UpvotedQuestion" DROP CONSTRAINT "_UpvotedQuestion_B_fkey";

-- AlterTable
ALTER TABLE "Answer" ADD COLUMN     "downvote" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "upvote" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "downvote" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "upvote" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- DropTable
DROP TABLE "_DownvotedAnswer";

-- DropTable
DROP TABLE "_DownvotedQuestion";

-- DropTable
DROP TABLE "_UpvotedAnswer";

-- DropTable
DROP TABLE "_UpvotedQuestion";
