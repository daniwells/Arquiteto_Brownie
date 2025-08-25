// Styles
import * as S from "./styles";

// Libs
import { redirect } from 'next/navigation';

// Components
import Search from '@/interface/components/global/search/main';
import DescriptionContainer from '../description-container/main';
import UserButton from "@/interface/components/admin/user-button/main";

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
  filter?: React.ReactNode;
  hasUser?: boolean;
  userEmail?: string
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
  filter,
  hasUser,
  userEmail,
}) => {
  return (
    <S.HeaderDesktopContainerStyle>
      {
        hasReturn && !title && !description &&
        <S.IconStyleContainer onClick={handleReturn} >
          <S.IconStyle src={arrowLeft} alt="Ícone de voltar"/>
        </S.IconStyleContainer>
      }
      
      {
        !title && !description && <S.IconStyle src={logoIcon} alt="Logo do site"/>
      }
      
      {
        title && description &&
        <S.DescAndReturn>
          <S.IconStyle src={logoIcon} alt="Logo do site"/>
          {
            hasReturn &&
            <S.IconStyleContainer onClick={handleReturn} >
              <S.IconStyle src={arrowLeft} alt="Ícone de voltar"/>
            </S.IconStyleContainer>
          }
          <DescriptionContainer title={title || ""} desc={description}/>
        </S.DescAndReturn>
      }

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

      {
        hasUser && userEmail && <UserButton userEmail={userEmail}/>
      }
    </S.HeaderDesktopContainerStyle>
  );
};

export default HeaderDesktopContainer;