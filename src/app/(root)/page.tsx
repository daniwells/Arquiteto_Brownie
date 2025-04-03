import Menu from "./menu";
import { getLatestProducts } from "../../lib/actions/product.actions";

export const metadata = {
    title: "Menu",
}

const Home = async () => {
    const latestProducts = await getLatestProducts();

    return (
        <Menu
            data={latestProducts}
        />
    );
}

export default Home;