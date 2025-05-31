/*
  Warnings:

  - You are about to drop the column `shippingPrice` on the `Order` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "OrderStatus" ADD VALUE 'FINALIZADO';

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "shippingPrice";
