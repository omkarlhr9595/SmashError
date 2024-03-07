-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Member', 'Core', 'Mentor');

-- CreateTable
CREATE TABLE "User" (
    "sub" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "rollNo" INTEGER,
    "className" TEXT,
    "points" INTEGER NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("sub")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userSub" TEXT NOT NULL,
    "aiAnswer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "userSub" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "answerId" TEXT NOT NULL,
    "QuestionId" TEXT NOT NULL,
    "userSub" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mentor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'Mentor',
    "experience" INTEGER NOT NULL,
    "expertise" TEXT[],
    "linkedIn" TEXT NOT NULL,
    "profilePic" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mentor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mentorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UpvotedQuestion" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DownvotedQuestion" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ViewedQuestion" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UpvotedAnswer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DownvotedAnswer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CommentLiked" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_RoomToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_sub_key" ON "User"("sub");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Mentor_email_key" ON "Mentor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_UpvotedQuestion_AB_unique" ON "_UpvotedQuestion"("A", "B");

-- CreateIndex
CREATE INDEX "_UpvotedQuestion_B_index" ON "_UpvotedQuestion"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DownvotedQuestion_AB_unique" ON "_DownvotedQuestion"("A", "B");

-- CreateIndex
CREATE INDEX "_DownvotedQuestion_B_index" ON "_DownvotedQuestion"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ViewedQuestion_AB_unique" ON "_ViewedQuestion"("A", "B");

-- CreateIndex
CREATE INDEX "_ViewedQuestion_B_index" ON "_ViewedQuestion"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UpvotedAnswer_AB_unique" ON "_UpvotedAnswer"("A", "B");

-- CreateIndex
CREATE INDEX "_UpvotedAnswer_B_index" ON "_UpvotedAnswer"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DownvotedAnswer_AB_unique" ON "_DownvotedAnswer"("A", "B");

-- CreateIndex
CREATE INDEX "_DownvotedAnswer_B_index" ON "_DownvotedAnswer"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CommentLiked_AB_unique" ON "_CommentLiked"("A", "B");

-- CreateIndex
CREATE INDEX "_CommentLiked_B_index" ON "_CommentLiked"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RoomToUser_AB_unique" ON "_RoomToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RoomToUser_B_index" ON "_RoomToUser"("B");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_userSub_fkey" FOREIGN KEY ("userSub") REFERENCES "User"("sub") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_userSub_fkey" FOREIGN KEY ("userSub") REFERENCES "User"("sub") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_QuestionId_fkey" FOREIGN KEY ("QuestionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userSub_fkey" FOREIGN KEY ("userSub") REFERENCES "User"("sub") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "Mentor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UpvotedQuestion" ADD CONSTRAINT "_UpvotedQuestion_A_fkey" FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UpvotedQuestion" ADD CONSTRAINT "_UpvotedQuestion_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("sub") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DownvotedQuestion" ADD CONSTRAINT "_DownvotedQuestion_A_fkey" FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DownvotedQuestion" ADD CONSTRAINT "_DownvotedQuestion_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("sub") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ViewedQuestion" ADD CONSTRAINT "_ViewedQuestion_A_fkey" FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ViewedQuestion" ADD CONSTRAINT "_ViewedQuestion_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("sub") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UpvotedAnswer" ADD CONSTRAINT "_UpvotedAnswer_A_fkey" FOREIGN KEY ("A") REFERENCES "Answer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UpvotedAnswer" ADD CONSTRAINT "_UpvotedAnswer_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("sub") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DownvotedAnswer" ADD CONSTRAINT "_DownvotedAnswer_A_fkey" FOREIGN KEY ("A") REFERENCES "Answer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DownvotedAnswer" ADD CONSTRAINT "_DownvotedAnswer_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("sub") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommentLiked" ADD CONSTRAINT "_CommentLiked_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommentLiked" ADD CONSTRAINT "_CommentLiked_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("sub") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomToUser" ADD CONSTRAINT "_RoomToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomToUser" ADD CONSTRAINT "_RoomToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("sub") ON DELETE CASCADE ON UPDATE CASCADE;
