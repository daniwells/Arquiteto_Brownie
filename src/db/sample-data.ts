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
            slug: 'classico_classico',
            category: 'classico',
            description: 'Brownie de massa normal',
            images: [
                '/images/sample-products/p1-1.jpg',
                '/images/sample-products/p1-2.jpg',
            ],
            price: 4.00,
            banner: 'banner-1.jpg',
            active: true,
        },
        {
            name: 'Confete',
            slug: 'confete_classico',
            category: 'classico',
            description: 'Brownie de massa normal, com cobertura de confetes',
            images: [
                '/images/sample-products/p2-1.jpg',
                '/images/sample-products/p2-2.jpg',
            ],
            price: 5.00,
            banner: 'banner-1.jpg',
            active: true,
        },
        {
            name: 'Meio amargo',
            slug: 'meio-amargo_meio-amargo',
            category: "meio-amargo",
            description: 'Brownie de massa meio amargo',
            images: [
                '/images/sample-products/p3-1.jpg',
                '/images/sample-products/p3-2.jpg',
                '/images/sample-products/p3-3.jpg',
            ],
            price: 5.99,
            banner: 'banner-1.jpg',
            active: false,
        },
    ]
}

export default sampleData;