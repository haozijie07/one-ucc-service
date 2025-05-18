/*
  Warnings:

  - You are about to drop the `Menu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RoleMenus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RolePermissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserRoles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Permission" DROP CONSTRAINT "Permission_menuId_fkey";

-- DropForeignKey
ALTER TABLE "_RoleMenus" DROP CONSTRAINT "_RoleMenus_A_fkey";

-- DropForeignKey
ALTER TABLE "_RoleMenus" DROP CONSTRAINT "_RoleMenus_B_fkey";

-- DropForeignKey
ALTER TABLE "_RolePermissions" DROP CONSTRAINT "_RolePermissions_A_fkey";

-- DropForeignKey
ALTER TABLE "_RolePermissions" DROP CONSTRAINT "_RolePermissions_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserRoles" DROP CONSTRAINT "_UserRoles_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserRoles" DROP CONSTRAINT "_UserRoles_B_fkey";

-- DropTable
DROP TABLE "Menu";

-- DropTable
DROP TABLE "Permission";

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "_RoleMenus";

-- DropTable
DROP TABLE "_RolePermissions";

-- DropTable
DROP TABLE "_UserRoles";

-- DropEnum
DROP TYPE "MenuType";
