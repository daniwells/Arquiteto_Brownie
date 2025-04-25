'use client'

// Styles
import { colors } from "@/styles/themes";

// Libs
import React from "react";
import { useForm } from "react-hook-form";

// Components
import MainContainer from "@/interface/containers/global/main-container/main";
import DescriptionContainer from "@/interface/containers/global/description-container/main";
import BaseInput from "@/interface/components/global/base-input/main";
import PrimaryButton from "@/interface/components/global/primary-button/main";
import MaskedInput from "@/interface/components/global/masked-input/main";
import FormContainer from "@/interface/containers/global/form-container/main";
import BaseTextarea from "@/interface/components/global/base-textarea/main";
import HeaderAdmin from "@/interface/components/admin/header-admin/main";
import MultiImageInput from "@/interface/components/admin/multi-image-input/main";
import Dropdown from "@/interface/components/global/dropdown/main";

// Images
import cakeIcon from "../../../../public/svg/cake.svg";
import priceIcon from "../../../../public/svg/dolar.svg";
import categoryIcon from "../../../../public/svg/category.svg";
import infoIcon from "../../../../public/svg/information.svg";

// Actions
import { insertProduct } from "@/lib/actions/product.actions";

// Utils
import { normalizeString } from "@/lib/utils";

// Context
import { usePopup } from "@/contexts/PopupContext";

interface formData {
    name: string;
    price: string;
    category: string;
    description: string;
    images: File[];
    active: string;
}

const FormsProduct = () => {
    const { openPopup } = usePopup();

    const {
        handleSubmit,
        setValue,
        watch
      } = useForm<formData>({
        defaultValues: {
          name: "",
          price: "",
          category: "",
          description: "",
          images: [],
          active: "Ativo",
        },
    });

    const onSubmit = async (data: formData) => {
        const images: string[] = []

        data?.images?.map((img) => {
            const nameImg = img.name
            const pathImg = "/images/sample-products/" + nameImg
            images.push(pathImg)
        })

        const producToSave = {
            ...data,
            slug: data.category + "_" + normalizeString(data?.name),
            images: images,
            active: data.active == "Ativo" ? true : false,
            createdAt: new Date(),
            price: data.price.replace(",", "."),
        }

        const response = await insertProduct(producToSave);
        if(!response?.success){
            const message = response.message instanceof Promise
                ? await response.message
                : response.message;

            openPopup(message, "error");
        }else{
            openPopup("Produto criado com sucesso", "success");
        }
    };

    const watchFields = watch();

    return (
        <MainContainer>
            <HeaderAdmin redirect="/admin/products" />
            <DescriptionContainer 
                title="Criar produto"
                desc="Preencha os campos abaixo para criar um novo produto"
            />
            <FormContainer handleSubmit={handleSubmit(onSubmit)}>    
                <BaseInput
                    value={watchFields.name}
                    icon={cakeIcon}
                    altIcon="ícone de bolo"
                    placeholder="Nome produto"
                    id="name_product"
                    handleChange={(value: string) => setValue("name", value)}
                />

                <MaskedInput
                    mask="00,00"
                    value={watchFields.price}
                    icon={priceIcon}
                    altIcon="ícone de dolar"
                    placeholder="Preço"
                    id="price"
                    handleChange={(value: string) => setValue("price", value)}
                />

                <BaseInput
                    value={watchFields.category}
                    icon={categoryIcon}
                    altIcon="ícone de categoria"
                    placeholder="Categoria"
                    id="category"
                    handleChange={(value: string) => setValue("category", value)}
                />

                <BaseTextarea
                    value={watchFields.description}
                    icon={infoIcon}
                    altIcon="ícone de informação"
                    placeholder="Descrição"
                    id="description"
                    handleChange={(value: string) => setValue("description", value)}
                />

                <MultiImageInput
                    value={watchFields.images}
                    id="images"
                    handleChange={(value: File[]) => {
                        console.log(value)
                        setValue("images", value)
                    }}
                />

                <Dropdown
                    colorBall={watchFields.active === "Ativo" ? colors.green : colors.red}
                    options={[
                    { value: "Ativo", label: "Ativo" },
                    { value: "Desativado", label: "Desativado" },
                    ]}
                    selectedOption={watchFields.active}
                    setSelectedOption={(value: string) => {
                        
                        setValue("active", value)}
                    }
                    width={"175px"}
                />

                <PrimaryButton type="submit" value="Criar produto"/>
            </FormContainer>
        </MainContainer>
        
    );
}

export default FormsProduct;