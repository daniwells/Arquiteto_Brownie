'use client';

// Libs
import React, { useState } from 'react';

// Components
import MainContainer from '@/interface/containers/global/main-container/main';
import DescriptionContainer from '@/interface/containers/global/description-container/main';
import TotalPriceInfo from '@/interface/components/site/total-price-info/main';
import BaseInput from '@/interface/components/global/base-input/main';
import PrimaryButton from '@/interface/components/global/primary-button/main';
import MaskedInput from '@/interface/components/global/masked-input/main';
import FormContainer from '@/interface/containers/global/form-container/main';

// Images
import Logo from '@/interface/components/global/logo/main';
import personIcon from '../../../../public/svg/person.svg';
import phoneIcon from '../../../../public/svg/phone.svg';
import placeIcon from '../../../../public/svg/place.svg';

interface formsContentProps {
  itemsPrice: string;
}

const FormsContent: React.FC<formsContentProps> = ({ itemsPrice }) => {
  const [form, setForm] = useState({
    nome: '',
    fone: '',
    cep: '',
    numeroCasa: '',
  });

  const handleSetForm = (value: string, name: string) => {
    setForm({ ...form, [name]: value });
  };

  return (
    <MainContainer>
      <Logo />
      <DescriptionContainer
        title="Preencha seus dados"
        desc="Para prosseguir com sua compra, preencha o formulário abaixo"
      />
      <FormContainer handleSubmit={() => {}} >
        <BaseInput
          value={form.nome}
          icon={personIcon}
          altIcon="ícone de pessoa"
          placeholder="Nome"
          id="name"
          handleChange={(val: string) => {
            if (/^[A-Za-zÀ-ÿ\s]*$/.test(val)) {
              handleSetForm(val, 'nome');
            }
          }}
        />
        <MaskedInput
          mask="(00) 00000-0000"
          value={form.fone}
          icon={phoneIcon}
          altIcon="ícone de telefone"
          placeholder="Fone"
          id="fone"
          handleChange={(val: string) => {
            handleSetForm(val, 'fone');
          }}
        />
        <MaskedInput
          mask="00000-000"
          value={form.cep}
          icon={placeIcon}
          altIcon="ícone de telefone"
          placeholder="Cep"
          id="cep"
          handleChange={(val: string) => {
            handleSetForm(val, 'cep');
          }}
        />
        <BaseInput
          value={form.numeroCasa}
          icon={placeIcon}
          altIcon="ícone de lugar"
          placeholder="Número da casa"
          id="numeroCasa"
          type="text"
          handleChange={(val: string) => {
            if (/^\d*$/.test(val)) {
              handleSetForm(val, 'numeroCasa');
            }
          }}
          max={3}
        />
        <TotalPriceInfo date={new Date()} totalPrice={itemsPrice} />
        <PrimaryButton value="Realizar pagamento" handleClick={() => {}} />
      </FormContainer>
    </MainContainer>
  );
};

export default FormsContent;
