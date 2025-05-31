import * as S from './styles';
import { productTypeImageString } from '@/types';
import ProductPrice from '../../global/product-price/main';

interface cardProps {
  product: productTypeImageString;
  qty?: number;
  handleClick?: () => void;
}

const Card: React.FC<cardProps> = ({ product, handleClick, qty }) => {
  return (
    <S.Container
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      onClick={handleClick}
    >
      <S.Image $url={product.images[0]} />
      <S.Content>
        <div>
          <h1>{product.name}</h1>
          <span>{product.description}</span>
        </div>
        <S.PriceAmountContainer>
          <ProductPrice value={product.price.toString()} />
          {qty && <p>Quant: {qty}</p>}
        </S.PriceAmountContainer>
      </S.Content>
    </S.Container>
  );
};

export default Card;
