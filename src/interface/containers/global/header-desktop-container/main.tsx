// Styles
import * as S from "./styles";

// Libs
import { redirect } from 'next/navigation';

// Components
import Search from '@/interface/components/global/search/main';
import DescriptionContainer from '../description-container/main';
import UserButton from "@/interface/components/admin/user-button/main";
import Image from "next/image";

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
  userEmail?: string;
  logoPosition: string;
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
  logoPosition
}) => {
  return (
    <S.HeaderDesktopContainerStyle>
      {
        hasReturn && !title && !description &&
        <S.IconStyleContainer onClick={handleReturn} >
          <Image src={arrowLeft} alt="Ícone de voltar" width={12}/>
        </S.IconStyleContainer>
      }
      
      {
        logoPosition === "start" && <Image src={logoIcon} alt="Logo do site" width={70}/>
      }
      
      {
        title && description &&
        <S.DescAndReturn>
          {
            logoPosition === "middle" && <Image src={logoIcon} alt="Logo do site" width={70}/>
          }

          {
            hasReturn &&
            <S.IconStyleContainer onClick={handleReturn} >
              <Image src={arrowLeft} alt="Ícone de voltar" width={12}/>
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
          <Image src={cartIcon} alt="Ícone de carrinho" width={20}/>
        </S.IconStyleContainer>
      }

      {
        filter && filter
      }

      {
        hasUser && userEmail && <UserButton userEmail={userEmail}/>
      }

      {
        logoPosition === "end" && <Image src={logoIcon} alt="Logo do site" width={70}/>
      }
    </S.HeaderDesktopContainerStyle>
  );
};

export default HeaderDesktopContainer;