-- CreateTable
CREATE TABLE "Referral" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Referral_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BookToReferral" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BookToReferral_AB_unique" ON "_BookToReferral"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToReferral_B_index" ON "_BookToReferral"("B");

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToReferral" ADD CONSTRAINT "_BookToReferral_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToReferral" ADD CONSTRAINT "_BookToReferral_B_fkey" FOREIGN KEY ("B") REFERENCES "Referral"("id") ON DELETE CASCADE ON UPDATE CASCADE;
