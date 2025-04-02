import * as S from "./styles"
import { productType } from "@/types";
import ProductPrice from "../product-price/main";

interface cardProps {
    product: productType
}

const Card: React.FC<cardProps> = ({ product }) => {
    return (
        <S.Container>
            <S.Image 
                url={product.images[0]}
            />
            <S.Content>
                <div>
                    <h1>{product.name}</h1>
                    <span>{product.description}</span>
                </div>
                <p><ProductPrice value={product.price.toString()}/></p>
            </S.Content>
        </S.Container>
    );
}

export default Card;