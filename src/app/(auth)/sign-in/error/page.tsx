'use client';

import { useSearchParams } from 'next/navigation';
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import logoIcon from "../../../../../public/svg/logo.svg";
import { useEffect, useState } from "react";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(searchParams.get('error'));
  }, [searchParams]);

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      gap: "20px",
      flexDirection: "column"
    }}>
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Image
          src={logoIcon}
          width={68}
          height={68}
          alt={`${APP_NAME} logo`}
          priority={true}
        />
        <div>
          <h1>Erro</h1>
          {error === 'AccessDenied' ? (
            <p
              style={{
                maxWidth: '250px',
                wordBreak: 'break-word',
                whiteSpace: 'normal'
              }}
            >Seu e-mail não está autorizado a acessar esta rota!</p>
          ) : (
            <p 
              style={{
                maxWidth: '250px',
                wordBreak: 'break-word',
                whiteSpace: 'normal'
              }}
            >Ocorreu um erro: {error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
