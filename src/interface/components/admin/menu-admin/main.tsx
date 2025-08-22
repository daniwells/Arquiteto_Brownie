'use client';

import * as S from './styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { PiForkKnife  } from "react-icons/pi";
import { TbCategory, TbPhone  } from "react-icons/tb";

const MenuAdmin = () => {
  const size_768 = useMediaQuery('(min-width:768px)');

  return (
    <S.Container>
      <S.PhoneIcon href="/admin/orders">{size_768 ? "Gerenciar pedidos" : <TbPhone opacity="75%" size={28}/>}</S.PhoneIcon>
      <S.CutleryIcon href="/admin/products">{size_768 ? "Gerenciar produtos" : <PiForkKnife opacity="75%" size={28}/>}</S.CutleryIcon>
      <S.CategoryIcon href="/admin/categories">{size_768 ? "Gerenciar categorias" : <TbCategory opacity="75%" size={28}/>}</S.CategoryIcon>
    </S.Container>
  );
};

export default MenuAdmin;
