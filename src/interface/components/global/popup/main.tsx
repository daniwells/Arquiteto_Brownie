// components/ErrorPopup/ErrorPopup.tsx
import React from 'react';
import * as S from './styles';
import PrimaryButton from '../button/main';

interface popupProps {
  message: string;
  onClose: () => void;
  type: 'error' | 'success';
}

const Popup: React.FC<popupProps> = ({ message, onClose, type }) => {
  return (
    <S.Overlay>
      <S.Container>
        <S.TitleError>
          {type === 'error' ? 'Erro!' : type === 'success' ? 'Sucesso!' : 'description'}
        </S.TitleError>
        <S.Message>{message}.</S.Message>
        <PrimaryButton category={type} handleClick={onClose} value="Fechar" />
      </S.Container>
    </S.Overlay>
  );
};

export default Popup;
