'use client';

// Styles
import { colors } from '@/styles/themes';

// Libs
import React, { useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

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
import HeaderDesktopContainer from '@/interface/containers/global/header-desktop-container/main';
import CardGridContainer from '@/interface/containers/admin/card-grid-container/main';
import Loading from '@/interface/containers/global/loading/main';

// Utils
import { orderType } from '@/types';

interface ordersContentProps {
  orders: orderType[];
  userEmail: string;
}

const OrdersContent: React.FC<ordersContentProps> = ({ orders, userEmail }) => {
  const size_768 = useMediaQuery('(min-width:768px)');

  const [mounted, setMounted] = useState(true);
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

  const returnFilterStatus = () => {
    return <Dropdown
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
                  width={ size_768 ? "400px" : "175px"}
                />
  }

  useEffect(() => {
    handleFilterProduct();
    setMounted(false);
  }, [searchText, status]);

  if(mounted){
    return <Loading/>
  }
  
  return (
    <MainContainer isBottomMenu minHeight={orders ? (orders.length > 0 ? undefined : '100vh') : '100vh'}>
      {
        size_768 ? 
          <>
            <HeaderDesktopContainer
              logoPosition="start"
              userEmail={userEmail}
              value={searchText}
              handleChange={setSearchText}
              hasSearch
              placeholder="Pesquisar por produto"
              filter={returnFilterStatus()}
              hasUser
            />
          </>
        :
          <>
            <HeaderAdmin/>
            <Title text="Gerenciar pedidos" />
          </>
      }
      {orders && orders.length > 0 ? (
        filteredData && filteredData.length > 0 ? 
          <>
            {
              size_768 ?
                <CardGridContainer>
                  {filteredData.length > 0 &&
                    filteredData.map((order) => (
                      // order.status != "FINALIZADO" &&
                      <CardOrder key={order.id} order={order} />                      
                    ))
                  }
                </CardGridContainer>
              :
              <>
                <Search
                  id="ordersSearch"
                  value={searchText}
                  handleChange={setSearchText}
                  placeholder="Pesquisar por produto"
                />
                {returnFilterStatus()}
                <CardContainer height="18rem">
                  {filteredData.length > 0 &&
                    filteredData.map((order) => 
                      // order.status != "FINALIZADO" &&
                      <CardOrder  key={order.id} order={order} />                      
                    )
                  }
                </CardContainer>
              </>
            }  
          </>
        :
          
          <BackToMenu text="Nenhum pedido encontrado..." />
      ) : (
        <BackToMenu text="Nenhum pedido feito até o momento..." />
      )}
      <MenuAdmin />
    </MainContainer>
  );
};

export default OrdersContent;
