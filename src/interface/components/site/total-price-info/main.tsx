import * as S from './styles';
import ProductPrice from '../../global/product-price/main';
import useMediaQuery from '@mui/material/useMediaQuery';

interface TotalPriceInfoProps {
  date: Date;
  totalPrice: string;
  hasBackground?: boolean;
  button?: React.ReactNode;
}

const TotalPriceInfo: React.FC<TotalPriceInfoProps> = ({ date, totalPrice, hasBackground, button}) => {
  const size_768 = useMediaQuery('(min-width:768px)');

  const formatedDate = (date: Date) => {
    return date.toLocaleDateString();
  };

  return (
    <S.TotalPriceContainer background={hasBackground ? "true" : undefined}>
      <S.Row>
        <S.Span>Data:</S.Span> {String(formatedDate(date))}
      </S.Row>
      <S.Row>
        <S.Span>Preço total:</S.Span> <ProductPrice value={totalPrice} />
      </S.Row>
      {
        size_768 && button &&
          <S.Row>{button}</S.Row>
      }
    </S.TotalPriceContainer>
  );
};

export default TotalPriceInfo;
