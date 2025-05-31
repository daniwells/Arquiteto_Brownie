// Styles
import * as S from "./styles";

// Libs
import { redirect } from 'next/navigation';

// Components
import Search from '@/interface/components/global/search/main';
import DescriptionContainer from '../../global/description-container/main';

// Images
import arrowLeft from '../../../../../public/svg/arrow-left.svg';
import logoIcon from "../../../../../public/svg/logo.svg";
import cartIcon from "../../../../../public/svg/cart.svg";


interface headerDesktopContainer {
  value?: string;
  handleChange?: (value: string) => void;
  placeholder?: string;
  hasCart?: boolean;
  hasSearch?: boolean;
  hasReturn?: boolean;
  handleReturn?: () => void;
  title?: string;
  description?: string;
  filter?: React.ReactNode
}

const HeaderDesktopContainer: React.FC<headerDesktopContainer> = ({
  value,
  handleChange,
  placeholder,
  hasCart,
  hasReturn,
  hasSearch,
  handleReturn,
  title,
  description,
  filter
}) => {
  return (
    <S.HeaderDesktopContainerStyle>
      {
        hasReturn && !title && !description &&
        <S.IconStyleContainer onClick={handleReturn} >
          <S.IconStyle src={arrowLeft} alt="Ícone de carrinho"/>
        </S.IconStyleContainer>
      }
      
      {
        title && description &&
        <S.DescAndReturn>
          {
            hasReturn &&
            <S.IconStyleContainer onClick={handleReturn} >
              <S.IconStyle src={arrowLeft} alt="Ícone de carrinho"/>
            </S.IconStyleContainer>
          }
          <DescriptionContainer title={title} desc={description}/>
        </S.DescAndReturn>
      }

      <S.IconStyle src={logoIcon} alt="Logo do site"/>
      {
        hasSearch &&
          <Search
            id="headerSearch"
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

      {
        filter && filter
      }
    </S.HeaderDesktopContainerStyle>
  );
};

export default HeaderDesktopContainer;