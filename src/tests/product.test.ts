import { getLatestProducts, getProdutBySlug } from "../lib/actions/product.actions";

test("response must have the same attributes", () => {
    const response = getProdutBySlug("classico")
    expect(response).toEqual({
        name: 'Clássico',
        slug: 'classico',
        category: 'classico',
        description: 'Brownie de massa normal',
        images: [
            '/images/sample-products/p1-1.jpg',
            '/images/sample-products/p1-2.jpg',
        ],
        price: 59.99,
        brand: 'Polo',
        rating: 4.5,
        numReviews: 10,
        stock: 5,
        isFeatured: true,
        banner: 'banner-1.jpg',
    });
})

