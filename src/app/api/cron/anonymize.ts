import { anonymizeCustomer } from '@/lib/services/anonymizeCustomer';
import { prisma } from '@/db/prisma';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).end();

  const daysInactive = 1;
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - daysInactive);

  const customers = await prisma.customer.findMany({
    where: {
      isAnonymized: false,
      updatedAt: { lt: cutoff },
    },
  });

  for (const customer of customers) {
    const data = anonymizeCustomer(customer);
    await prisma.customer.update({ where: { id: customer.id }, data });
  }

  res.status(200).json({ message: `${customers.length} clientes anonimizados` });
}