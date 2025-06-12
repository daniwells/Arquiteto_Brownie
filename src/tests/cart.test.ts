import { getCart, addItemToCart, removeItemFromCart, deleteCart } from '../lib/actions/cart.actions';
import { cartItemType } from '@/types';
import { cookies as realCookies } from 'next/headers';

type mockCartType = {
  items: any[];
  itemsPrice: string;
};

const mockCart: mockCartType = {
  items: [],
  itemsPrice: '0',
};

const mockProduct: cartItemType = {
  id: '1',
  name: 'Brownie Clássico',
  price: '50',  
  qty: 3,
  slug: 'classico_classico', 
  category: 'Clássico',
  description: 'Desc',
  active: true,
  images: ['']
};

const mockCookieStore = (getValue: string | null = null) => {
  const set = jest.fn();
  const get = jest.fn().mockReturnValue(getValue ? { value: getValue } : undefined);
  return { get, set };
};

describe('getCart', () => {
  const encodedCart = JSON.stringify(mockCart);

  it('Should fail if cookie is undefined', async () => {
    (realCookies as jest.Mock).mockResolvedValue(mockCookieStore(undefined));

    const result = await getCart();
    expect(result).toEqual({
      success: false,
      message: 'Carrinho não encontrado',
      content: null,
    });
  });

  it('Should return the cart content successfully', async () => {
    (realCookies as jest.Mock).mockResolvedValue(mockCookieStore(encodedCart));

    const result = await getCart();
    expect(result).toEqual({
      success: true,
      content: {
        items: mockCart.items,
        itemsPrice: mockCart.itemsPrice.toString(),
      },
    });
  });
});

describe('addItemToCart', () => {
  it('Should fail if product was not sent', async () => {
    const result = await addItemToCart(undefined as any);
    expect(result).toEqual({ success: false, message: 'Produto não encontrado' });
  });

  it('Must create a new cart if not exist', async () => {
    const store = mockCookieStore(null);
    (realCookies as jest.Mock).mockReturnValue(store);

    const result = await addItemToCart(mockProduct);

    expect(store.set).toHaveBeenCalledWith(
      'sessionCart',
      JSON.stringify({
        items: [mockProduct],
        itemsPrice: '150.00',
      })
    );

    expect(result).toEqual({
      success: true,
      message: `${mockProduct.name} adicionado no carrinho`,
    });
  });

  it('Add a new item into currently cart', async () => {

    const store = mockCookieStore(JSON.stringify(mockCart));
    (realCookies as jest.Mock).mockReturnValue(store);

    const result = await addItemToCart(mockProduct);

    expect(store.set).toHaveBeenCalledWith(
      'sessionCart',
      JSON.stringify({
        items: [mockProduct],
        itemsPrice: '150.00',
      })
    );

    expect(result).toEqual({
      success: true,
      message: `${mockProduct.name} adicionado no carrinho`,
    });
  });

  it('Update item into currently cart', async () => {
    const existingCart = {
        items: [{ ...mockProduct, qty: 3 }],
        itemsPrice: "150.00",
    };

    const store = mockCookieStore(JSON.stringify(existingCart ));
    (realCookies as jest.Mock).mockReturnValue(store);

    const result = await addItemToCart(mockProduct);

    expect(result).toEqual({
      success: true,
      message: `${mockProduct.name} atualizado no carrinho`,
    });
  });

  it('Should return the error message if the function fail', async () => {
    (realCookies as jest.Mock).mockImplementation(() => {
      throw new Error('Fail');
    });

    const result = await addItemToCart(mockProduct);

    expect(result).toEqual({
      success: false,
      message: 'Ocorreu um erro inesperado',
    });
  });
});

describe('removeItemFromCart', () => {
  it('Should fail if cart not exist', async () => {
    const store = mockCookieStore(null);
    (realCookies as jest.Mock).mockReturnValue(store);

    const result = await removeItemFromCart('1');

    expect(result).toEqual({
      success: false,
      message: 'Carrinho não encontrado',
    });
  });

  it('Should fail if product was not found', async () => {
    const store = mockCookieStore(JSON.stringify(mockCart));
    (realCookies as jest.Mock).mockReturnValue(store);

    const result = await removeItemFromCart('1');

    expect(result).toEqual({
      success: false,
      message: 'Produto não encontrado',
    });
  });

  it('If qty is equal to 1, product must be removed from cart', async () => {
    const cart = {
      items: [{ ...mockProduct, qty: 1 }],
      itemsPrice: "150.00",
    };
    const store = mockCookieStore(JSON.stringify(cart));
    (realCookies as jest.Mock).mockReturnValue(store);

    const result = await removeItemFromCart(mockProduct.id || "1");

    expect(result).toEqual({
      success: true,
      message: `${mockProduct.name} foi removido do carrinho`,
    });
  });

  it('Decrease item quantity when qty is greatest than 1', async () => {
    const cart = {
      items: [{ ...mockProduct, qty: 3 }],
      itemsPrice: "150.00",
    };
    const store = mockCookieStore(JSON.stringify(cart));
    (realCookies as jest.Mock).mockReturnValue(store);

    const result = await removeItemFromCart(mockProduct.id || "1");

    expect(store.set).toHaveBeenCalledWith(
      'sessionCart',
      JSON.stringify({
        items: [{ ...mockProduct, qty: 2 }],
        itemsPrice: "100.00",
      })
    );

    expect(result).toEqual({
      success: true,
      message: `${mockProduct.name} foi removido do carrinho`,
    });
  });

  it('Should fail when there is a exception', async () => {
    (realCookies as jest.Mock).mockImplementation(() => {
      throw new Error('Fail');
    });

    const result = await removeItemFromCart('1');

    expect(result).toEqual({
      success: false,
      message: 'Ocorreu um erro inesperado',
    });
  });
});

describe('deleteCart', () => {
  it('Should fail if cart not exist', async () => {
    const store = mockCookieStore(undefined);
    (realCookies as jest.Mock).mockReturnValue(store);

    const result = await deleteCart();

    expect(result).toEqual({
      success: false,
      message: 'Carrinho não encontrado',
    });
    expect(store.set).not.toHaveBeenCalled();
  });

  it('Remove cart successfully', async () => {
    const store = mockCookieStore(JSON.stringify(mockCart));
    (realCookies as jest.Mock).mockReturnValue(store);

    const result = await deleteCart();

    expect(store.set).toHaveBeenCalledWith('sessionCart', '', {
      path: '/',
      maxAge: 0,
    });

    expect(result).toEqual({
      success: true,
      message: 'Carrinho foi removido do carrinho com sucesso',
    });
  });

  it('Should return error message when ther is a generic exception', async () => {
    (realCookies as jest.Mock).mockImplementation(() => {
      throw new Error('Fail');
    });

    const result = await deleteCart();

    expect(result).toEqual({
      success: false,
      message: 'Ocorreu um erro inesperado',
    });
  });
});