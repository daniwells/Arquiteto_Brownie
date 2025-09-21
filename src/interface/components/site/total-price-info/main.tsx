import * as S from './styles';
import ProductPrice from '../../global/product-price/main';
import useMediaQuery from '@mui/material/useMediaQuery';

interface TotalPriceInfoProps {
  date: Date;
  itemsPrice?: string;
  freightPrice?: string;
  totalPrice: string;
  hasBackground?: boolean;
  button?: React.ReactNode;
}

const TotalPriceInfo: React.FC<TotalPriceInfoProps> = ({
  date,
  totalPrice,
  hasBackground,
  button,
  itemsPrice,
  freightPrice
}) => {
  const size_768 = useMediaQuery('(min-width:768px)');

  const formatedDate = (date: Date) => {
    return date.toLocaleDateString();
  };

  return (
    <S.TotalPriceContainer background={hasBackground ? "true" : undefined}>
      <S.Row>
        <S.Span>Data:</S.Span> {String(formatedDate(date))}
      </S.Row>
      {
        itemsPrice &&
        <S.Row>
          <S.Span>Preço (itens):</S.Span> <ProductPrice value={itemsPrice}/>
        </S.Row>
      }
      <S.Row>
        <p><S.Span>Frete:</S.Span></p> <ProductPrice value={totalPrice}/>
      </S.Row>
      {
        freightPrice &&
        <S.Row>
          <S.Span>Preço total:</S.Span> <ProductPrice value={freightPrice}/>
        </S.Row>
      }
      {
        size_768 && button &&
          <S.Row>{button}</S.Row>
      }
    </S.TotalPriceContainer>
  );
};

export default TotalPriceInfo;
