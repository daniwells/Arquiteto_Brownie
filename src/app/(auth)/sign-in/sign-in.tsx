'use client';

import React from 'react';
import * as S from './styles';
import PrimaryButton from '@/interface/components/global/primary-button/main';
import DescriptionContainer from '@/interface/containers/global/description-container/main';
import logo from '../../../../public/svg/logo.svg';

interface signInProps {
  handleSignIn: () => void;
}

const SignIn: React.FC<signInProps> = ({ handleSignIn }) => {
  return (
    <S.MainLogin>
      <S.customImage width={70} src={logo} alt="Logo Arquiteto Brownie" />
      <S.ContentLogin>
        <DescriptionContainer
          title="Login"
          desc="Faça login com uma conta google autorizada para acessar a página de administração"
        />
        <form action={handleSignIn}>
          <PrimaryButton category="dark" type="submit" value="Entrar com o Google" />
        </form>
      </S.ContentLogin>
    </S.MainLogin>
  );
};

export default SignIn;
