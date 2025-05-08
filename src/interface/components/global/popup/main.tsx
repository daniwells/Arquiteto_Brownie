// components/ErrorPopup/ErrorPopup.tsx
import React from 'react';
import * as S from './styles';
import PrimaryButton from '../primary-button/main';

interface popupErrorProps {
  message: string;
  onClose: () => void;
  type: 'error' | 'success';
}

const PopupError: React.FC<popupErrorProps> = ({ message, onClose, type }) => {
  return (
    <S.Overlay>
      <S.Container>
        <S.TitleError>
          {type === 'error' ? 'Erro!' : type === 'success' ? 'successo!' : 'description'}
        </S.TitleError>
        <S.Message>{message}.</S.Message>
        <PrimaryButton category={type} handleClick={onClose} value="Fechar" />
      </S.Container>
    </S.Overlay>
  );
};

export default PopupError;
