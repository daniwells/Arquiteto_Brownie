'use client';

// Libs
import { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';

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
import { orderType, productTypeImageString } from '@/types';

// Actions
import { getProdutById } from '@/lib/actions/product.actions';
import { editOrder, removeOrder } from '@/lib/actions/order.actions';

// Contexts
import { usePopup } from '@/contexts/PopupContext';


interface editOrderContentProps {
  order: orderType;
}

const EditOrderContent: React.FC<editOrderContentProps> = ({ order }) => {
  const { openPopup } = usePopup();
  const [ products, setProducts ] = useState<{product: productTypeImageString, qty: number}[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetAllProducts = async () => {
    if (!order?.OrderItem) return;

    const productsResult: {product: productTypeImageString, qty: number}[] = [];

    await Promise.all(
      order.OrderItem.map(async (item) => {

        if (!item.productId) return;

        const responseProduct = await getProdutById(String(item.productId));
        if (!responseProduct?.success) {
          openPopup(responseProduct.message, "error");
          return;
        }

        if (responseProduct.content) {
          const serializedProduct: productTypeImageString = JSON.parse(JSON.stringify(responseProduct.content));
          productsResult.push({product: serializedProduct, qty: item.qty});
        }
      })
    );

    setProducts(productsResult);
  };

  // const handleEditOrderItem = async (orderItem: orderItemType, productId: string) => {
  //   const editOrderItemResponse = await editOrderItem(String(order?.id || ""), productId, orderItem);
    
  //   if (!editOrderItemResponse?.success) {
  //     const message = editOrderItemResponse.message instanceof Promise ? await editOrderItemResponse.message : '';
  //     openPopup(message, 'error');
  //   } else {
  //     openPopup('Produto editado com sucesso', 'success');
  //   }
  // }

  const handleEditOrder = async (order: orderType, isFinished?: boolean) => {
    setLoading(true);
    const editOrderResponse = await editOrder(order);
    
    if (!editOrderResponse?.success) {
      const message = editOrderResponse.message instanceof Promise ? await editOrderResponse.message : '';
      openPopup(message, 'error');
    } else {
      setLoading(false);
      if(isFinished){
        openPopup('Pedido finalizado', 'success');
      }else{
        openPopup('Produto editado com sucesso', 'success');
      }
      redirect("/admin/orders");
    }
  }

  const handleFinishOrder = () => {
    const newOrder = order;
    newOrder.status = "ENTREGUE";

    handleEditOrder(newOrder, true);
  }

  const handleRemoveOrder = async () => {
    setLoading(true);
    const removeOrderResponse = await removeOrder(order.id || "");
    setLoading(false);
    
    if (!removeOrderResponse?.success) {
      const message = removeOrderResponse.message instanceof Promise ? await removeOrderResponse.message : '';
      openPopup(message, 'error');
    } else {
      openPopup('Pedido cencelado', 'success');  
    }
    redirect("/admin/orders");
  }

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
              <Card key={key} product={product.product} qty={product.qty} handleClick={() => {}}  />
            )) : <></>
          }
        </CardContainer>
        <TotalPriceInfo totalPrice={order.totalPrice} date={new Date()} />
        <PrimaryButton 
          loading={loading}
          value="Finalizar pedido"
          handleClick={() => handleFinishOrder()}
        />
        <PrimaryButton
          loading={loading}
          category="delete"
          type="button"
          value="Cancelar pedido"
          handleClick={handleRemoveOrder}
        />
        <MenuAdmin />
      </MainContainer>
    </>
  );
};
export default EditOrderContent;
