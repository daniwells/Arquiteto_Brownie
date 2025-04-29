'use client';
import * as S from './styles';

const MenuAdmin = () => {
  return (
    <S.Container>
      <S.PhoneIcon href="/admin/orders" />
      <S.CutleryIcon href="/admin/products" />
      <S.CategoryIcon href="/admin/categories" />
    </S.Container>
  );
};

export default MenuAdmin;
