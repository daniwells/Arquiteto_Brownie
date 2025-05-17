-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDENTE', 'PRONTO', 'ENTREGUE');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'PENDENTE';
