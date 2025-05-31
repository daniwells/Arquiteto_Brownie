import React from 'react';
import * as S from "./styles"

interface OrderButtonsContainerProps {
    children: React.ReactNode
    width?: number;
}

const OrderButtonsContainer: React.FC<OrderButtonsContainerProps> = ({children, width}) => {
  return (
    <S.OrderButtonsContainerStyle $width={width} >
        {children}
    </S.OrderButtonsContainerStyle>
  );
};

export default OrderButtonsContainer;