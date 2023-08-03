/*
  Warnings:

  - You are about to drop the column `state` on the `Booklist` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "BooklistStatus" AS ENUM ('TODO', 'IN_PROGRESS', 'DONE');

-- CreateEnum
CREATE TYPE "BooklistPriority" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- AlterTable
ALTER TABLE "Booklist" DROP COLUMN "state",
ADD COLUMN     "priority" "BooklistPriority" NOT NULL DEFAULT 'MEDIUM',
ADD COLUMN     "status" "BooklistStatus" NOT NULL DEFAULT 'TODO';

-- DropEnum
DROP TYPE "ReadingStatus";
