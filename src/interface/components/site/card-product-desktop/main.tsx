import * as S from './styles';
import { productTypeImageString } from '@/types';
import ProductPrice from '../../global/product-price/main';
import PrimaryButton from '../../global/primary-button/main';

interface cardProductDesktopProps {
  product: productTypeImageString;
  handleClick: () => void;
}

const CardProductDesktop: React.FC<cardProductDesktopProps> = ({ 
    product, handleClick 
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
                <PrimaryButton handleClick={handleClick} value="Info Produto" />
            </S.ButtonCardContainer>
        </S.Content>
    </S.ContainerCardProductDesktop>
  );
};

export default CardProductDesktop;
