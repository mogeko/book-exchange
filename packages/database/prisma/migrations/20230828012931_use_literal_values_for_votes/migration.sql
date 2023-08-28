/*
  Warnings:

  - Changed the type of `vote` on the `Voter` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Vote" AS ENUM ('LIKE', 'DISLIKE');

-- AlterTable
ALTER TABLE "Voter" DROP COLUMN "vote",
ADD COLUMN     "vote" "Vote" NOT NULL;
