-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'NORMAL');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "userRole" "UserRole" NOT NULL DEFAULT 'NORMAL';
