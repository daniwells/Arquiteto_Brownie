'use client';

// Components
import MainContainer from '@/interface/containers/global/main-container/main';
import HeaderAdmin from '@/interface/components/admin/header-admin/main';
import MenuAdmin from '@/interface/components/admin/menu-admin/main';
import CardContainer from '@/interface/containers/site/card-container/main';
import PrimaryButton from '@/interface/components/global/primary-button/main';
import Title from '@/interface/components/global/title/main';
import TotalPriceInfo from '@/interface/components/site/total-price-info/main';

interface editOrderContentProps {
  order: string;
}

const EditOrderContent: React.FC<editOrderContentProps> = ({ order }) => {
  console.log(order);
  return (
    <>
      <MainContainer>
        <HeaderAdmin redirect="/admin/orders" />
        <Title text="Pedidos" />
        <CardContainer>
          <></>
          {/* {cart?.items.map((item) => <CartItem product={item} key={item.slug} />)} */}
        </CardContainer>
        <TotalPriceInfo totalPrice={'0'} date={new Date()} />
        <PrimaryButton value="Finalizar pedido" handleClick={() => {}} />
        <PrimaryButton
          category="delete"
          type="button"
          value="Cancelar produto"
          handleClick={() => {}}
        />
        <MenuAdmin />
      </MainContainer>
    </>
  );
};
export default EditOrderContent;
