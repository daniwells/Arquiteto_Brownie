// Libs
import React from "react";

// Styles
import * as S from "./styles"

// Components
import ProductPrice from "../../global/product-price/main";
import PrimaryButton from "../../global/primary-button/main";

// Utils
import { productTypeImageString } from "@/types";

interface cardManageProps {
  product: productTypeImageString;
}

const CardManage: React.FC<cardManageProps> = ({ product }) => {
    return (
        <S.BackgroundCardManage
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        > 
            <S.Column>
                <S.AboutProduct>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p> 

                    <div>
                        <span>Valor: </span> <ProductPrice value={product.price} />
                    </div>
                    <div>
                        <span>Status:</span><p>{
                                product.active ? 
                                    <S.SpanColor status="active" >Ativo</S.SpanColor> : 
                                    <S.SpanColor status="deactivate" >Desativado</S.SpanColor>
                                }</p>
                    </div>
                </S.AboutProduct>
                <S.ImageProductManageCard $url={product.images[0]} />
            </S.Column>
            <PrimaryButton
                fontSize="14px"
                value="Editar produto"
                category="secondary"
                handleClick={() => {}}
            />
        </S.BackgroundCardManage> 
    );
}
 
export default CardManage;