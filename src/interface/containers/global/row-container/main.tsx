import React from 'react';
import * as S from "./styles"

interface RowContainerStyled {
  children: React.ReactNode
}

const RowContainer: React.FC<RowContainerStyled> = ({ children }) => {
  return (
    <S.RowContainerStyle>
      {children}
    </S.RowContainerStyle>
  );
};

export default RowContainer;