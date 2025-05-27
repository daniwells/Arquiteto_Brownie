import React from 'react';
import * as S from "./styles";
import Search from '@/interface/components/global/search/main';
import logoIcon from "../../../../../public/svg/logo.svg";
import cartIcon from "../../../../../public/svg/cart.svg";
import { redirect } from 'next/navigation';
import arrowLeft from '../../../../../public/svg/arrow-left.svg';

interface headerDesktopContainer {
    value?: string;
    handleChange?: (value: string) => void;
    placeholder?: string;
    hasCart?: boolean;
    hasSearch?: boolean;
    hasReturn?: boolean;
    handleReturn?: () => void;
}

const HeaderDesktopContainer: React.FC<headerDesktopContainer> = ({
    value, handleChange, placeholder, hasCart, hasReturn, hasSearch, handleReturn
}) => {
  return (
    <S.HeaderDesktopContainerStyle>
        {
          hasReturn &&

          <S.IconStyleContainer onClick={handleReturn} >
            <S.IconStyle src={arrowLeft} alt="Ícone de carrinho"/>
          </S.IconStyleContainer>
        }
        <S.IconStyle src={logoIcon} alt="Logo do site"/>
        {
          hasSearch &&
            <Search 
              handleChange={handleChange || (() => {})} 
              value={value || ""} 
              placeholder={placeholder || ""} 
            />
        }
        
        {
          hasCart && 
          <S.IconStyleContainer onClick={() => {redirect("/cart")}} >
            <S.IconStyle src={cartIcon} alt="Ícone de carrinho"/>
          </S.IconStyleContainer>
        }
        
    </S.HeaderDesktopContainerStyle>
  );
};

export default HeaderDesktopContainer;