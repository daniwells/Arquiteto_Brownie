import React, { useState } from 'react';
import * as S from './styles';

const AddOrRemove = () => {
    const [quantity, setQuantity] = useState(0);

    const increase = () => setQuantity((q) => q + 1);
    const decrease = () => setQuantity((q) => Math.max(0, q - 1));
  
  return (
    <S.CounterWrapper>
      <S.ButtonBackground onClick={decrease} disabled={quantity === 0}>-</S.ButtonBackground>
      <S.Quantity>{quantity}</S.Quantity>
      <S.ButtonBackground onClick={increase}>+</S.ButtonBackground>
    </S.CounterWrapper>
  )
}

export default AddOrRemove
