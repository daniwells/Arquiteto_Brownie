import MenuPage from './menuPage';
import { getLatestProducts } from '../../lib/actions/product.actions';
import { getAllCategories } from '@/lib/actions/category.actions';

export const metadata = {
  title: 'Menu',
};

const Home = async () => {
  const latestProducts = await getLatestProducts();
  const categories = await getAllCategories();

  const validCategories = [''];
  latestProducts.map((product) => {
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
        categoriesFormated.push({ name: `Brownie ${category.category}`, value: category.category });
      }
    });
  }

  return <MenuPage categories={categoriesFormated} data={latestProducts} />;
};

export default Home;
