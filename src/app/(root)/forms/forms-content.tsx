'use client'

// Libs
import React, { useState } from "react";

// Components
import MainContainer from "@/interface/containers/mobile/main-container/main";
import DescriptionContainer from "@/interface/containers/mobile/description-container/main";
import TotalPriceInfo from "@/interface/components/mobile/total-price-info/main";
import BaseInput from "@/interface/components/global/base-input/main";
import PrimaryButton from "@/interface/components/mobile/primary-button/main";
import MaskedInput from "@/interface/components/global/masked-input/main";

// Style
import * as S from "./styles";

// Images
import Logo from "@/interface/components/mobile/logo/main";
import personIcon from "../../../../public/svg/person.svg";
import phoneIcon from "../../../../public/svg/phone.svg";
import placeIcon from "../../../../public/svg/place.svg";

interface formsContentProps {
    itemsPrice: string,
}

const FormsContent: React.FC<formsContentProps> = ({ itemsPrice }) => {
    const [ form, setForm ] = useState({
        nome: "", 
        fone: "",
        cep: "",
        numeroCasa: "",
    });

    const handleSetForm = (value: string, name: string) => {
        setForm({...form, [name]: value});
    }

    return (
        <MainContainer>
            <Logo/>
            <DescriptionContainer/>
            <S.Form action="">
                <BaseInput
                    value={form.nome}
                    icon={personIcon}
                    altIcon="ícone de pessoa"
                    placeholder="Nome"
                    id="name"
                    handleChange={(val: string) => {
                        if(/^[A-Za-zÀ-ÿ\s]*$/.test(val)){
                            handleSetForm(val, "nome");
                        }
                    }}
                />
                <MaskedInput
                    mask="(00) 00000-0000"
                    value={form.fone}
                    icon={phoneIcon}
                    altIcon="ícone de telefone"
                    placeholder="Fone"
                    id="fone"
                    handleChange={(val: string) => {handleSetForm(val, "fone")}}
                />
                <MaskedInput
                    mask="00000-000"
                    value={form.cep}
                    icon={placeIcon}
                    altIcon="ícone de telefone"
                    placeholder="Cep"
                    id="cep"
                    handleChange={(val: string) => {handleSetForm(val, "cep")}}
                />
                <BaseInput
                    value={form.numeroCasa}
                    icon={placeIcon}
                    altIcon="ícone de lugar"
                    placeholder="Número da casa"
                    id="numeroCasa"
                    type="text"
                    handleChange={(val: string) => {
                        if(/^\d*$/.test(val)){
                            handleSetForm(val, "numeroCasa");
                        }
                    }}
                    max={3}
                />
                <TotalPriceInfo date={new Date()} totalPrice={itemsPrice} />
                <PrimaryButton value="Realizar pagamento" handleClick={() => {}} />
            </S.Form>
        </MainContainer>
        
    );
}

export default FormsContent;