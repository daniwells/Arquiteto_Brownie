import { hashSync } from 'bcrypt-ts-edge';

const sampleData = {
  managers: [
    {
      email: 'admin@example.com',
      password: hashSync('123456', 10),
    },
  ],
  products: [
    {
      name: 'Clássico',
      slug: 'classico_classico',
      category: 'Clássicos',
      description: 'Brownie de massa normal',
      images: [
        '/images/sample-products/(classico_classico-123456789)p1-1.jpg',
        '/images/sample-products/(classico_classico-123456789)p1-2.jpg'
      ],
      price: 4.0,
      active: true,
    },
    {
      name: 'Confete',
      slug: 'confete_classico',
      category: 'Clássicos',
      description: 'Brownie de massa normal, com cobertura de confetes',
      images: [
        '/images/sample-products/(confete_classico-123456789)p2-1.jpg',
        '/images/sample-products/(confete_classico-123456789)p2-2.jpg'
      ],
      price: 5.0,
      active: true,
    },
    {
      name: 'Meio amargo',
      slug: 'meio-amargo_meio-amargo',
      category: 'Meio Amargo',
      description: 'Brownie de massa meio amargo',
      images: [
        '/images/sample-products/(meio-amargo_meio-amargo-123456789)p3-1.jpg',
        '/images/sample-products/(meio-amargo_meio-amargo-123456789)p3-2.jpg',
        '/images/sample-products/(meio-amargo_meio-amargo-123456789)p3-3.jpg',
      ],
      price: 5.99,
      active: false,
    },
  ],
};

export default sampleData;
