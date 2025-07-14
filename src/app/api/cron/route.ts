import { NextResponse } from 'next/server';
import { anonymizeCustomer } from '@/lib/services/anonymizeCustomer';
import { prisma } from '@/db/prisma';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response('Unauthorized', {
        status: 401,
        });
    }

    const daysInactive = 180;
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

    return NextResponse.json({
        message: `${customers.length} clientes anonimizados`,
    });
}