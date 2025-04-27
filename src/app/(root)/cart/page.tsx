import CartContent from './cart-content';
import { getCart } from '@/lib/actions/cart.actions';

export const metadata = {
  title: 'Carrinho',
};

const Cart = async () => {
  const cart = await getCart();
  return <CartContent cart={cart?.content ? cart?.content : undefined} />;
};

export default Cart;
