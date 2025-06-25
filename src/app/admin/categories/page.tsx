import CategoryContent from './category-content';
import { auth } from '../../../../auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Categorias',
};

const Forms = async () => {
  const session = await auth();

  if (!session) {
    return redirect('/sign-in');
  }

  return <CategoryContent />;
};

export default Forms;
