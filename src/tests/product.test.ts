import { getLatestProducts, getProdutBySlug } from "../lib/actions/product.actions";

test("response must have the same attributes", async () => {
    const response = await getProdutBySlug("classico_classico");
    console.log(response)
    expect(
        {  
            ...response,
            price: response?.price.toString(),
        }
    ).toMatchObject({
        name: 'Clássico',
        slug: 'classico_classico',
        category: 'classico',
        description: 'Brownie de massa normal',
        images: [
            '/images/sample-products/p1-1.jpg',
            '/images/sample-products/p1-2.jpg',
        ],
        price: "4",
        banner: 'banner-1.jpg',
        active: true,
    });
});

test("response can't be false", async () => {
    const response = await getLatestProducts();
    await expect(response).toBeDefined();
})

