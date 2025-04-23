'use client'

// Libs
import React, { useState } from "react";

// Components
import MainContainer from "@/interface/containers/mobile/global/main-container/main";
import DescriptionContainer from "@/interface/containers/mobile/global/description-container/main";
import BaseInput from "@/interface/components/global/base-input/main";
import PrimaryButton from "@/interface/components/mobile/global/primary-button/main";
import MaskedInput from "@/interface/components/global/masked-input/main";
import FormContainer from "@/interface/containers/mobile/global/form-container/main";
import BaseTextarea from "@/interface/components/global/base-textarea/main";
import LogoRight from "@/interface/components/mobile/admin/logo-right/main";
import MultiImageInput from "@/interface/components/mobile/admin/multi-image-input/main";

// Images
import cakeIcon from "../../../../../public/svg/cake.svg";
import priceIcon from "../../../../../public/svg/dolar.svg";
import categoryIcon from "../../../../../public/svg/category.svg";
import infoIcon from "../../../../../public/svg/information.svg";

const FormsProduct = () => {
    const [ form, setForm ] = useState({
        nameProduct: "", 
        price: "",
        category: "",
        description: "",
        images: [],
    });

    const handleSetForm = (value: string | File[], name: string) => {
        setForm({...form, [name]: value});
    }

    return (
        <MainContainer>
            <LogoRight/>
            <DescriptionContainer 
                title="Criar produto"
                desc="Preencha os campos abaixo para criar um novo produto"
            />
            <FormContainer>
                <BaseInput
                    value={form.nameProduct}
                    icon={cakeIcon}
                    altIcon="ícone de bolo"
                    placeholder="Nome produto"
                    id="name_product"
                    handleChange={(value: string) => handleSetForm(value, "nameProduct")}
                />
                <MaskedInput
                    mask="00,00"
                    value={form.price}
                    icon={priceIcon}
                    altIcon="ícone de dolar"
                    placeholder="Preço"
                    id="price"
                    handleChange={(value: string) => handleSetForm(value, "price")}
                />
                <BaseInput
                    value={form.category}
                    icon={categoryIcon}
                    altIcon="ícone de categoria"
                    placeholder="Categoria"
                    id="category"
                    handleChange={(value: string) => handleSetForm(value, "category")}
                />
                <BaseTextarea
                    value={form.description}
                    icon={infoIcon}
                    altIcon="ícone de informação"
                    placeholder="Descrição"
                    id="description"
                    handleChange={(value: string) => handleSetForm(value, "description")}
                />
                <MultiImageInput
                    value={form.images}
                    id="description"
                    handleChange={(value: File[]) => handleSetForm(value, "images")}
                />
                <PrimaryButton value="Criar produto" handleClick={() => {}} />
            </FormContainer>
        </MainContainer>
        
    );
}

export default FormsProduct;