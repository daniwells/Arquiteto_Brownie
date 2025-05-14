'use client';

// Libs
import { useState, useEffect } from 'react';

// Components
import MainContainer from '@/interface/containers/global/main-container/main';
import HeaderAdmin from '@/interface/components/admin/header-admin/main';
import MenuAdmin from '@/interface/components/admin/menu-admin/main';
import CardContainer from '@/interface/containers/site/card-container/main';
import PrimaryButton from '@/interface/components/global/primary-button/main';
import Title from '@/interface/components/global/title/main';
import TotalPriceInfo from '@/interface/components/site/total-price-info/main';
import Card from '@/interface/components/site/card/main';

// Utils
import { orderType } from '@/types';
import { productTypeImageString } from '@/types';

// Actions
import { getProdutById } from '@/lib/actions/product.actions';

// Contexts
import { usePopup } from '@/contexts/PopupContext';


interface editOrderContentProps {
  order: orderType;
}

const EditOrderContent: React.FC<editOrderContentProps> = ({ order }) => {
  const { openPopup } = usePopup();
  const [ products, setProducts ] = useState<productTypeImageString[] | null>(null);

  const handleGetAllProducts = async () => {
    if (order?.OrderItem) {
      console.log(order.OrderItem)
      await Promise.all(
        order.OrderItem.map(async (item) => {
          if (!item.productId){
            return false;
          }
          
          const responseProduct = await getProdutById(String(item.productId) || "");
          if (!responseProduct?.success) {
            const message = responseProduct.message;
            openPopup(message, 'error');
            return false;
          }
          
          if(responseProduct?.content){
            const productContent = JSON.parse(JSON.stringify(responseProduct.content));
            setProducts(prev => [...(prev ?? []), productContent]);
          }
        })
      )
    }
    return [];
  };

  useEffect(() => {
    handleGetAllProducts();
  }, [])

  return (
    <>
      <MainContainer>
        <HeaderAdmin redirect="/admin/orders" />
        <Title text={`Pedido #${order.id?.slice(0, 6)}`} />
        <CardContainer>
          <></>
          {
            products ? products.map((product, key) => (
              <Card key={key} product={product} handleClick={() => {}}  />
            )) : <></>
          }
          {/* {cart?.items.map((item) => <CartItem product={item} key={item.slug} />)} */}
        </CardContainer>
        <TotalPriceInfo totalPrice={order.totalPrice} date={new Date()} />
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
