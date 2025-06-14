import { getOrders, getOrderById, createOrder } from '@/lib/actions/order.actions';
import { prisma } from '@/db/prisma';
import { validateCart } from '@/lib/services/order-services';

describe('getOrders', () => {
  it('should return orders successfully', async () => {
    const mockOrders = [
      {
        id: 'order1',
        createdAt: new Date().toLocaleDateString(),
        customer: {
          id: 'cust1',
          name: 'Daniel',
        },
      },
    ];

    (prisma.order.findMany as jest.Mock).mockResolvedValue(mockOrders);

    const result = await getOrders();

    expect(prisma.order.findMany).toHaveBeenCalledWith({
      orderBy: { createdAt: 'desc' },
      include: {
        customer: true,
      },
    });

    expect(result).toEqual({
      success: true,
      message: '',
      content: mockOrders,
    });
  });

  it('should fail when there is an unespected error', async () => {
    (prisma.order.findMany as jest.Mock).mockRejectedValue(new Error());

    const result = await getOrders();

    expect(result).toEqual({
      success: false,
      message: 'Ocorreu um erro inesperado',
      content: [],
    });
  });
});

describe('getOrderById', () => {

  it('should return order by id successfully', async () => {
    const fakeOrder = {
      id: 'order123',
      customer: { id: 'cust1', name: 'Daniel' },
      OrderItem: [],
    };

    (prisma.order.findFirst as jest.Mock).mockResolvedValue(fakeOrder);

    const result = await getOrderById('order123');

    expect(result).toEqual({
      success: true,
      content: fakeOrder,
    });
  });

  it('should return error if order not found', async () => {
    (prisma.order.findFirst as jest.Mock).mockResolvedValue(null);

    const result = await getOrderById('invalid-id');

    expect(result).toEqual({
      success: false,
      message: 'Produto não encontrado',
    });
  });

  it('should handle exception thrown from prisma', async () => {
    (prisma.order.findFirst as jest.Mock).mockRejectedValue(new Error('DB crash'));

    const result = await getOrderById('order-error');

    expect(result).toEqual({
      success: false,
      message: 'Ocorreu um erro inesperado',
    });
  });
});

describe('createOrder', () => {
  const mockTransaction = prisma.$transaction as jest.Mock;
  const mockValidateCart = validateCart as jest.Mock;

  it('should fail if cart is not provided', async () => {
    const result = await createOrder(null as any, 'customer123');

    expect(result).toEqual({
      success: false,
      message: 'Carrinho não adicionado',
    });
  });

  it('should create order and items successfully', async () => {
    const mockCart = {
      items: [{ id: 'prod1', qty: 2, price: 10, slug: 'product-1' }],
    };

    const validatedCart = {
      total: 20,
      items: [
        { id: 'prod1', qty: 2, price: 10, slug: 'product-1' },
      ],
    };

    mockValidateCart.mockResolvedValue(validatedCart);

    mockTransaction.mockImplementation(async (cb: any) => {
      const mockCreate = jest.fn().mockResolvedValue({ id: 'order123', createdAt: new Date() });
      const mockOrderItem = jest.fn().mockResolvedValue(true);

      await cb({
        order: { create: mockCreate },
        orderItem: { create: mockOrderItem },
      });
    });

    const result = await createOrder(mockCart as any, 'customer123');

    expect(result).toEqual({
      success: true,
      message: 'Pedido criado com sucesso',
    });


    expect(mockValidateCart).toHaveBeenCalledWith(mockCart.items);
  });

  it('should fail when there is an unespected error ', async () => {
    const mockCart = {
      items: [{ id: null, qty: 1, price: 5, slug: 'bad-product' }],
    };

    const validatedCart = {
      total: 5,
      items: mockCart.items,
    };

    mockValidateCart.mockResolvedValue(validatedCart);

    mockTransaction.mockImplementation(async () => {
      throw new Error('transaction error');
    });

    const result = await createOrder(mockCart as any, 'customer123');

    expect(result).toEqual({
      success: false,
      message: 'Ocorreu um erro inesperado',
    });
  });
});