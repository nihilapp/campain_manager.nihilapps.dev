/*
  Warnings:

  - You are about to drop the `Master` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Master" DROP CONSTRAINT "Master_campainId_fkey";

-- DropForeignKey
ALTER TABLE "Master" DROP CONSTRAINT "Master_userId_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_masterId_fkey";

-- DropTable
DROP TABLE "Master";

-- CreateTable
CREATE TABLE "masters" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "campainId" INTEGER NOT NULL,
    "masterType" "MasterType" NOT NULL DEFAULT 'MAIN_MASTER',

    CONSTRAINT "masters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "masters_userId_campainId_idx" ON "masters"("userId", "campainId");

-- CreateIndex
CREATE INDEX "user_auths_userId_idx" ON "user_auths"("userId");

-- AddForeignKey
ALTER TABLE "masters" ADD CONSTRAINT "masters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "masters" ADD CONSTRAINT "masters_campainId_fkey" FOREIGN KEY ("campainId") REFERENCES "campains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES "masters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
