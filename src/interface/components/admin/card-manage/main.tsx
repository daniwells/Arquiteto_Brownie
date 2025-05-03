import React from "react";
import * as S from "./styles"
import ProductPrice from "../../global/product-price/main";
import SecondaryButton from "../../global/secondary-button/main";

const CardManage = () => {
    return ( 
    <S.Background> 
                <S.Column>
        <S.AboutProduct>
        <h3>Chocolate branco</h3>
        <p>Brownie de massa meio amargo e com pedaços de chocolate branco.</p> 

        <div>
            <span>Valor: </span> <ProductPrice value="10.90" />
        </div>
        <div>
            <span>Status:</span><p>Ativo</p>
        </div>

        </S.AboutProduct>
        <S.Image/>
        </S.Column>
        <SecondaryButton/>
    </S.Background> 
    
    );
}
 
export default CardManage;