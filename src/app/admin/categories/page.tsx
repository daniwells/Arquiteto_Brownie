import CategoryContent from './category-content';
import { auth } from '../../../../auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Categories',
};

const Forms = async () => {
  const session = await auth();

  if (!session) {
    return redirect('/sign-in');
  }

  return <CategoryContent/>;
};

export default Forms;
