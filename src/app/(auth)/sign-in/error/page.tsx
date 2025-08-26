'use client';

import { Suspense } from "react";
import ErrorContent from "./error-content";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import logoIcon from "../../../../../public/svg/logo.svg";

export default function AuthErrorPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        gap: "20px",
        flexDirection: "column"
      }}
    >
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Image
          src={logoIcon}
          width={68}
          height={68}
          alt={`${APP_NAME} logo`}
          priority
        />
        <div>
          <Suspense fallback={<p>Carregando erro...</p>}>
            <ErrorContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}