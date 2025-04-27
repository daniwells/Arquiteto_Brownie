import React from 'react';
import * as S from './styles';

interface addOrRemoveProps {
  quantity: number;
  handleQuantity: (q: number) => void;
}

const AddOrRemove: React.FC<addOrRemoveProps> = ({ quantity, handleQuantity }) => {
  const increase = () => handleQuantity(quantity + 1);
  const decrease = () => handleQuantity(quantity - 1);

  return (
    <S.CounterWrapper>
      <S.ButtonBackground onClick={decrease} disabled={quantity === 1}>
        -
      </S.ButtonBackground>
      <S.Quantity>{quantity}</S.Quantity>
      <S.ButtonBackground onClick={increase}>+</S.ButtonBackground>
    </S.CounterWrapper>
  );
};

export default AddOrRemove;
