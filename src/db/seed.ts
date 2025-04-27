import { PrismaClient } from '@prisma/client';
import sampleData from './sample-data';

async function main() {
  const prisma = new PrismaClient();
  await prisma.product.deleteMany();
  await prisma.manager.deleteMany();

  await prisma.product.createMany({ data: sampleData.products });
  await prisma.manager.createMany({ data: sampleData.managers });

  console.log('database seeded successfully!');
}

main();
