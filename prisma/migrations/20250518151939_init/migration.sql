-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('男', '女', '其他');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "email" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "sex" "Sex" NOT NULL,
    "address" TEXT NOT NULL,
    "nativeAddress" TEXT NOT NULL,
    "idCard" TEXT NOT NULL,
    "isEnable" BOOLEAN NOT NULL DEFAULT true,
    "loginIpList" TEXT[],
    "lastLoginAt" TIMESTAMP(3),
    "loginFailCount" INTEGER NOT NULL DEFAULT 0,
    "loginLockedUnitl" TIMESTAMP(3),
    "joinTime" TIMESTAMP(3) NOT NULL,
    "leaveTime" TIMESTAMP(3),
    "position" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,
    "remark" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_mobile_key" ON "User"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "User_idCard_key" ON "User"("idCard");
