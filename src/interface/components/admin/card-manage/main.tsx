// Libs
import React from 'react';
import { redirect } from 'next/navigation';
import useMediaQuery from '@mui/material/useMediaQuery';

// Styles
import * as S from './styles';

// Components
import ProductPrice from '../../global/product-price/main';
import PrimaryButton from '../../global/primary-button/main';

// Utils
import { productTypeImageString } from '@/types';

interface cardManageProps {
  product: productTypeImageString;
}

const CardManage: React.FC<cardManageProps> = ({ product }) => {
  const size_385 = useMediaQuery('(min-width:385px)');

  return (
    <S.BackgroundCardManage
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <S.RowOrColumn>
        {
          !size_385 && <S.ImageProductManageCard $url={product.images[0]} />
        }
        <S.AboutProduct>
          <h3>{product.name}</h3>
          <p>{product.description}</p>

          <div>
            <span>Valor: </span> <ProductPrice value={product.price} />
          </div>
          <div>
            <span>Status:</span>
            <p>
              {product.active ? (
                <S.SpanColor status="active">Ativo</S.SpanColor>
              ) : (
                <S.SpanColor status="deactivate">Desativado</S.SpanColor>
              )}
            </p>
          </div>
        </S.AboutProduct>
        {
          size_385 && <S.ImageProductManageCard $url={product.images[0]} />
        }
      </S.RowOrColumn>
      <PrimaryButton
        fontSize="14px"
        value="Editar produto"
        category="secondary"
        handleClick={() => {
          redirect(`/admin/products/${product.id}`);
        }}
      />
    </S.BackgroundCardManage>
  );
};

export default CardManage;
