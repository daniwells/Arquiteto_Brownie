'use client';

// Styles
import { colors } from '@/styles/themes';

// Libs
import React, { useEffect, useState } from 'react';
// import { redirect } from 'next/navigation';

// Components
import MainContainer from '@/interface/containers/global/main-container/main';
import Title from '@/interface/components/global/title/main';
import HeaderAdmin from '@/interface/components/admin/header-admin/main';
import MenuAdmin from '@/interface/components/admin/menu-admin/main';
import Search from '@/interface/components/global/search/main';
import CardContainer from '@/interface/containers/global/card-container/main';
import Dropdown from '@/interface/components/global/dropdown/main';
import BackToMenu from '@/interface/components/site/back-to-menu/main';
import CardOrder from '@/interface/components/admin/card-order/main';

// Utils
import { orderType } from '@/types';

interface ordersContentProps {
  orders: orderType[];
}

const OrdersContent: React.FC<ordersContentProps> = ({ orders }) => {
  const [filteredData, setFilteredData] = useState(orders);

  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState('Todos');

  const handleFilterProduct = () => {
    if (orders) {
      setFilteredData(
        orders
          .filter((order) => {
            if (searchText === '') return true;

            return (
              !searchText.trim() ||
              [
                order.totalPrice?.toString(),
                order.id?.slice(0, 6),
                order.createdAt.toString(),
                order.status,
              ].some((field) => field?.toLowerCase().includes(searchText.toLowerCase()))
            );
          })
          .filter((product) => {
            if (status === '' || status === 'Todos') return true;

            return product.status?.toLowerCase() === status.toLowerCase();
          }),
      );
    }
  };

  useEffect(() => {
    handleFilterProduct();
  }, [searchText, status]);

  return (
    <MainContainer minHeight={orders ? (orders.length > 0 ? undefined : '100vh') : '100vh'}>
      <HeaderAdmin />
      <Title text="Gerenciar pedidos" />
      {orders && orders.length > 0 ? (
        <>
          <Search
            id="ordersSearch"
            value={searchText}
            handleChange={setSearchText}
            placeholder="Pesquisar por produto"
          />
          <Dropdown
            colorBall={
              status === 'Entregue'
                ? colors.green
                : status === 'Pronto'
                  ? colors.red
                  : status === 'Pendente'
                    ? colors.baseYellow
                    : colors.mediumGray
            }
            options={[
              { value: 'TODOS', label: 'Todos' },
              { value: 'PENDENTE', label: 'Pendente' },
              { value: 'PRONTO', label: 'Pronto' },
              { value: 'ENTREGUE', label: 'Entregue' },
            ]}
            selectedOption={status}
            setSelectedOption={(value: string) => setStatus(value)}
            width={`175px`}
          />
          <CardContainer height="18rem">
            <></>
            {filteredData.length > 0 &&
              filteredData.map((order) => <CardOrder key={order.id} order={order} />)}
          </CardContainer>
        </>
      ) : (
        <BackToMenu text="Nenhum pedido feito até o momento..." />
      )}
      <MenuAdmin />
    </MainContainer>
  );
};

export default OrdersContent;
