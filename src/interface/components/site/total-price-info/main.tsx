import * as S from './styles';
import ProductPrice from '../../global/product-price/main';
import PrimaryButton from '../../global/primary-button/main';
import useMediaQuery from '@mui/material/useMediaQuery';
import { redirect } from 'next/navigation';

interface TotalPriceInfoProps {
  date: Date;
  totalPrice: string;
  isCart?: boolean;
  hasBackground?: boolean;
}

const TotalPriceInfo: React.FC<TotalPriceInfoProps> = ({ date, totalPrice, isCart, hasBackground }) => {
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
        size_768 && isCart && 
        <S.Row>
          <PrimaryButton value="Finalizar Pedido" handleClick={() => redirect("/forms")}/>
        </S.Row>
      }
    </S.TotalPriceContainer>
  );
};

export default TotalPriceInfo;
