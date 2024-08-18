-- DropIndex
DROP INDEX "users_userEmail_userName_idx";

-- CreateIndex
CREATE INDEX "users_uid_userEmail_userName_idx" ON "users"("uid", "userEmail", "userName");
