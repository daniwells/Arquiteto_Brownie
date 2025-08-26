import * as S from './styles';
import ProductPrice from '../../global/product-price/main';
import AddOrRemove from '../../global/add-or-remove/main';
import { cartItemType } from '@/types';
import React, { useState } from 'react';

interface cartItemProps {
  product: cartItemType;
  handleQuantity: (product: cartItemType, newQty: number, qty: number) => void;
  loading: boolean;
}

const CartItem: React.FC<cartItemProps> = ({ product, handleQuantity, loading }) => {
  const [qty, setQty] = useState<number>(product.qty);

  const updateQuantity = (newQty: number) => {
    handleQuantity(product, newQty, qty);
    setQty(newQty);
  }

  return (
    <>
      <S.Container transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
        <S.ImageContainer>
          <S.Image $url={product.images[0]} />
        </S.ImageContainer>
        <S.Content>
          <div>
            <S.RowCard>
              <h1>{product.name}</h1>
            </S.RowCard>
            <span>{product.description}</span>
          </div>
          <S.RowCard>
            <ProductPrice value={String(Number(product.price) * qty)} />
            <AddOrRemove
              minQuantity={-1}
              loading={loading}
              quantity={qty}
              handleQuantity={updateQuantity}
            />
          </S.RowCard>
        </S.Content>
      </S.Container>
    </>
  );
};

export default CartItem;
