'use client';

import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import logoIcon from "../../../../public/svg/logo.svg"

const Unavailable = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      gap: "20px",
      flexDirection: "column"
    }}>
      <div style={{display: "flex", gap: "20px", alignItems: "center"}}>
        <Image
            src={logoIcon}
            width={68}
            height={68}
            alt={`${APP_NAME} logo`}
            priority={true}
        />
        <div>
            <h1>Indisponível</h1>
            <p>
                O site está indisponível no momento.<br/>
                Por favor, volte mais tarde!
            </p>
        </div>
      </div>
    </div>
  );
};

export default Unavailable;
