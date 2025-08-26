'use client';

import React, { useState, useEffect } from 'react';
import * as S from "./styles";
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import { MdOutlinePrivacyTip } from "react-icons/md";

const PrivacyBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const size_630 = useMediaQuery('(min-width:630px)');

  useEffect(() => {
    const dismissed = sessionStorage.getItem("privacy_notice_dismissed");
    if (!dismissed) {
      setShowBanner(true);
    }
  }, []);

  const closeBanner = () => {
    sessionStorage.setItem("privacy_notice_dismissed", "true");
    setShowBanner(false);
  };

  return (
    <>
      {showBanner && (
        <S.Banner>
          <p>
            O nosso site se utiliza de dados pessoais. Leia nossa{' '}
            <Link href="/privacy-policy">
              Política de Privacidade
            </Link>.
          </p>
          <button onClick={closeBanner}>Fechar</button>
        </S.Banner>
      )}
      {
        !showBanner && 
        <S.FloatingButton href="/privacy-policy">
          
            {
              size_630 ? "Política de Privacidade" : <MdOutlinePrivacyTip/>
            }
          
        </S.FloatingButton>
      }
    </>
  );
}

export default PrivacyBanner;