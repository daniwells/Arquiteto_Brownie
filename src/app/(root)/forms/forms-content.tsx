'use client';

// Libs
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

// Components
import MainContainer from '@/interface/containers/global/main-container/main';
import DescriptionContainer from '@/interface/containers/global/description-container/main';
import TotalPriceInfo from '@/interface/components/site/total-price-info/main';
import BaseInput from '@/interface/components/global/base-input/main';
import PrimaryButton from '@/interface/components/global/primary-button/main';
import MaskedInput from '@/interface/components/global/masked-input/main';
import FormContainer from '@/interface/containers/global/form-container/main';
import Return from '@/interface/containers/return/main';

// Images
import Logo from '@/interface/components/global/logo/main';
import personIcon from '../../../../public/svg/person.svg';
import phoneIcon from '../../../../public/svg/phone.svg';
import placeIcon from '../../../../public/svg/place.svg';

// Context
import { usePopup } from '@/contexts/PopupContext';

// Actions
import { createCustomer } from '@/lib/actions/customer.actions';
import { getCart, deleteCart } from '@/lib/actions/cart.actions';
import { createOrder } from '@/lib/actions/order.actions';
import { cartType } from '@/types';

interface formData {
  name: string;
  phone: string;
  cep: string;
  number: string;
}

interface formsContentProps {
  itemsPrice: string;
}

const FormsContent: React.FC<formsContentProps> = ({ itemsPrice }) => {
  const { openPopup } = usePopup();
  const [loading, setLoading] = useState(false);

  const { handleSubmit, setValue, watch, reset } = useForm<formData>({
    defaultValues: {
      name: '',
      phone: '',
      cep: '',
      number: '',
    },
  });

  const watchFields = watch();

  const handleCreateCustomer = async (data: formData) => {
    const customer = {
      ...data,
      phone: data.phone.replace(/\D/g, ''),
      cep: data.cep.replace('-', ''),
    };

    let response: {
      success: boolean;
      message: string | Promise<any>;
      content?: string | undefined;
    } = { success: false, message: '' };

    setLoading(true);
    response = await createCustomer(customer);
    setLoading(false);

    if (!response?.success) {
      const message = response.message instanceof Promise ? await response.message : '';

      openPopup(message, 'error');
      return false;
    }

    return response.content;
  };

  const handleCreateOrder = async (idCustomer: string, cart: cartType) => {
    if (cart) {
      setLoading(true);
      const order = await createOrder(cart, idCustomer);
      setLoading(false);

      if (!order?.success) {
        const message = order.message instanceof Promise ? await order.message : '';

        openPopup(message, 'error');
        return false;
      }
      await deleteCart();
      return true;
    }
    return false;
  };

  const handleGetCart = async () => {
    setLoading(true);
    const cart = await getCart();
    setLoading(false);

    if (!cart?.success) {
      const message = 'message' in cart ? cart.message : '';

      openPopup(message, 'error');
      return false;
    }

    if(cart?.content){
      if(cart.content.items.length <= 0){
        openPopup("Nenhum produto no carrinho", 'error');
        return false
      }
      return cart.content;
    }
    return false;
  }

  const onSubmit = async (data: formData) => {
    const cart = await handleGetCart();

    if(cart){
      const idCustomer = await handleCreateCustomer(data);
      if (idCustomer) {
        const responseOrder = await handleCreateOrder(idCustomer, cart);
        if (responseOrder) {
          openPopup('Pedido criado com sucesso', 'success');
          reset();
        }
      }
    }
  };

  return (
    <MainContainer>
      <Return redirect="/" />
      <Logo />
      <DescriptionContainer
        title="Preencha seus dados"
        desc="Para prosseguir com sua compra, preencha o formulário abaixo"
      />
      <FormContainer handleSubmit={handleSubmit(onSubmit)}>
        <BaseInput
          value={watchFields.name}
          icon={personIcon}
          altIcon="ícone de pessoa"
          placeholder="Nome"
          id="name"
          handleChange={(val: string) => {
            if (/^[A-Za-zÀ-ÿ\s]*$/.test(val)) {
              setValue('name', val);
            }
          }}
        />
        <MaskedInput
          mask="(00) 00000-0000"
          value={watchFields.phone}
          icon={phoneIcon}
          altIcon="ícone de telefone"
          placeholder="Fone"
          id="fone"
          handleChange={(val: string) => {
            setValue('phone', val);
          }}
        />
        <MaskedInput
          mask="00000-000"
          value={watchFields.cep}
          icon={placeIcon}
          altIcon="ícone de telefone"
          placeholder="Cep"
          id="cep"
          handleChange={(val: string) => {
            setValue('cep', val);
          }}
        />
        <BaseInput
          value={watchFields.number}
          icon={placeIcon}
          altIcon="ícone de lugar"
          placeholder="Número da casa"
          id="numeroCasa"
          type="text"
          handleChange={(val: string) => {
            if (/^\d*$/.test(val)) {
              setValue('number', val);
            }
          }}
          max={10}
        />
        <TotalPriceInfo date={new Date()} totalPrice={itemsPrice} />
        <PrimaryButton loading={loading} value="Realizar pagamento" type="submit" />
      </FormContainer>
    </MainContainer>
  );
};

export default FormsContent;
