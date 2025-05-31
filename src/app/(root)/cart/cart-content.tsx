'use client';

// Libs
import { redirect } from 'next/navigation';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SwiperSlide } from 'swiper/react';
import { useState } from 'react';

// Components
import MainContainer from '@/interface/containers/global/main-container/main';
import Logo from '@/interface/components/global/logo/main';
import Menu from '@/interface/components/site/menu/main';
import CardContainer from '@/interface/containers/global/card-container/main';
import CartItem from '@/interface/components/site/cart-item/main';
import PrimaryButton from '@/interface/components/global/primary-button/main';
import Title from '@/interface/components/global/title/main';
import TotalPriceInfo from '@/interface/components/site/total-price-info/main';
import BackToMenu from '@/interface/components/site/back-to-menu/main';
import HeaderDesktopContainer from '@/interface/containers/site/header-desktop-container/main';
import CardDesktopContainer from '@/interface/containers/global/card-desktop-container/main';
import CardProductDesktop from '@/interface/components/site/card-product-desktop/main';

// Utils
import { cartType, cartItemType } from '@/types';

// Context
import { usePopup } from '@/contexts/PopupContext';

// Actions
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions';

interface cartContentProps {
  cart?: cartType;
}

const CartContent: React.FC<cartContentProps> = ({ cart }) => {
  const size_768 = useMediaQuery('(min-width:768px)');

  const [loading, setLoading] = useState(false);

  const { openPopup } = usePopup();

  const handleQuantity = async (product: cartItemType, newQty: number, qty: number) => {
    setLoading(true);
    if (newQty < qty) {
      const response = await removeItemFromCart(String(product.id));

      if (!response?.success) {
        const message = response.message instanceof Promise ? await response.message : '';

        openPopup(message, 'error');
        return;
      }
    }

    if (newQty > qty) {
      const response = await addItemToCart(product);
      if (!response?.success) {
        const message = response.message instanceof Promise ? await response.message : '';

        openPopup(message, 'error');
        return;
      }
    }
    setLoading(false);
  };

  return (
    <>
      <MainContainer
        minHeight={cart?.items ? (cart?.items?.length > 0 ? undefined : '100vh') : '100vh'}
      >
        {
          size_768 ?
            <HeaderDesktopContainer 
              handleReturn={() => redirect("/")}
              title="Carrinho"
              description="Brownies adicionados ao carrinho"
              hasReturn
            />
          :
            <>
              <Logo/>
              <Title text="Carrinho" />
            </>
        }
        {cart && cart?.items?.length > 0 ? (
          <>
            {
              size_768 ?
                <CardDesktopContainer amountCards={cart?.items.length}>
                  {cart?.items.map((item) => 

                    <SwiperSlide key={item.id}>
                      <CardProductDesktop 
                        hasAddQuant
                        product={item}
                        handleQuantity={handleQuantity}
                        loading={loading}
                      />
                    </SwiperSlide>
                  )}
                </CardDesktopContainer>
              : 
                <CardContainer>
                  {cart?.items.map((item) => 
                    <CartItem 
                      product={item} 
                      key={item.id}
                      handleQuantity={handleQuantity}
                      loading={loading}
                    />
                  )}
                </CardContainer>
            }  
            <TotalPriceInfo isCart totalPrice={cart.itemsPrice} date={new Date()} />
            {
              !size_768 &&
              <PrimaryButton
                value="Finalizar pedido"
                handleClick={() => {
                  redirect('/forms');
                }}
              />
            }
          </>
        ) : (
          <BackToMenu text="O carrinho está vazio..." link="Voltar as compras." />
        )}

        {
          !size_768 && <Menu/>
        }
      </MainContainer>
    </>
  );
};
export default CartContent;
