import { PrismaClient } from '@prisma/client';
import sampleData from './sample-data';

async function main() {
  const prisma = new PrismaClient();
  await prisma.product.deleteMany();
  await prisma.manager.deleteMany();

  // await prisma.product.createMany({ data: sampleData.products });
  await prisma.manager.createMany({ data: sampleData.managers });

  for (const product of sampleData.products) {
    let category = await prisma.category.findUnique({
      where: { category: product.category },
    });

    if (!category) {
      category = await prisma.category.create({
        data: { category: product.category },
      });
    }

    await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        images: product.images,
        price: product.price,
        active: product.active,
        categoryId: category.id,
      },
    });
  }

  console.log('database seeded successfully!');
}

main();
