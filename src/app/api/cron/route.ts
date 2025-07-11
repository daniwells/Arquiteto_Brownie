import { NextResponse } from 'next/server';
import { anonymizeCustomer } from '@/lib/services/anonymizeCustomer';
import { prisma } from '@/db/prisma';

export async function POST() {
    const daysInactive = 1;
//   const cutoff = new Date();
//   cutoff.setDate(cutoff.getDate() - daysInactive);
    const cutoff = new Date(Date.now() - daysInactive * 60 * 1000);

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

    return NextResponse.json({
        message: `${customers.length} clientes anonimizados`,
    });
}