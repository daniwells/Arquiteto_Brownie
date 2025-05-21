'use client';

// Styles
import { colors } from '@/styles/themes';

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
import Dropdown from '@/interface/components/global/dropdown/main';
import { LineStyle } from '@/interface/components/admin/line/styles';
import AboutCustomerOrder from '@/interface/containers/admin/about-customer-order/main';

// Utils
import { orderType, productTypeImageString } from '@/types';
import { capitalizeFirstLetter } from '@/lib/utils';

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
  const [status, setStatus] = useState<string>(capitalizeFirstLetter(order.status));
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

  const handleEditOrder = async (order: orderType) => {
    setLoading(true);
    const editOrderResponse = await editOrder(order);
    
    if (!editOrderResponse?.success) {
      const message = editOrderResponse.message instanceof Promise ? await editOrderResponse.message : '';
      openPopup(message, 'error');
    } else {
      setLoading(false);
      if(order.status === "ENTREGUE"){
        openPopup('Pedido finalizado', 'success');
        redirect("/admin/orders");
      }
    } 
  }

  const handleEditStatus = (status: "ENTREGUE" | "PRONTO" | "PENDENTE") => {
    const newOrder = order;
    newOrder.status = status;

    handleEditOrder(newOrder);
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
        <Dropdown
          colorBall={status === 'Entregue' ? colors.green : status === 'Pronto' ? colors.red : colors.baseYellow}
          options={[
            { value: 'ENTREGUE', label: 'Entregue' },
            { value: 'PRONTO', label: 'Pronto' },
            { value: 'PENDENTE', label: 'Pendente' },
          ]}
          selectedOption={status}
          setSelectedOption={(value: string) => {
            const allowedStatus = ["ENTREGUE", "PRONTO", "PENDENTE"] as const;
            if(allowedStatus.includes(value.toUpperCase() as any)){
              handleEditStatus(value.toUpperCase() as typeof allowedStatus[number]);
              setStatus(value);
            }
          }}
          width={'175px'}
        />
        
        <CardContainer>
          <></>
          {
            products ? products.map((product, key) => (
              <Card key={key} product={product.product} qty={product.qty} handleClick={() => {}}  />
            )) : <></>
          }
        </CardContainer>
        {
          order?.customer &&
          <AboutCustomerOrder customer={order.customer} />
        }
        <LineStyle/>
        <TotalPriceInfo totalPrice={order.totalPrice} date={new Date()} />
        <PrimaryButton 
          loading={loading}
          value="Finalizar pedido"
          handleClick={() => handleEditStatus("ENTREGUE")}
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
