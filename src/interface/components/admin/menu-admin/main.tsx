'use client';

import * as S from './styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const MenuAdmin = () => {
  const size_768 = useMediaQuery('(min-width:768px)');

  return (
    <S.Container>
      <S.PhoneIcon href="/admin/orders">{size_768 && "Gerenciar pedidos"}</S.PhoneIcon>
      <S.CutleryIcon href="/admin/products">{size_768 && "Gerenciar produtos"}</S.CutleryIcon>
      <S.CategoryIcon href="/admin/categories">{size_768 && "Gerenciar categorias"}</S.CategoryIcon>
    </S.Container>
  );
};

export default MenuAdmin;
