import Link from "next/link";
import arrowLeft from "../../../../public/svg/arrow-left.svg"
import * as S from "./styles";
import React from "react";

interface returnProps {
    redirect: string;
}

const Return: React.FC<returnProps> = ({redirect}) => {
    return ( 
        <S.HeaderContainerSite>
            <Link href={redirect}>
                <S.BackIcon src={arrowLeft} alt="Ícone de Voltar" />
            </Link>
        </S.HeaderContainerSite>
    );
}
 
export default Return;