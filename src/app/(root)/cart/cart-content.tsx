'use client';

// Libs
import { redirect } from 'next/navigation';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SwiperSlide } from 'swiper/react';

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
import { cartType } from '@/types';

interface cartContentProps {
  cart?: cartType;
}

const CartContent: React.FC<cartContentProps> = ({ cart }) => {
  const size_768 = useMediaQuery('(min-width:768px)');

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
                <CardDesktopContainer>
                  {cart?.items.map((item) => 

                    <SwiperSlide key={item.slug}>
                      <CardProductDesktop 
                        hasAddQuant
                        product={item}
                      />
                    </SwiperSlide>
                  )}
                </CardDesktopContainer>
              : 
                <>
                  <CardContainer>
                    {cart?.items.map((item) => <CartItem product={item} key={item.slug} />)}
                  </CardContainer>
                  <TotalPriceInfo totalPrice={cart.itemsPrice} date={new Date()} />
                  <PrimaryButton
                    value="Finalizar pedido"
                    handleClick={() => {
                      redirect('/forms');
                    }}
                  /> 
                </>   
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
