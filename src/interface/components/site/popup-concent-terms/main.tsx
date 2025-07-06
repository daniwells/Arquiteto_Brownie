// Libs
import React, { useState } from 'react';
import { FormControlLabel, Checkbox, Typography } from '@mui/material';

// Components
import PrimaryButton from '../../global/primary-button/main';

// Images
import removeIcon from "../../../../../public/svg/remove.svg"

// Styles
import * as S from './styles';


interface popupConcentTermsProps {
  onClose: () => void;
  submit: () => void;
}

const PopupConcentTerms: React.FC<popupConcentTermsProps> = ({ onClose, submit }) => {
  const [accepted, setAccepted] = useState(false);

  const handleSubmit = async () => {
    onClose();
    await submit();
  }

  return (
    <S.Overlay>
      <S.Container>
        <S.Close onClick={onClose} src={removeIcon} alt="ícone para fechar popup"/>
        <S.TitleError>
          Termos e Condições
        </S.TitleError>
        <S.Message>
          <FormControlLabel
            control={<Checkbox
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
            />}
            label={
              <Typography
                sx={{
                  fontSize: '16px',
                  '@media (max-width: 630px)': {
                    fontSize: '14px',
                  },
                }}
              >
                Eu li e concordo com as políticas de privacidade do site.{' '}
                <S.PrivacityPolicy 
                  href="/privacity-policy"
                  style={{ textDecoration: 'underline' }}
                > 
                  Política de Privacidade.
                </S.PrivacityPolicy>
              </Typography>
            }
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: 'fit-content',
              margin: '0 auto',
            }}
          />
        </S.Message>
        <PrimaryButton
          category={accepted ? "success" : "deactivate"}
          handleClick={handleSubmit}
          value="Continuar"
        />
      </S.Container>
    </S.Overlay>
  );
};

export default PopupConcentTerms;