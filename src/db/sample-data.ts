import { hashSync }  from "bcrypt-ts-edge";

const sampleData = {
    managers: [
        {
            email: "admin@example.com",
            password: hashSync("123456", 10)
        },
    ],
    products: [
        {
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
        },
        {
            name: 'Brooks Brothers Long Sleeved Shirt',
            slug: 'brooks-brothers-long-sleeved-shirt',
            category: "Men's Dress Shirts",
            description: 'Timeless style and premium comfort',
            images: [
                '/images/sample-products/p2-1.jpg',
                '/images/sample-products/p2-2.jpg',
            ],
            price: 85.9,
            brand: 'Brooks Brothers',
            rating: 4.2,
            numReviews: 8,
            stock: 10,
            isFeatured: true,
            banner: 'banner-2.jpg',
        },
        {
            name: 'Tommy Hilfiger Classic Fit Dress Shirt',
            slug: 'tommy-hilfiger-classic-fit-dress-shirt',
            category: "Men's Dress Shirts",
            description: 'A perfect blend of sophistication and comfort',
            images: [
                '/images/sample-products/p3-1.jpg',
                '/images/sample-products/p3-2.jpg',
                '/images/sample-products/p3-3.jpg',
            ],
            price: 99.95,
            brand: 'Tommy Hilfiger',
            rating: 4.9,
            numReviews: 3,
            stock: 0,
            isFeatured: false,
            banner: null,
        },
    ]
}

export default sampleData;