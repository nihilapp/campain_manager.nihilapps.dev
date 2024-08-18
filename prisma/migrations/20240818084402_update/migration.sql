/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `user_auths` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "masters_userId_campainId_idx";

-- DropIndex
DROP INDEX "pcs_name_userId_campainId_idx";

-- DropIndex
DROP INDEX "sessions_masterId_idx";

-- CreateIndex
CREATE INDEX "pcs_name_idx" ON "pcs"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_auths_userId_key" ON "user_auths"("userId");
