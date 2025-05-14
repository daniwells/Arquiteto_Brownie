'use server';

// Libs
import { prisma } from '../../db/prisma';
import { Prisma } from '@prisma/client';

// Utils
import { cartType } from '@/types';
import { convertToPlainObject, formatError } from '../utils';

// Auth
import { auth } from '../../../auth';

export async function getOrders() {
  const data = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return convertToPlainObject(data);
}

export const getOrderById = async (value: string) => {
  const order = await prisma.order.findFirst({
    where: { "id": value },
    include: {
      OrderItem: true,
    },
  });

  if (!order){
    return {
      success: false,
      message: `Produto não encontrado, id incorreto`,
    };
  }

  return {
    success: true,
    content: order,
  };
};

export const createOrder = async (cart: cartType, customerId: string) => {
  try {
    if (!cart) return { success: false, message: 'Carrinho não adicionado' };

    const session = await auth();
    if (!session) throw new Error('Usuário não autenticado');

    await prisma.$transaction(async (tx) => {
      // Cria o pedido
      const responseOrder = await tx.order.create({
        data: {
          customerId: customerId,
          itemsPrice: cart.itemsPrice,
          shippingPrice: 0,
          totalPrice: cart.itemsPrice,
          createdAt: new Date(),
        },
      });

      // Cria os items do pedido
      await Promise.all(
        cart.items.map(async (item) => {
          if (!item.id) throw new Error('Item ID is required');

          const responseOrderItem = await tx.orderItem.create({
            data: {
              orderId: responseOrder.id,
              productId: item.id,
              qty: item.qty,
              unitPrice: new Prisma.Decimal(item.price),
              slug: `order_${item.slug}_${responseOrder.createdAt.toISOString()}`,
            },
          });
          if (!responseOrderItem) {
            throw new Error('Erro ao criar o item do pedido');
          }
        }),
      );
    });

    return {
      success: true,
      message: 'Pedido criado com sucesso',
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error, 'order'),
    };
  }
};
