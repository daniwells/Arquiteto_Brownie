'use client';

// Libs
import useMediaQuery from '@mui/material/useMediaQuery';

// Style
import * as S from './styles';

// Components
import PrimaryButton from '@/interface/components/global/button/main';
import DescriptionContainer from '@/interface/containers/global/description-container/main';

// Images
import logo from '../../../../public/svg/logo.svg';

interface signInProps {
  handleSignIn: () => void;
}

const SignIn: React.FC<signInProps> = ({ handleSignIn }) => {
  const size_768 = useMediaQuery('(min-width:768px)');

  return (
    <S.MainLogin>
      {
        !size_768 &&
        <S.customImage width={70} src={logo} alt="Logo Arquiteto Brownie" />
      }
      <S.ContentLogin>
        {
          size_768 &&
          <S.customImage width={200} src={logo} alt="Logo Arquiteto Brownie" />
        }
        <div> 
          <DescriptionContainer
            title="Login"
            desc="Faça login com uma conta google autorizada para acessar a página de administração"
          />
          <form action={handleSignIn}>
            <PrimaryButton category="dark" type="submit" value="Entrar com o Google" />
          </form>
        </div>
      </S.ContentLogin>
    </S.MainLogin>
  );
};

export default SignIn;
