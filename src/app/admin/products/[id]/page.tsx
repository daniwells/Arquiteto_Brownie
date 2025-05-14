import FormsProduct from '@/app/admin/products/forms-product';
import { getProdutById } from '@/lib/actions/product.actions';
import { auth } from '../../../../../auth';
import { redirect, notFound } from 'next/navigation';

export const metadata = {
  title: 'Editar Produto',
};

const EditProduct = async (props: { params: Promise<{ id: string }> }) => {
  const session = await auth();

  if (!session) {
    return redirect('/sign-in');
  }

  const { id } = await props.params;

  const product = await getProdutById(String(id) || '');

  if (!product || !product.content) return notFound();

  const productContent = JSON.parse(JSON.stringify(product.content));

  const formatedProduct = {
    ...productContent,
  };

  return <FormsProduct selectedProduct={formatedProduct} />;
};

export default EditProduct;
