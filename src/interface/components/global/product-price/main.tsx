import * as S from './styles';

const ProductPrice = ({ value }: { value: string }) => {
  const stringValue = Number(value).toFixed(2);
  const [intValue, floatValue] = stringValue.split('.');

  return (
    <S.Price>
      R$ {intValue}
      <S.Span>.{floatValue}</S.Span>
    </S.Price>
  );
};

export default ProductPrice;
