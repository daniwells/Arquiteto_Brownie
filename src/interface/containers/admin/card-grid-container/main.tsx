import React from 'react';
import * as S from "./styles";

interface CardGridContainerProps {
    children: React.ReactNode
}

const CardGridContainer: React.FC<CardGridContainerProps> = ({children}) => {
  return (
    <S.CardGridContainerStyle>
        {children}
    </S.CardGridContainerStyle>
  );
};

export default CardGridContainer;