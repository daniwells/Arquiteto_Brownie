import FormsContent from "./forms-content";
import { getCart } from "@/lib/actions/cart.actions";

export const metadata = {
    title: "Formulário",
}

const Forms = async () => {
    const cart = await getCart();
    let itemsPrice = "0";
    if('itemsPrice' in cart){
        itemsPrice = cart?.itemsPrice
    }
   

    return <FormsContent itemsPrice={itemsPrice} />;
}
 
export default Forms;