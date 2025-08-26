import * as S from './styles';
import Link from 'next/link';
import arrowLeft from '../../../../../public/svg/arrow-left.svg';
import UserButton from '../user-button/main';

interface headerAdminProps {
  redirect?: string;
  userEmail?: string;
}

const HeaderAdmin: React.FC<headerAdminProps> = ({ redirect, userEmail }) => {
  return (
    <S.HeaderContainer>
      {redirect && (
        <Link href={redirect}>
          <S.BackIcon src={arrowLeft} alt="Ícone de Voltar" />
        </Link>
      )}
      <S.LogoSmallStyle src="/svg/logo.svg" alt="Logo Arquiteto Brownie" />
      
      {
        userEmail && <UserButton userEmail={userEmail}/>
      }
    </S.HeaderContainer>
  );
};

export default HeaderAdmin;
