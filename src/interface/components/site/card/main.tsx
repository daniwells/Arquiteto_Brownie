import * as S from "./styles"
import { productType } from "@/types";
import ProductPrice from "../../global/product-price/main";

interface cardProps {
    product: productType
    handleClick: () => void
}

const Card: React.FC<cardProps> = ({ product, handleClick }) => {

    return (
        <S.Container
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            onClick={handleClick}
        >
            <S.Image $url={product.images[0]}/>
            <S.Content>
                <div>
                    <h1>{product.name}</h1>
                    <span>{product.description}</span>
                </div>
                <ProductPrice value={product.price.toString()}/>
            </S.Content>
        </S.Container>
    );
}

export default Card;