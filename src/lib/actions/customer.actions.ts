'use server';

// Libs
import { prisma } from '../../db/prisma';

// Utils
import { customerType } from '@/types';
import { formatError } from '../utils/utils';
import { insertCustomerSchema } from '../validators';

export const createCustomer = async (customer: customerType) => {
  try {
    if (!customer) return { success: false, message: 'Cliente não encontrado' };

    const searchCustomer = await prisma.customer.findFirst({ where: { phone: customer.phone } });

    if (!searchCustomer) {
      const customerValidated = insertCustomerSchema.parse(customer);
      // Create Customer
      const response = await prisma.customer.create({ data: customerValidated });

      if (!response) throw new Error('Erro ao cadastrar os dados do cliente');

      return {
        success: true,
        message: 'Cliente cadastrado com sucesso',
        content: response.id,
      };
    }

    // Edit customer
    const response = await prisma.customer.update({
      where: { phone: customer.phone },
      data: customer,
    });
    if (!response) throw new Error('Erro ao atualizar os dados do cliente');

    return {
      success: true,
      message: 'Cliente atualizado com sucesso',
      content: response.id,
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
};
