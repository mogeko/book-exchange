/*
  Warnings:

  - You are about to alter the column `score` on the `Transcript` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.

*/
-- AlterTable
ALTER TABLE "Transcript" ALTER COLUMN "score" SET DATA TYPE SMALLINT;
