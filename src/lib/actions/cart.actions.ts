"use server";

import { cartType, cartItemType } from "@/types";
import { convertToPlainObject, formatError, round2} from "../utils";
import { cookies } from "next/headers";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

const calcPrice = (items: cartItemType[]) => {
    const itemsPrice = round2(
        items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
    )
    return {
        itemsPrice: itemsPrice.toFixed(2),
    }
}

export async function getCart(mockCookies?: RequestCookies){
    // Get user cart from cookies
    const cookieStore = mockCookies ?? (await cookies());
    const sessionCart = cookieStore.get("sessionCart") || null;
    
    if(!sessionCart || !sessionCart.value || sessionCart.value == undefined){
        return {success: false, message: "Carrinho não encontrado", content: null};
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

export async function addItemToCart(product: cartItemType, mockCookies?: RequestCookies){
    try{
        if(!product) return {success: false, message: "Produto não encontrado"};

        const cookieStore = mockCookies ?? (await cookies());
        const sessionCart = cookieStore.get("sessionCart") || null;
        
        if(!sessionCart || sessionCart.value == undefined ){
            cookieStore.set("sessionCart", JSON.stringify({items: [product], ...calcPrice([product]),}));

            return {
                sucess: true,
                message: `${product.name} adicionado no carrinho`
            }
        } else {
            // Check if item is already in cart
            let newCart: cartType = JSON.parse(sessionCart.value);
            const existItem: cartItemType | null = (newCart.items).find((item) => product.id === item.id) || null;
            
            // Check if item exist
            if (existItem){
                // Increase the quantity
                (newCart.items).find((item) => product.id === item.id)!.qty = existItem.qty + product.qty;
            }else{
                // Add item to the cart.items
                newCart.items.push(product);
            }
            
            newCart = {...newCart, ...calcPrice(newCart.items),};

            // Save cart
            cookieStore.set("sessionCart", JSON.stringify(newCart));
            
            return {
                sucess: true,
                message: `${product.name} ${existItem ? "atualizado no" : "adicionado no"} carrinho`
            }
        }
    }catch (error){
        return{
            success: false,
            message: formatError(error)
        };
    }
}

export async function removeItemFromCart(productId: string, mockCookies?: RequestCookies){
    try{

        const cookieStore = mockCookies ?? (await cookies());
        const sessionCart = cookieStore.get("sessionCart") || null;
        if(!sessionCart) return {success: false, message: "Carrinho não encontrado"};
        
        const newCart = JSON.parse(sessionCart.value);
        
        // Get Product
        const itemExist: cartItemType = (newCart.items).find((item: cartItemType) => productId === item.id);
        if(!itemExist) return {success: false, message: "Produto não encontrado"};

        // Check if only one in qty
        if(itemExist.qty === 1){
            // Remove from cart
            newCart.items = (newCart.items as cartItemType[]).filter((item) => item.id !== itemExist.id);
        }else{
            // Decrease qty
            (newCart.items as cartItemType[]).find((item) => item.id === productId)!.qty = itemExist.qty -1;
        }

        // Save cart
        cookieStore.set("sessionCart", JSON.stringify(newCart));

        return {
            success: true,
            message: `${itemExist.name} foi removido do carrinho`,
        };

    }catch(error){
        return { success: false, message: formatError(error) }
    }
}