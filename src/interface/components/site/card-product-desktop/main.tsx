import * as S from './styles';
import { productTypeImageString, cartItemType } from '@/types';
import ProductPrice from '../../global/product-price/main';
import PrimaryButton from '../../global/primary-button/main';
import AddOrRemove from '../../global/add-or-remove/main';

interface cardProductDesktopProps {
  product: cartItemType | productTypeImageString;
  handleClick: () => void;
  hasAddQuant?: boolean;
  hasQuant?: boolean;
}

const CardProductDesktop: React.FC<cardProductDesktopProps> = ({ 
    product, handleClick, hasAddQuant, hasQuant
}) => {
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
                    <AddOrRemove handleQuantity={handleClick} quantity={product.qty} />
                  :
                    hasQuant ?
                      <></>
                    :
                      <PrimaryButton handleClick={handleClick} value="Info Produto" />    
                }
            </S.ButtonCardContainer>
        </S.Content>
    </S.ContainerCardProductDesktop>
  );
};

export default CardProductDesktop;
