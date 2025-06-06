'use server';

// Services
import { validateCart } from '../services/order-services';

// Libs
import { prisma } from '../../db/prisma';
import { Prisma } from '@prisma/client';

// Utils
import { cartType, orderItemType, orderType } from '@/types';
import { convertToPlainObject, formatError, omitFields } from '../utils';

// Auth
import { auth } from '../../../auth';

export async function getOrders() {
  const data = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      customer: true,
    },
  });

  return convertToPlainObject(data);
}

export const getOrderById = async (value: string) => {
  const order = await prisma.order.findFirst({
    where: { id: value },
    include: {
      customer: true,
      OrderItem: true,
    },
  });

  if (!order) {
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

    const validatedCart = validateCart(cart.items);

    await prisma.$transaction(async (tx) => {
      // Create order
      const responseOrder = await tx.order.create({
        data: {
          customerId: customerId,
          itemsPrice: (await validatedCart).total,
          totalPrice: (await validatedCart).total,
          createdAt: new Date(),
        },
      });

      // Create the items of the order
      await Promise.all(
        (await validatedCart).items.map(async (item) => {
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

export const editOrderItem = async (
  orderId: string,
  productId: string,
  orderItem: orderItemType,
) => {
  try {
    if (!orderItem || !orderId || !productId)
      return { success: false, message: 'Item do pedido não encontrado' };

    const session = await auth();
    if (!session) throw new Error('Usuário não autenticado');

    // Edit order
    const responseOrderItem = await prisma.orderItem.update({
      where: {
        orderId_productId: {
          orderId: orderId,
          productId: productId,
        },
      },
      data: orderItem,
    });

    if (!responseOrderItem) throw new Error('Erro ao editar o item do pedido');

    return {
      success: true,
      message: 'Item do pedido editado com sucesso',
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error, 'order'),
    };
  }
};

export const editOrder = async (order: orderType) => {
  try {
    if (!order) return { success: false, message: 'Pedido não encontrado' };

    const session = await auth();
    if (!session) throw new Error('Usuário não autenticado');

    const orderNoItems = omitFields(order, ['OrderItem', 'customer']);

    // Edit order
    const responseOrder = await prisma.order.update({
      where: { id: order.id },
      data: orderNoItems,
    });

    if (!responseOrder) throw new Error('Erro ao editar o pedido');

    return {
      success: true,
      message: 'Pedido editado com sucesso',
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error, 'order'),
    };
  }
};

export async function removeOrder(id: string) {
  try {
    if (!id) return { success: false, message: 'Pedido não encontrado' };

    const session = await auth();
    if (!session) throw new Error('Usuário não autenticado');

    const responseOrder = await prisma.order.delete({
      where: { id: id },
    });

    if (!responseOrder) throw new Error('Erro ao editar o pedido');

    return {
      success: true,
      message: 'Produto editado com sucesso',
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
