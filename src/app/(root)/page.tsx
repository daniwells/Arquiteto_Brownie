import MenuPage from './menuPage';
import { getLatestProducts } from '../../lib/actions/product.actions';
import { getAllCategories } from '@/lib/actions/category.actions';
import PrivacyNotice from '@/interface/containers/site/privacy-banner/main';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Menu',
};

const Home = async () => {
  const latestProducts = await getLatestProducts();
  const categories = await getAllCategories();

  const validCategories = [''];
  latestProducts.content.map((product) => {
    if (product.active) {
      validCategories.push(product.category);
    }
  });

  const categoriesFormated = [{ name: '', value: '' }];
  if (categories?.success) {
    if (categories.content.length > 1) {
      categoriesFormated.shift();
    }

    categories.content.map((category) => {
      if (validCategories.includes(category.category)) {
        categoriesFormated.push({ name: `${category.category}`, value: category.category });
      }
    });
  }

  return <>
    <PrivacyNotice/>
    <MenuPage categories={categoriesFormated} data={latestProducts.content} />
  </>
};

export default Home;