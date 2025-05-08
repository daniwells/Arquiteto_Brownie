'use client';
import * as S from './styles';

const Menu = () => {
  return (
    <S.Container>
      <S.HomeIcon href="/" />
      <S.CartIcon href="/cart" />
    </S.Container>
  );
};

export default Menu;
