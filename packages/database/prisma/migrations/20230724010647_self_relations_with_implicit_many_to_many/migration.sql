/*
  Warnings:

  - The primary key for the `Voter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `Voter` table. All the data in the column will be lost.
  - You are about to drop the `Somebody` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `voterId` to the `Voter` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Somebody" DROP CONSTRAINT "Somebody_followeeId_fkey";

-- DropForeignKey
ALTER TABLE "Somebody" DROP CONSTRAINT "Somebody_followingId_fkey";

-- DropForeignKey
ALTER TABLE "Voter" DROP CONSTRAINT "Voter_userId_fkey";

-- AlterTable
ALTER TABLE "Voter" DROP CONSTRAINT "Voter_pkey",
DROP COLUMN "userId",
ADD COLUMN     "voterId" TEXT NOT NULL,
ADD CONSTRAINT "Voter_pkey" PRIMARY KEY ("voterId", "commentId");

-- DropTable
DROP TABLE "Somebody";

-- CreateTable
CREATE TABLE "_UserFollows" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserFollows_AB_unique" ON "_UserFollows"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFollows_B_index" ON "_UserFollows"("B");

-- AddForeignKey
ALTER TABLE "Voter" ADD CONSTRAINT "Voter_voterId_fkey" FOREIGN KEY ("voterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFollows" ADD CONSTRAINT "_UserFollows_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFollows" ADD CONSTRAINT "_UserFollows_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
