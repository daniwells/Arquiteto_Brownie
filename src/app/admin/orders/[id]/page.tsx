import EditOrderContent from './edit-order-content';
import { auth } from '../../../../../auth';
import { redirect, notFound } from 'next/navigation';
import { getOrderById } from '@/lib/actions/order.actions';

export const metadata = {
  title: 'Editar Pedido',
};

const EditOrder = async (props: { params: Promise<{ id: string }> }) => {
  const session = await auth();
  
  if (!session) {
    return redirect('/sign-in');
  }

  const { id } = await props.params;

  const order = await getOrderById(String(id) || '');

  if (!order || !order.content) return notFound();

  const orderContent = JSON.parse(JSON.stringify(order.content));
  
  return <EditOrderContent order={orderContent} />;
};

export default EditOrder;
