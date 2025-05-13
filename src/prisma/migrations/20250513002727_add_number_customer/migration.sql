/*
  Warnings:

  - Added the required column `number` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "number" TEXT NOT NULL;
