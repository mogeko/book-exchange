/*
  Warnings:

  - You are about to drop the column `discription` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `discription` on the `Booklist` table. All the data in the column will be lost.
  - You are about to drop the column `discription` on the `Series` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Author` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Book` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Series` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "discription",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "subtitle" TEXT;

-- AlterTable
ALTER TABLE "Booklist" DROP COLUMN "discription",
ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Series" DROP COLUMN "discription",
ADD COLUMN     "description" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Author_name_key" ON "Author"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Book_title_key" ON "Book"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Series_name_key" ON "Series"("name");
