-- DropIndex
DROP INDEX "pcs_name_idx";

-- CreateIndex
CREATE INDEX "pcs_name_userId_campainId_idx" ON "pcs"("name", "userId", "campainId");

-- CreateIndex
CREATE INDEX "sessions_masterId_idx" ON "sessions"("masterId");
