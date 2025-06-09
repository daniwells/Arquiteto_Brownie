// Libs
import React from 'react';
import { redirect } from 'next/navigation';

// Styles
import * as S from './styles';

// Components
import PrimaryButton from '../../global/primary-button/main';
import ProductPrice from '../../global/product-price/main';

// Utils
import { orderType } from '@/types';
import { formatDate } from '@/lib/utils/utils';

interface cardManageProps {
  order: orderType;
}

const CardOrder: React.FC<cardManageProps> = ({ order }) => {
  return (
    <S.BackgroundCardManage
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <S.HeaderCardOrder>
        <h2>Pedido #{order.id?.slice(0, 6)}</h2>
        <S.StatusContainer>
          {order.status === 'ENTREGUE' ? (
            <S.SpanColor status="entregue">Entregue</S.SpanColor>
          ) : order.status === 'PRONTO' ? (
            <S.SpanColor status="pronto">Pronto</S.SpanColor>
          ) : (
            <S.SpanColor status="pendente">Pendente</S.SpanColor>
          )}
        </S.StatusContainer>
      </S.HeaderCardOrder>

      <S.AboutOrder>
        <S.Row>
          <p>Data: {formatDate(order.createdAt)}</p>
          <div>
            Preço: <ProductPrice value={order.totalPrice} />
          </div>
        </S.Row>
        <p>
          Cliente:{' '}
          {order.customer?.name && order.customer?.name?.length > 65
            ? `${order.customer?.name.slice(65)}...`
            : order.customer?.name}
        </p>
      </S.AboutOrder>
      <PrimaryButton
        fontSize="14px"
        value="Info pedido"
        category="secondary"
        handleClick={() => {
          redirect(`/admin/orders/${order.id}`);
        }}
      />
    </S.BackgroundCardManage>
  );
};

export default CardOrder;
