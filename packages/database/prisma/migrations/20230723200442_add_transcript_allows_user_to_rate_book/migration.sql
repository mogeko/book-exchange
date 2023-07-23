/*
  Warnings:

  - You are about to drop the column `bookId` on the `Comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_bookId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "bookId";

-- CreateTable
CREATE TABLE "Transcript" (
    "score" INTEGER NOT NULL,
    "commentId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,

    CONSTRAINT "Transcript_pkey" PRIMARY KEY ("commentId","bookId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transcript_commentId_key" ON "Transcript"("commentId");

-- AddForeignKey
ALTER TABLE "Transcript" ADD CONSTRAINT "Transcript_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transcript" ADD CONSTRAINT "Transcript_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
