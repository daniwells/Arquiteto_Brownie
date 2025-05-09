import FormsProduct from '@/app/admin/products/forms-product';
import { auth } from '../../../../../auth';
import { redirect } from 'next/navigation';

const CreateProduct = async () => {
  const session = await auth();
  
  if (!session) {
    return redirect('/sign-in');
  }

  return <FormsProduct />;
};

export default CreateProduct;