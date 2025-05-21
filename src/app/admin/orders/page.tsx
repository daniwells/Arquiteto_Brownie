import OrdersContent from './orders-content';
import { auth } from '../../../../auth';
import { redirect } from 'next/navigation';
import { getOrders } from '@/lib/actions/order.actions';

export const metadata = {
  title: 'Carrinho',
};

const Orders = async () => {
  const session = await auth();

  if (!session) {
    return redirect('/sign-in');
  }

  const order = await getOrders();

  const orderContent = JSON.parse(JSON.stringify(order));

  return <OrdersContent orders={orderContent} />;
};

export default Orders;
