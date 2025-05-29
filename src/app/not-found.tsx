'use client';

import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import logoIcon from "../../public/svg/logo.svg";
import PrimaryButton from "@/interface/components/global/primary-button/main";
import { redirect } from "next/navigation";

const NotFoundPage = () => {
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
          <h1>Not Found</h1>
          <p>Essa página não foi encontrada</p>
        </div>
      </div>
      <PrimaryButton
        value="Voltar para o site"
        handleClick={() => redirect("/")}
      />
    </div>
  );
};

export default NotFoundPage;
