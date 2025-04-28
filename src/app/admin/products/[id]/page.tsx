import FormsProduct from '@/app/admin/products/forms-product';
import { getProdutById } from '@/lib/actions/product.actions';
import { notFound } from 'next/navigation';

const EditProduct = async (props: {params: Promise<{id: string;}>}) => {
  const { id } = await props.params;

  const product = await getProdutById(String(id) || "");

  if (!product) return notFound();

  const productContent = JSON.parse(JSON.stringify(product.content));

  const formatedProduct = {
    ...productContent, 
  }

  return <FormsProduct selectedProduct={formatedProduct} />;
};

export default EditProduct;