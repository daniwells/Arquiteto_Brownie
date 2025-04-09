import { getCart } from "../lib/actions/cart.actions";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

test("response must be equal", async () => {
    const mockCart = {
        items: [],
        itemsPrice: 0,
        totalPrice: 0,
    };

    const mockCookies: RequestCookies = {
        get: (name: string) => {
          if (name === "sessionCart") {
            return { name, value: JSON.stringify(mockCart) };
          }
          return undefined;
        },
      } as RequestCookies;

    const response = await getCart(mockCookies);
    console.log(response)
    expect(
        response
    ).toEqual({items: [],itemsPrice: "0",totalPrice: "0",});
});

test("response must fail", async () => {
    const mockCart = undefined;

    const mockCookies: RequestCookies = {
        get: (name: string) => {
          if (name === "sessionCart") {
            return { name, value: JSON.stringify(mockCart) };
          }
          return undefined;
        },
      } as RequestCookies;

    const response = await getCart(mockCookies);
    console.log(response)
    expect(
        response
    ).toEqual({"message": "Carrinho não encontrado", "success": false});
});

// test("item must be added", async () => {
//     const mockCart = undefined;

//     const mockCookies: RequestCookies = {
//         get: (name: string) => {
//           if (name === "sessionCart") {
//             return { name, value: JSON.stringify(mockCart) };
//           }
//           return undefined;
//         },
//       } as RequestCookies;
// });