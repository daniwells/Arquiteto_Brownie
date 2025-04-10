import { getCart, addItemToCart, removeItemFromCart } from "../lib/actions/cart.actions";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { cartItemType } from "@/types";

type mockCartType = {
    items: any[];
    itemsPrice: number;
    totalPrice: number;
}

const mockCart: mockCartType = {
    items: [],
    itemsPrice: 0,
    totalPrice: 0,
};

const mockCookies = (cart: mockCartType=mockCart) => {
    return {
        get: (name: string) => {
          if (name === "sessionCart") {
            return { name, value: JSON.stringify(cart) };
          }
          return undefined;
        },
        set: (name: string, value: string) => {
            console.log(`Mock cookie set: ${name} = ${value}`);
        },
    } as RequestCookies;
}

// Test get item cart
test("response must be equal", async () => {
    const response = await getCart(mockCookies());

    expect(
        response
    ).toEqual({items: [],itemsPrice: "0",totalPrice: "0",});
});

// Test get item cart with undefined values
test("response must fail", async () => {

    const newMockCookies ={
        get: () => {
            return undefined;
        },
    } as RequestCookies;

    const response = await getCart(newMockCookies);

    expect(
        response
    ).toEqual({"message": "Carrinho não encontrado", "success": false});
});

// Test add item to cart
test("item must be added", async () => {
    const product: cartItemType = {
        id: "string",
        createdAt: new Date(),
        name: "Clássico",
        slug: "classico_classico",
        category: "classico",
        description: 'Brownie de massa normal',
        images: [
            '/images/sample-products/p1-1.jpg',
            '/images/sample-products/p1-2.jpg',
        ],
        price: "4",
        qty: 1,
    }

    const response = await addItemToCart(product, mockCookies());

    expect(
        response
    ).toEqual({
        sucess: true,
        message: `${product.name} adicionado no carrinho`
    });
});

test("item must be removed", async () => {
    const product = {
        id: "1",
        createdAt: new Date(),
        name: "Clássico",
        slug: "classico_classico",
        category: "classico",
        description: 'Brownie de massa normal',
        images: [
            '/images/sample-products/p1-1.jpg',
            '/images/sample-products/p1-2.jpg',
        ],
        price: "4",
        qty: 1,
    }

    const newMockCart = {
        items: [product],
        itemsPrice: 0,
        totalPrice: 0,
    };

    const response = await removeItemFromCart(product.id, mockCookies(newMockCart));

    expect(
        response
    ).toEqual({
        success: true,
        message: `Clássico foi removido do carrinho`,
    });
});