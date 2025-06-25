// Lobs
import { redirect } from 'next/navigation';

// Components
import ContentManage from './manage-content';

// Auth
import { auth } from '../../../../auth';

// Actions
import { getLatestProducts } from '@/lib/actions/product.actions';
import { getAllCategories } from '@/lib/actions/category.actions';

export const metadata = {
  title: 'Produtos',
};

const AdminProducts = async () => {
  const session = await auth();

  if (!session) {
    return redirect('/sign-in');
  }

  const allCategories = await getAllCategories();
  const latestProducts = await getLatestProducts();

  return (
    <ContentManage
      data={latestProducts.content}
      categories={allCategories.content.map((cat: { category: string }) => cat.category)}
    />
  );
};

export default AdminProducts;
