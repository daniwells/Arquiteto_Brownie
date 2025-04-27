import * as S from './styles';
import Link from 'next/link';
import arrowLeft from '../../../../../public/svg/arrow-left.svg';

interface headerAdminProps {
  redirect?: string;
}

const HeaderAdmin: React.FC<headerAdminProps> = ({ redirect }) => {
  return (
    <S.HeaderContainer>
      {redirect && (
        <Link href={redirect}>
          <S.BackIcon src={arrowLeft} alt="Ícone de Voltar" />
        </Link>
      )}
      <S.LogoSmallStyle src="/svg/logo.svg" alt="Logo Arquiteto Brownie" />
    </S.HeaderContainer>
  );
};

export default HeaderAdmin;
