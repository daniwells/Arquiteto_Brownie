'use client';

// Styles
import { colors } from '@/styles/themes';
import * as S from "./styles";

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
import HeaderDesktopContainer from '@/interface/containers/global/header-desktop-container/main';
import CardDesktopContainer from '@/interface/containers/global/card-desktop-container/main';
import CardProductDesktop from '@/interface/components/site/card-product-desktop/main';
import Loading from '@/interface/containers/global/loading/main';

// Utils
import { orderType, productTypeImageString } from '@/types';
import { capitalizeFirstLetter } from '@/lib/utils/utils';

// Actions
import { getProdutById } from '@/lib/actions/product.actions';
import { editOrder, removeOrder } from '@/lib/actions/order.actions';

// Contexts
import { usePopup } from '@/contexts/PopupContext';
import { useActiveStore } from '@/contexts/ActiveStoreContext';

interface editOrderContentProps {
  order: orderType;
}

const EditOrderContent: React.FC<editOrderContentProps> = ({ order }) => {
  const size_768 = useMediaQuery('(min-width:768px)');

  const { activeStatus, checkStoreStatus } = useActiveStore();
  const { openPopup } = usePopup();

  const [products, setProducts] = useState<
  { product: productTypeImageString; qty: number }[] | null
  >(null);
  const [mounted, setMounted] = useState(true);
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
    return <S.OrderButtonsContainer $width={width}>
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
    </S.OrderButtonsContainer>
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

  if(mounted){
    return <Loading/>
  }

  return (
    <>
      <MainContainer>
        {
          size_768 ?
            <HeaderDesktopContainer
              logoPosition="end"
              handleReturn={() => redirect("/admin/orders")}
              hasReturn
              title={`Pedido #${order.id?.slice(0, 6)}`}
            />
          :
            <>
              <HeaderAdmin redirect="/admin/orders"/>
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

          size_768 ?
            <S.Row>
              <TotalPriceInfo hasBackground totalPrice={order.totalPrice} date={new Date()} button={returnButtons()} />
              {order?.customer && <AboutCustomerOrder customer={order.customer} />}
            </S.Row>
          :
            <>
              {order?.customer && <AboutCustomerOrder customer={order.customer} />}
              <Line/>
              <TotalPriceInfo hasBackground totalPrice={order.totalPrice} date={new Date()}/>
              {returnButtons()}
            </>
        }
      </MainContainer>
    </>
  );
};
export default EditOrderContent;
