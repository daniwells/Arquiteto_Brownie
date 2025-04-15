'use client'

import MainContainer from "@/interface/containers/mobile/main-container/main";
import Logo from "@/interface/components/mobile/logo/main";
import Menu from "@/interface/components/mobile/menu/main";
import DescriptionContainer from "@/interface/containers/mobile/description-container/main";
import TotalPriceInfo from "@/interface/components/mobile/total-price-info/main";
import BaseInput from "@/interface/components/global/base-input/main";
import * as S from "./styles";
import personIcon from "../../../../public/svg/person.svg";
import phoneIcon from "../../../../public/svg/phone.svg";
import placeIcon from "../../../../public/svg/place.svg";
import PrimaryButton from "@/interface/components/mobile/primary-button/main";

const FormsContent = () => {
    return (
        <MainContainer>
            <Logo/>
            <DescriptionContainer/>
            <S.Form action="">
                <BaseInput
                    value={""}
                    icon={personIcon}
                    altIcon="ícone de pessoa"
                    placeholder="Nome"
                    id="name"
                    handleChange={() => {}}
                />
                <BaseInput
                    value={""}
                    icon={phoneIcon}
                    altIcon="ícone de telefone"
                    placeholder="Fone"
                    id="fone"
                    handleChange={() => {}}
                />
                <BaseInput
                    value={""}
                    icon={placeIcon}
                    altIcon="ícone de lugar"
                    placeholder="Bairro"
                    id="bairro"
                    handleChange={() => {}}
                />
                <BaseInput
                    value={""}
                    icon={placeIcon}
                    altIcon="ícone de lugar"
                    placeholder="Rua"
                    id="rua"
                    handleChange={() => {}}
                />
                <BaseInput
                    value={""}
                    icon={placeIcon}
                    altIcon="ícone de lugar"
                    placeholder="Número da casa"
                    id="numeroCasa"
                    handleChange={() => {}}
                />
                <TotalPriceInfo date={new Date()} totalPrice={String(12)} />
                <PrimaryButton value="Realizar pagamento" handleClick={() => {}} />
            </S.Form>
        </MainContainer>
        
    );
}

export default FormsContent;