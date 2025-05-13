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

export const createOrder = async (cart: cartType, customerId: string) => {
    try {
        if (!cart) return { success: false, message: 'Carrinho não adicionado' };

        const session = await auth();
        if (!session) throw new Error('Usuário não autenticado');

        // Create Order
        const responseOrder = await prisma.order.create({ 
            data: {
                customerId: customerId,
                itemsPrice: cart.itemsPrice,
                shippingPrice: 0,
                totalPrice: cart.itemsPrice,
                createdAt: new Date(),
            }
        });

        if (!responseOrder) throw new Error('Erro ao criar o pedido');

        // Create orderItem
        cart.items.map(async (item) => {
            if (!item.id) throw new Error("Item ID is required");

            const responseOrderItem = await prisma.orderItem.create({ data: {
                orderId: responseOrder.id,
                productId: item.id,
                qty: item.qty,
                unitPrice: new Prisma.Decimal(item.price),
                slug: "order"+"_"+item.slug+"_"+responseOrder.createdAt,
            }});

            if (!responseOrderItem) throw new Error('Erro ao criar o item do pedido');
        })
    
        return {
            success: true,
            message: 'Pedido criado com sucesso',
        };
    } catch (error) {
        return {
            success: false,
            message: formatError(error),
        };
    }
}