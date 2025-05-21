import React from 'react';
import { customerType } from '@/types';
import * as S from "./styles";
import { formatDocumentValue } from '@/lib/utils';

interface aboutCustomerOrder {
    customer: customerType
}

const AboutCustomerOrder: React.FC<aboutCustomerOrder> = ({customer}) => {
  return (
    <S.AboutCustomerOrderContainer>
        <div>
            <S.Column>
                <S.ToolTipContainer>
                    <p>
                        Nome: {customer.name.length > 35 ? `${customer.name.slice(35)}...` : customer.name}
                        <S.ToolTip>{customer.name}</S.ToolTip>
                    </p> 
                </S.ToolTipContainer>
                <p>Telefone: {formatDocumentValue("phone", customer.phone)}</p>
            </S.Column>
            <S.Column>
                <p>Cep: {formatDocumentValue("cep", customer.cep)}</p>
                <p>Número casa: {customer.number}</p>
            </S.Column>
        </div>
    </S.AboutCustomerOrderContainer>
  );
};

export default AboutCustomerOrder;