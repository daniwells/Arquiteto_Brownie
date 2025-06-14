'use server';

// Services
import { validateCart } from '../services/order-services';

// Libs
import { prisma } from '../../db/prisma';
import { Prisma } from '@prisma/client';

// Utils
import { cartType, orderItemType, orderType } from '@/types';
import { convertToPlainObject, formatError, omitFields } from '../utils/utils';
import { CustomError } from '../utils/exceptions';

// Auth
import { auth } from '../../../auth';

export async function getOrders() {
  try{
    const data = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        customer: true,
      },
    });

    return {
      success: true,
      message: "",
      content: convertToPlainObject(data),
    };
    
  }catch (error) {
    return {
      success: false,
      message: await formatError(error),
      content: [],
    };
  }
}

export const getOrderById = async (value: string) => {
  try{
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
        message: `Produto não encontrado`,
      };
    }

    return {
      success: true,
      content: order,
    };
  }catch(error){
    return {
      success: false,
      message: await formatError(error),
    };
  }
};

export const createOrder = async (cart: cartType, customerId: string) => {
  try {
    if (!cart) return { success: false, message: 'Carrinho não adicionado' };
    const validatedCart = await validateCart(cart.items);

    await prisma.$transaction(async (tx) => {
      const responseOrder = await tx.order.create({
        data: {
          customerId: customerId,
          itemsPrice: (await validatedCart).total,
          totalPrice: (await validatedCart).total,
          createdAt: new Date(),
        },
      });
      
      await Promise.all(
        (await validatedCart).items.map(async (item) => {
          if (!item.id) throw new CustomError('Alguns produtos são inválidos ou inativos');

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
            throw new CustomError('Erro ao criar o item do pedido');
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
      message: await formatError(error, 'order'),
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
    if (!session) throw new CustomError('Usuário não autenticado');

    const responseOrderItem = await prisma.orderItem.update({
      where: {
        orderId_productId: {
          orderId: orderId,
          productId: productId,
        },
      },
      data: orderItem,
    });

    if (!responseOrderItem) throw new CustomError('Erro ao editar o item do pedido');

    return {
      success: true,
      message: 'Item do pedido editado com sucesso',
    };
  } catch (error) {
    return {
      success: false,
      message: await formatError(error, 'order'),
    };
  }
};

export const editOrder = async (order: orderType) => {
  try {
    if (!order) return { success: false, message: 'Pedido não encontrado' };

    const session = await auth();
    if (!session) throw new CustomError('Usuário não autenticado');

    const orderNoItems = omitFields(order, ['OrderItem', 'customer']);

    const responseOrder = await prisma.order.update({
      where: { id: order.id },
      data: orderNoItems,
    });

    if (!responseOrder) throw new CustomError('Erro ao editar o pedido');

    return {
      success: true,
      message: 'Pedido editado com sucesso',
    };
  } catch (error) {
    return {
      success: false,
      message: await formatError(error, 'order'),
    };
  }
};

export async function removeOrder(id: string) {
  try {
    if (!id) return { success: false, message: 'Pedido não encontrado' };

    const session = await auth();
    if (!session) throw new CustomError('Usuário não autenticado');

    const responseOrder = await prisma.order.delete({
      where: { id: id },
    });

    if (!responseOrder) throw new CustomError('Erro ao editar o pedido');

    return {
      success: true,
      message: 'Produto editado com sucesso',
    };
  } catch (error) {
    return {
      success: false,
      message: await formatError(error),
    };
  }
}