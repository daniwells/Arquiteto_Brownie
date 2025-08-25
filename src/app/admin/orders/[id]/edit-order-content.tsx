'use client';

// Styles
import { colors } from '@/styles/themes';

// Libs
import { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SwiperSlide } from 'swiper/react';

// Components
import MainContainer from '@/interface/containers/global/main-container/main';
import HeaderAdmin from '@/interface/components/admin/header-admin/main';
import CardContainer from '@/interface/containers/global/card-container/main';
import PrimaryButton from '@/interface/components/global/primary-button/main';
import Title from '@/interface/components/global/title/main';
import TotalPriceInfo from '@/interface/components/site/total-price-info/main';
import Card from '@/interface/components/site/card/main';
import Dropdown from '@/interface/components/global/dropdown/main';
import Line from '@/interface/components/admin/line/main';
import AboutCustomerOrder from '@/interface/containers/admin/about-customer-order/main';
import RowContainer from '@/interface/containers/global/row-container/main';
import OrderButtonsContainer from '@/interface/containers/admin/order-buttons-container/main';
import HeaderDesktopContainer from '@/interface/containers/global/header-desktop-container/main';
import CardDesktopContainer from '@/interface/containers/global/card-desktop-container/main';
import CardProductDesktop from '@/interface/components/site/card-product-desktop/main';

// Utils
import { orderType, productTypeImageString } from '@/types';
import { capitalizeFirstLetter } from '@/lib/utils/utils';

// Actions
import { getProdutById } from '@/lib/actions/product.actions';
import { editOrder, removeOrder } from '@/lib/actions/order.actions';

// Contexts
import { usePopup } from '@/contexts/PopupContext';

interface editOrderContentProps {
  order: orderType;
}

const EditOrderContent: React.FC<editOrderContentProps> = ({ order }) => {
  const size_768 = useMediaQuery('(min-width:768px)');
  const size_1024 = useMediaQuery('(min-width:1024px)');

  const { openPopup } = usePopup();
  const [products, setProducts] = useState<
    { product: productTypeImageString; qty: number }[] | null
  >(null);
  const [status, setStatus] = useState<string>(capitalizeFirstLetter(order.status));
  const [loading, setLoading] = useState(false);

  const handleGetAllProducts = async () => {
    if (!order?.OrderItem) return;

    const productsResult: { product: productTypeImageString; qty: number }[] = [];

    await Promise.all(
      order.OrderItem.map(async (item) => {
        if (!item.productId) return;

        const responseProduct = await getProdutById(String(item.productId));
        if (!responseProduct?.success) {
          openPopup(responseProduct.message, 'error');
          return;
        }

        if (responseProduct.content) {
          const serializedProduct: productTypeImageString = JSON.parse(
            JSON.stringify(responseProduct.content),
          );
          productsResult.push({ product: serializedProduct, qty: item.qty });
        }
      }),
    );

    setProducts(productsResult);
  };

  const handleEditOrderStatus = async (order: orderType) => {
    setLoading(true);
    const editOrderResponse = await editOrder(order);

    if (!editOrderResponse?.success) {
      const message =
        editOrderResponse.message ? await editOrderResponse.message : '';
      openPopup(message, 'error');
    } else {
      setLoading(false);
    }
  };

  const handleEditStatus = (status: 'ENTREGUE' | 'PRONTO' | 'PENDENTE') => {
    const newOrder = order;
    newOrder.status = status;

    handleEditOrderStatus(newOrder);
  };

  const handleRemoveOrder = async (finalized?: boolean) => {
    setLoading(true);
    const removeOrderResponse = await removeOrder(order.id || '');
    setLoading(false);

    if(finalized){
      openPopup('Pedido finalizado', 'success');
      redirect('/admin/orders');
    }

    if (!removeOrderResponse?.success) {
      const message =
        removeOrderResponse.message ? await removeOrderResponse.message : '';
      openPopup(message, 'error');
    } else {
      openPopup('Pedido cencelado', 'success');
    }
    redirect('/admin/orders');
  };

  const returnButtons = (width?: number) => {
    return <OrderButtonsContainer width={width}>
        <PrimaryButton
          loading={loading}
          value="Finalizar pedido"
          handleClick={() => handleRemoveOrder(true)}
        />
        <PrimaryButton
          loading={loading}
          category="delete"
          type="button"
          value="Cancelar pedido"
          handleClick={handleRemoveOrder}
        />
    </OrderButtonsContainer>
  }

  const returnOrderStatus = () => {
    return <Dropdown
          colorBall={
            status === 'Entregue'
              ? colors.green
              : status === 'Pronto'
                ? colors.red
                : colors.baseYellow
          }
          options={[
            { value: 'ENTREGUE', label: 'Entregue' },
            { value: 'PRONTO', label: 'Pronto' },
            { value: 'PENDENTE', label: 'Pendente' },
          ]}
          selectedOption={status}
          setSelectedOption={(value: string) => {
            const allowedStatus = ['ENTREGUE', 'PRONTO', 'PENDENTE'] as const;
            if (allowedStatus.includes(value.toUpperCase() as any)) {
              handleEditStatus(value.toUpperCase() as (typeof allowedStatus)[number]);
              setStatus(value);
            }
          }}
          width={'175px'}
        />
  }

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  return (
    <>
      <MainContainer>
        {
          size_768 ?
            <HeaderDesktopContainer
              handleReturn={() => redirect("/admin/orders")}
              hasReturn
              description={`Cliente: ${order?.customer?.name}`}
              title={`Pedido #${order.id?.slice(0, 6)}`}
            />
          :
            <>
              <HeaderAdmin redirect="/admin/orders" />
              <Title text={`Pedido #${order.id?.slice(0, 6)}`}/>
            </>
        }
        {returnOrderStatus()}
        {
          size_768 ?
            <CardDesktopContainer amountCards={products?.length || 0}>
              {products ? (
                products.map((item, key) => (
                  <SwiperSlide key={key}>
                      <CardProductDesktop
                        product={item.product}
                        defaultQty={item.qty}
                        hasQuant
                        loading={loading}
                      />
                  </SwiperSlide>
                ))
              ) : (
                <></>
              )}
            </CardDesktopContainer>
          :
            <CardContainer>
              {products ? (
                products.map((item, key) => (
                  <Card key={key} product={item.product} qty={item.qty}/>
                ))
              ) : (
                <></>
              )}
            </CardContainer>
        }
        
        {

          size_1024 ?
              <RowContainer>
                {returnButtons()}
                {order?.customer && <AboutCustomerOrder customer={order.customer} />}
                <TotalPriceInfo hasBackground totalPrice={order.totalPrice} date={new Date()} />
              </RowContainer>
          :
            size_768 ? 
              <>
                {order?.customer && <AboutCustomerOrder customer={order.customer} />}
                <Line/>
                <RowContainer>
                  {returnButtons(50)}
                  <TotalPriceInfo hasBackground totalPrice={order.totalPrice} date={new Date()} />
                </RowContainer>
              </>
            :
              <>
                {order?.customer && <AboutCustomerOrder customer={order.customer} />}
                <Line/>
                <TotalPriceInfo hasBackground totalPrice={order.totalPrice} date={new Date()} />
                {returnButtons()}
              </>
        }
      </MainContainer>
    </>
  );
};
export default EditOrderContent;
