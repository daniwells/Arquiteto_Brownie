import crypto from 'crypto';
import { customerType } from "@/types";

export const anonymizeCustomer = (customer: customerType) => {
    const hash = crypto.createHash('sha256').update(String(customer.id)).digest('hex').slice(0, 10);

    return {
        ...customer,
        name: 'Anonymous',
        phone: `+550000000${hash}`,
        number: 'Anonymized',
        cep: '00000-000',
        updatedAt: new Date(),
        isAnonymized: true,
    };
}