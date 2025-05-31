import * as S from './styles';
import { productTypeImageString, cartItemType } from '@/types';
import ProductPrice from '../../global/product-price/main';
import PrimaryButton from '../../global/primary-button/main';
import AddOrRemove from '../../global/add-or-remove/main';
import { useState } from 'react';

interface cardProductDesktopProps {
  product: cartItemType | productTypeImageString;
  handleClick?: () => void;
  hasAddQuant?: boolean;
  hasQuant?: boolean;
  handleQuantity?: (product: cartItemType, newQty: number, qty: number) => void;
  loading?: boolean;
  qty?: number;
}

const CardProductDesktop: React.FC<cardProductDesktopProps> = ({ 
    product,
    handleClick,
    hasAddQuant,
    hasQuant,
    handleQuantity,
    loading
}) => {
  const [qty, setQty] = useState<number>('qty' in product ? product.qty : 1);
  
  const updateQuantity = (newQty: number) => {
    if('qty' in product){
      handleQuantity?.(product, newQty, qty);
      setQty(newQty);
    }
  }

  return (
    <S.ContainerCardProductDesktop>
        <S.Image $url={product.images[0]} />
        <S.Content>
            <div>
                <S.TitleAndPriceContainer>
                    <h1>{product.name}</h1>
                    <ProductPrice value={product.price.toString()} />
                </S.TitleAndPriceContainer>
                <p>{product.description}</p>
            </div>
            <S.ButtonCardContainer>
                {
                  (hasAddQuant && 'qty' in product) ?
                    <AddOrRemove 
                      minQuantity={-1}
                      loading={loading}
                      handleQuantity={updateQuantity}
                      quantity={qty}
                    />
                  :
                    hasQuant ?
                      <S.QtyContainer>Quantidade: <span>{qty}</span></S.QtyContainer>
                    :
                      <PrimaryButton handleClick={handleClick} value="Comprar" />    
                }
            </S.ButtonCardContainer>
        </S.Content>
    </S.ContainerCardProductDesktop>
  );
};

export default CardProductDesktop;
