/*
  Warnings:

  - You are about to drop the column `writerId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the `Writer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BookToWriter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_writerId_fkey";

-- DropForeignKey
ALTER TABLE "_BookToWriter" DROP CONSTRAINT "_BookToWriter_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookToWriter" DROP CONSTRAINT "_BookToWriter_B_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "writerId",
ADD COLUMN     "authorId" TEXT;

-- DropTable
DROP TABLE "Writer";

-- DropTable
DROP TABLE "_BookToWriter";

-- CreateTable
CREATE TABLE "Author" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AuthorToBook" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AuthorToBook_AB_unique" ON "_AuthorToBook"("A", "B");

-- CreateIndex
CREATE INDEX "_AuthorToBook_B_index" ON "_AuthorToBook"("B");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToBook" ADD CONSTRAINT "_AuthorToBook_A_fkey" FOREIGN KEY ("A") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToBook" ADD CONSTRAINT "_AuthorToBook_B_fkey" FOREIGN KEY ("B") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
