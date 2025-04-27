import MenuPage from './menuPage';
import { getLatestProducts } from '../../lib/actions/product.actions';

export const metadata = {
  title: 'Menu',
};

const Home = async () => {
  const latestProducts = await getLatestProducts();

  return <MenuPage data={latestProducts} />;
};

export default Home;
