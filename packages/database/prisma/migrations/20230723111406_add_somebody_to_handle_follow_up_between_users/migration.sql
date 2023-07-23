-- CreateTable
CREATE TABLE "Somebody" (
    "followeeId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Somebody_pkey" PRIMARY KEY ("followeeId","followingId")
);

-- AddForeignKey
ALTER TABLE "Somebody" ADD CONSTRAINT "Somebody_followeeId_fkey" FOREIGN KEY ("followeeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Somebody" ADD CONSTRAINT "Somebody_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
