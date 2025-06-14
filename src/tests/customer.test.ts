import { createCustomer } from '@/lib/actions/customer.actions';
import { prisma } from '@/db/prisma';

describe('createCustomer', () => {
  const mockCustomer = {
    name: 'Daniel',
    phone: '12345678910',
    number: '123',
    cep: '12345678',
  };

  afterEach(() => jest.clearAllMocks());

  it('should return error if customer is not provided', async () => {
    const result = await createCustomer(undefined as any);
    expect(result).toEqual({
      success: false,
      message: 'Cliente não encontrado',
    });
  });

  it('should create a new customer if not found', async () => {
    (prisma.customer.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.customer.create as jest.Mock).mockResolvedValue({ id: 'cust123' });

    const result = await createCustomer(mockCustomer);

    expect(prisma.customer.create).toHaveBeenCalledWith({ data: mockCustomer });
    expect(result).toEqual({
      success: true,
      message: 'Cliente cadastrado com sucesso',
      content: 'cust123',
    });
  });

  it('should update an existing customer if found', async () => {
    (prisma.customer.findFirst as jest.Mock).mockResolvedValue({ id: 'existing' });
    (prisma.customer.update as jest.Mock).mockResolvedValue({ id: 'updated' });

    const result = await createCustomer(mockCustomer);

    expect(prisma.customer.update).toHaveBeenCalledWith({
      where: { phone: mockCustomer.phone },
      data: mockCustomer,
    });
    expect(result).toEqual({
      success: true,
      message: 'Cliente atualizado com sucesso',
      content: 'updated',
    });
  });

  it('should return error if create fails', async () => {
    (prisma.customer.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.customer.create as jest.Mock).mockResolvedValue(null);

    const result = await createCustomer(mockCustomer);

    expect(result.success).toBe(false);
    expect(result.message).toBe('Erro ao cadastrar os dados do cliente');
  });

  it('should return error if update fails', async () => {
    (prisma.customer.findFirst as jest.Mock).mockResolvedValue({ id: 'existing' });
    (prisma.customer.update as jest.Mock).mockResolvedValue(null);

    const result = await createCustomer(mockCustomer);

    expect(result.success).toBe(false);
    expect(result.message).toBe('Erro ao atualizar os dados do cliente');
  });
});