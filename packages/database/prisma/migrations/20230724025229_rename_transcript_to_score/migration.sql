/*
  Warnings:

  - You are about to drop the `Transcript` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transcript" DROP CONSTRAINT "Transcript_bookId_fkey";

-- DropForeignKey
ALTER TABLE "Transcript" DROP CONSTRAINT "Transcript_commentId_fkey";

-- DropTable
DROP TABLE "Transcript";

-- CreateTable
CREATE TABLE "Score" (
    "rate" SMALLINT NOT NULL,
    "commentId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("commentId","bookId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Score_commentId_key" ON "Score"("commentId");

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
