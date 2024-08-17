-- CreateEnum
CREATE TYPE "MasterType" AS ENUM ('MAIN_MASTER', 'SUB_MASTER');

-- CreateEnum
CREATE TYPE "CampainStatus" AS ENUM ('READY', 'OPEN', 'CLOSE');

-- CreateEnum
CREATE TYPE "SessionType" AS ENUM ('MINI', 'HALF', 'DEFAULT');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "userEmail" TEXT NOT NULL,
    "userName" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_auths" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,

    CONSTRAINT "user_auths_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Master" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "campainId" INTEGER NOT NULL,
    "masterType" "MasterType" NOT NULL DEFAULT 'MAIN_MASTER',

    CONSTRAINT "Master_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campains" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3),
    "campainStatus" "CampainStatus" NOT NULL DEFAULT 'READY',

    CONSTRAINT "campains_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" SERIAL NOT NULL,
    "masterId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "gamers" INTEGER NOT NULL,
    "gameDate" TEXT,
    "exp" INTEGER,
    "gold" INTEGER,
    "sessionType" "SessionType" NOT NULL DEFAULT 'DEFAULT',

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pcs" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "campainId" INTEGER NOT NULL,
    "generation" INTEGER NOT NULL,
    "slot" INTEGER DEFAULT 1,
    "name" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "class1" TEXT NOT NULL,
    "class2" TEXT,
    "level1" INTEGER NOT NULL,
    "level2" INTEGER,
    "levelTotal" INTEGER NOT NULL,
    "currentExp" INTEGER NOT NULL,
    "money" INTEGER NOT NULL,
    "backStory" TEXT,

    CONSTRAINT "pcs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_userEmail_key" ON "users"("userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "users_userName_key" ON "users"("userName");

-- CreateIndex
CREATE INDEX "users_userEmail_userName_idx" ON "users"("userEmail", "userName");

-- CreateIndex
CREATE UNIQUE INDEX "campains_name_key" ON "campains"("name");

-- CreateIndex
CREATE INDEX "campains_name_idx" ON "campains"("name");

-- CreateIndex
CREATE UNIQUE INDEX "pcs_name_key" ON "pcs"("name");

-- CreateIndex
CREATE INDEX "pcs_name_idx" ON "pcs"("name");

-- AddForeignKey
ALTER TABLE "user_auths" ADD CONSTRAINT "user_auths_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Master" ADD CONSTRAINT "Master_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Master" ADD CONSTRAINT "Master_campainId_fkey" FOREIGN KEY ("campainId") REFERENCES "campains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES "Master"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pcs" ADD CONSTRAINT "pcs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pcs" ADD CONSTRAINT "pcs_campainId_fkey" FOREIGN KEY ("campainId") REFERENCES "campains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
