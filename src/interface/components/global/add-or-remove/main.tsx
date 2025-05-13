import React from 'react';
import * as S from './styles';
import { CircularProgress } from '@mui/material';

interface addOrRemoveProps {
  quantity: number;
  handleQuantity: (q: number) => void;
  loading?: boolean;
  minQuantity?: number;
}

const AddOrRemove: React.FC<addOrRemoveProps> = ({
  quantity,
  handleQuantity,
  loading,
  minQuantity,
}) => {
  const increase = () => handleQuantity(quantity + 1);
  const decrease = () => handleQuantity(quantity - 1);

  return (
    <S.CounterWrapper>
      <S.ButtonBackground
        onClick={decrease}
        disabled={minQuantity ? quantity === minQuantity : quantity === 1}
      >
        {loading ? <CircularProgress size={12} color="inherit" /> : '-'}
      </S.ButtonBackground>
      <S.Quantity>{quantity}</S.Quantity>
      <S.ButtonBackground onClick={increase}>
        {loading ? <CircularProgress size={12} color="inherit" /> : '+'}
      </S.ButtonBackground>
    </S.CounterWrapper>
  );
};

export default AddOrRemove;
