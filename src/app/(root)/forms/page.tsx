import FormsContent from './forms-content';
import { getCart } from '@/lib/actions/cart.actions';

export const metadata = {
  title: 'Formulário',
};

const Forms = async () => {
  const cart = await getCart();
  return <FormsContent itemsPrice={cart?.content ? cart?.content.itemsPrice : '0'} />;
};

export default Forms;
