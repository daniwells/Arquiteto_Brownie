/*
  Warnings:

  - You are about to drop the column `position` on the `Product` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Product_position_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "position";
