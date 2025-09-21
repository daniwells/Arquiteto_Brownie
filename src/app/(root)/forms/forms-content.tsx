'use client';

// Libs
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { redirect } from 'next/navigation';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from "axios";


// Components
import MainContainer from '@/interface/containers/global/main-container/main';
import DescriptionContainer from '@/interface/containers/global/description-container/main';
import TotalPriceInfo from '@/interface/components/site/total-price-info/main';
import BaseInput from '@/interface/components/global/base-input/main';
import PrimaryButton from '@/interface/components/global/button/main';
import MaskedInput from '@/interface/components/global/masked-input/main';
import FormContainer from '@/interface/containers/global/form-container/main';
import Return from '@/interface/components/global/return/main';
import HeaderDesktopContainer from '@/interface/containers/global/header-desktop-container/main';
import Loading from '@/interface/containers/global/loading/main';

// Images
import Logo from '@/interface/components/global/logo/main';
import personIcon from '../../../../public/svg/person.svg';
import phoneIcon from '../../../../public/svg/phone.svg';
import placeIcon from '../../../../public/svg/place.svg';

// Context
import { usePopup } from '@/contexts/PopupContext';
import { useActiveStore } from '@/contexts/ActiveStoreContext';

// Actions
import { createCustomer } from '@/lib/actions/customer.actions';
import { getCart, deleteCart } from '@/lib/actions/cart.actions';
import { createOrder } from '@/lib/actions/order.actions';
import { cartType } from '@/types';

// Utils
import { getMessageToWhatsapp } from '@/lib/utils/utils';
import { NEXT_PUBLIC_WHATSAPP_NUMBER, ORIGIN_CEP } from '@/lib/constants';

// Types
import { formDataType } from '@/types';

interface formsContentProps {
  itemsPrice: string;
}

const FormsContent: React.FC<formsContentProps> = ({ itemsPrice }) => {
  const { openPopup, openConcentTerm } = usePopup();
  const { activeStatus, checkStoreStatus } = useActiveStore();
  const [mounted, setMounted] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPopupConcent, setShowPopupConcent] = useState(true);

  const size_768 = useMediaQuery('(min-width:768px)');

  const verifyAcceptPolicy = () => {
    const dismissed = sessionStorage.getItem("accept_privacy_terms");
    if (dismissed) {
      setShowPopupConcent(false);
    }
  };

  const { handleSubmit, setValue, watch, reset } = useForm<formDataType>({
    defaultValues: {
      name: '',
      phone: '',
      cep: '',
      number: '',
    },
  });

  const watchFields = watch();

  const handleCreateCustomer = async (data: formDataType) => {
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
      const message = response.message ? await response.message : '';

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
        const message = order.message ? await order.message : '';

        openPopup(message, 'error');
        return {status: false, orderId: ""};
      }
      await deleteCart();
      return {status: true, orderId: order.content};
    }
    return {status: false, orderId: ""};
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

    if (cart?.content) {
      if (cart.content.items.length <= 0) {
        openPopup('Nenhum produto no carrinho', 'error');
        return false;
      }
      return cart.content;
    }
    return false;
  };

  const interceptSubmit = (data: formDataType) => {
    openConcentTerm(() => onSubmit(data));
  };

  const onSubmit = async (data: formDataType) => {
    verifyAcceptPolicy();

    const cart = await handleGetCart();
    if (!cart) return;

    try {
      setLoading(true);
      const { data: freightData } = await axios.post("/api/freight", {
        originCEP: ORIGIN_CEP,
        destinationCEP: data.cep,
      });
      
      setLoading(false);

      if (!freightData || freightData.error) {
        console.error("Erro ao calcular frete", freightData?.error);
        openPopup("Não foi possível calcular o frete", "error");
        return;
      }

      const updatedCart = {
        ...cart,
        freightPrice: freightData.price,
        totalPrice: String(parseFloat(cart.itemsPrice) + parseFloat(freightData.price)),
      };

      const idCustomer = await handleCreateCustomer(data);
      if (!idCustomer) return;

      const { status, orderId } = await handleCreateOrder(idCustomer, updatedCart);
      if (!status) return;

      openPopup("Pedido criado com sucesso", "success");
      handleSendToWhatsApp(updatedCart, orderId || "");
      reset();

    } catch (err: any) {
      console.error(err);
      openPopup("Erro ao processar pedido", "error");
      setLoading(false);
    }
  };
  
  const handleSendToWhatsApp = (cart: cartType, orderId: string) => {
    const number = NEXT_PUBLIC_WHATSAPP_NUMBER;

    const message = getMessageToWhatsapp(watchFields.name, orderId, cart);
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.location.href = url;
  };

  useEffect(() => verifyAcceptPolicy(), []);

  useEffect(() => {
    const verify = async () => {
      const response = await checkStoreStatus();
      if (response) {
        redirect("/unavailable");
      }
      setMounted(false);
    };
    verify();
  }, [activeStatus]);

  if (mounted) {
    return <Loading/>;
  }

  return (
    <MainContainer>
      {
        size_768 ?
          <HeaderDesktopContainer
            logoPosition="end"
            handleReturn={() => redirect("/")}
            title="Preencha seus dados"
            description="Para prosseguir com a sua compra, por favor preencha os campos abaixo"
            hasReturn
          />
        :
          <>
            <Return redirect="/" />
            <Logo />
            <DescriptionContainer
              title="Preencha seus dados"
              desc="Para prosseguir com a sua compra, por favor preencha os campos abaixo"
            />    
          </>
      }
      
      <FormContainer style="padding-block: 30px;" handleSubmit={
        showPopupConcent ? handleSubmit(interceptSubmit) : handleSubmit(onSubmit)
      }>
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
