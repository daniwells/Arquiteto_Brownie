'use client';

// Libs
import { redirect } from 'next/navigation';

// Components
import MainContainer from '@/interface/containers/global/main-container/main';
import Logo from '@/interface/components/global/logo/main';
import Menu from '@/interface/components/site/menu/main';
import CardContainer from '@/interface/containers/site/card-container/main';
import CartItem from '@/interface/components/site/cart-item/main';
import PrimaryButton from '@/interface/components/global/primary-button/main';
import Title from '@/interface/components/global/title/main';
import TotalPriceInfo from '@/interface/components/site/total-price-info/main';
import BackToMenu from '@/interface/components/site/back-to-menu/main';

// Utils
import { cartType } from '@/types';

interface cartContentProps {
  cart?: cartType;
}

const CartContent: React.FC<cartContentProps> = ({ cart }) => {
  return (
    <>
      <MainContainer
        minHeight={cart?.items ? (cart?.items?.length > 0 ? undefined : '100vh') : '100vh'}
      >
        <Logo />
        <Title text="Carrinho" />
        {cart && cart?.items?.length > 0 ? (
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
        ) : (
          <BackToMenu text="O carrinho está vazio..." link="Voltar as compras." />
        )}
        <Menu />
      </MainContainer>
    </>
  );
};
export default CartContent;
