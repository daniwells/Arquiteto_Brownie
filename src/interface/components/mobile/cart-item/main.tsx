import * as S from "./styles"
import { productType } from "@/types";
import ProductPrice from "../product-price/main";
import AddOrRemove from "../add-or-remove/main";
import Remove from "../remove/main";

import React, { useState } from 'react';


const CartItem = () => {
    const [qty, setQty] = useState<number>(1);

    const handleQuantity = (newQty: number) => {
        setQty(newQty);
    }
    return (
        <>
            <S.Container
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
                <S.Image></S.Image>
                <S.Content>
                    <div>
                        <h1>Nome</h1>
                        <Remove />
                    </div>
                    <span>Descrição</span>
                    <div>
                        <ProductPrice value="4" />
                        <AddOrRemove quantity={qty} handleQuantity={handleQuantity} />
                    </div>
                </S.Content>
            </S.Container>
        </>
    );
}

export default CartItem;