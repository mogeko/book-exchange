/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Series` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Series` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ReadingStatus" AS ENUM ('WANT', 'READING', 'READED');

-- DropIndex
DROP INDEX "Series_name_key";

-- AlterTable
ALTER TABLE "Series" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "publisherId" INTEGER;

-- CreateTable
CREATE TABLE "Booklist" (
    "id" SERIAL NOT NULL,
    "state" "ReadingStatus" NOT NULL,
    "title" TEXT NOT NULL,
    "discription" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Booklist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BookToBooklist" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BookToBooklist_AB_unique" ON "_BookToBooklist"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToBooklist_B_index" ON "_BookToBooklist"("B");

-- AddForeignKey
ALTER TABLE "Booklist" ADD CONSTRAINT "Booklist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Series" ADD CONSTRAINT "Series_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "Publisher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToBooklist" ADD CONSTRAINT "_BookToBooklist_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToBooklist" ADD CONSTRAINT "_BookToBooklist_B_fkey" FOREIGN KEY ("B") REFERENCES "Booklist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
