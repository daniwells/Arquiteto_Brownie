'use client';

import * as S from './styles';
import { FiShoppingCart, FiHome } from "react-icons/fi";

const Menu = () => {
  return (
    <S.Container>
      <S.HomeIconStyle href="/"><FiHome opacity="75%" size={28}/></S.HomeIconStyle>
      <S.CartIconStyle href="/cart"><FiShoppingCart opacity="75%" size={28}/></S.CartIconStyle>
    </S.Container>
  );
};

export default Menu;
