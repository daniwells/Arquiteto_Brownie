import { prisma } from '../../db/prisma';
import { cartItemType } from '@/types';
import { CustomError } from '../utils/exceptions';

export const validateCart = async (cartItems: cartItemType[]) => {
    const ids = cartItems.map((item) => item.id || "");

    const products = await prisma.product.findMany({
        where: {
            id: { in: ids },
            active: true,
        },
        select: {
            id: true,
            name: true,
            price: true,
        },
    });

    if (products.length !== cartItems.length) {
        throw new CustomError("Alguns produtos são inválidos ou inativos");
    }

    const itemsWithPrice = cartItems.map((item) => {
        const product = products.find((p) => p.id === item.id);
        if (!product) {
            throw new CustomError(`Produto ${item.category} - ${item.name} não encontrado`);
        }
        const subtotal = Number(product.price) * item.qty;
        return {
            ...item,
            price: Number(product.price),
            subtotal,
        };
    });

    const total = itemsWithPrice.reduce(
        (acc, item) => acc + item.subtotal,
        0
    );

    return {
        items: itemsWithPrice,
        total,
    };
}
