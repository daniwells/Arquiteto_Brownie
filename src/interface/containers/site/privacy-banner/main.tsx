'use client';
import { useEffect, useState } from 'react';
import * as S from "./styles";
import Link from 'next/link';

export default function PrivacyNotice() {
  const [showBanner, setShowBanner] = useState(false);

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
        <S.FloatingButton>
          <Link href="/privacy-policy">
            Política de Privacidade
          </Link>
        </S.FloatingButton>
      }
      
    </>
  );
}
