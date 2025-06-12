'use server';

import { cartType, cartItemType } from '@/types';
import { convertToPlainObject, formatError, round2 } from '../utils/utils';
import { cookies } from 'next/headers';

const calcPrice = (items: cartItemType[]) => {
  const itemsPrice = round2(items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0));
  return {
    itemsPrice: itemsPrice.toFixed(2),
  };
};

export async function getCart() {
  const cookieStore = (await cookies());
  const sessionCart = cookieStore.get('sessionCart') || null;

  if (!sessionCart || !sessionCart.value || sessionCart.value == undefined) {
    return { success: false, message: 'Carrinho não encontrado', content: null };
  }

  const cart: cartType = JSON.parse(sessionCart.value);

  return convertToPlainObject({
    success: true,
    content: {
      items: cart.items as cartItemType[],
      itemsPrice: cart.itemsPrice.toString(),
    },
  });
}

export async function addItemToCart(product: cartItemType) {
  try {
    if (!product) return { success: false, message: 'Produto não encontrado' };

    const cookieStore = (await cookies());
    const sessionCart = cookieStore.get('sessionCart') || null;

    if (!sessionCart || sessionCart.value == undefined) {
      cookieStore.set(
        'sessionCart',
        JSON.stringify({
          items: [product],
          ...calcPrice([product]),
        }),
      );

      return {
        success: true,
        message: `${product.name} adicionado no carrinho`,
      };
    } else {
      let newCart: cartType = JSON.parse(sessionCart.value);
      const existItem: cartItemType | null =
        newCart.items.find((item) => product.id === item.id) || null;
      
      if (existItem) {
        newCart.items.find((item) => product.id === item.id)!.qty = existItem.qty + product.qty;
      } else {
        newCart.items.push(product);
      }

      newCart = { ...newCart, ...calcPrice(newCart.items) };

      cookieStore.set('sessionCart', JSON.stringify(newCart));

      return {
        success: true,
        message: `${product.name} ${existItem ? 'atualizado no' : 'adicionado no'} carrinho`,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: await formatError(error),
    };
  }
}

export async function removeItemFromCart(productId: string) {
  try {
    const cookieStore = (await cookies());
    const sessionCart = cookieStore.get('sessionCart') || null;
    if (!sessionCart) return { success: false, message: 'Carrinho não encontrado' };

    let newCart = JSON.parse(sessionCart.value);

    const itemExist: cartItemType = newCart.items.find(
      (item: cartItemType) => productId === item.id,
    );
    if (!itemExist) return { success: false, message: 'Produto não encontrado' };

    if (itemExist.qty === 1) {
      newCart.items = (newCart.items as cartItemType[]).filter((item) => item.id !== itemExist.id);
    } else {
      (newCart.items as cartItemType[]).find((item) => item.id === productId)!.qty =
        itemExist.qty - 1;
    }

    newCart = { ...newCart, ...calcPrice(newCart.items) };

    cookieStore.set('sessionCart', JSON.stringify(newCart));

    return {
      success: true,
      message: `${itemExist.name} foi removido do carrinho`,
    };
  } catch (error) {
    return { success: false, message: await formatError(error) };
  }
}

export async function deleteCart() {
  try {
    const cookieStore = (await cookies());

    const sessionCart = cookieStore.get('sessionCart') || null;
    if (!sessionCart) return { success: false, message: 'Carrinho não encontrado' };

    cookieStore.set('sessionCart', '', {
      path: '/',
      maxAge: 0,
    });

    return {
      success: true,
      message: 'Carrinho foi removido do carrinho com sucesso',
    };
  } catch (error) {
    return { success: false, message: await formatError(error) };
  }
}

