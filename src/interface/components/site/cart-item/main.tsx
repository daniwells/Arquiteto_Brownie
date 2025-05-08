import * as S from './styles';
import ProductPrice from '../../global/product-price/main';
import AddOrRemove from '../../global/add-or-remove/main';
import { cartItemType } from '@/types';
import React, { useState } from 'react';
import { removeItemFromCart, addItemToCart } from '@/lib/actions/cart.actions';
import { usePopup } from '@/contexts/PopupContext';

interface cartItemProps {
  product: cartItemType;
}

const CartItem: React.FC<cartItemProps> = ({ product }) => {
  const [qty, setQty] = useState<number>(product.qty);
  const [loading, setLoading] = useState(false);

  const { openPopup } = usePopup();

  const handleQuantity = async (newQty: number) => {
      setLoading(true);
      if(newQty < qty){
        const response = await removeItemFromCart(String(product.id));

        if (!response?.success) {
          const message =
          response.message instanceof Promise ? await response.message : "";
          
          openPopup(message, 'error');
          return
        }
      }

      if(newQty > qty){
        const response = await addItemToCart(product);
        console.log(response)
        if (!response?.success) {
          const message = response.message instanceof Promise ? await response.message : "";
          
          openPopup(message, 'error');
          return
        }
      }
      setQty(newQty);
      setLoading(false);
  };

  return (
    <>
      <S.Container
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <S.Image $url={product.images[0]} />
        <S.Content>
          <div>
            <S.RowCard>
              <h1>{product.name}</h1>
            </S.RowCard>
            <span>{product.description}</span>
          </div>
          <S.RowCard>
            <ProductPrice value={String(Number(product.price) * qty)} />
            <AddOrRemove minQuantity={-1} loading={loading} quantity={qty} handleQuantity={handleQuantity} />
          </S.RowCard>
        </S.Content>
      </S.Container>
    </>
  );
};

export default CartItem;
