-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "cover" TEXT,
ADD COLUMN     "discription" TEXT,
ALTER COLUMN "isbn" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT;
