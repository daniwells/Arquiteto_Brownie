'use client';

import { useState } from "react";
import MainContainer from "@/interface/containers/global/main-container/main";
import DescriptionContainer from "@/interface/containers/global/description-container/main";
import HeaderAdmin from "@/interface/components/admin/header-admin/main";
import FormContainer from "@/interface/containers/global/form-container/main";
import BaseInput from "@/interface/components/global/base-input/main";
import PrimaryButton from "@/interface/components/global/primary-button/main";
import { LineStyle } from "@/interface/components/admin/line/styles";
import CardContainer from "@/interface/containers/site/card-container/main";
import CardCategory from "@/interface/components/admin/card-category/main";
import categoryIcon from '../../../../public/svg/category.svg';
import { useEffect } from "react";
import { getAllCategories, insertCategory, removeCategory } from "@/lib/actions/category.actions";
import MenuAdmin from "@/interface/components/admin/menu-admin/main";

const CategoryContent = () => {
    const [ createdCategory, setCreatedCategory ] = useState("");
    const [ listCategories, setListCategories ] = useState<{
        category: string;
        id: string;
    }[] | null>(null);
    
    const handleGetAllCategories = async () => {
        const allCategories = await getAllCategories();
        setListCategories(allCategories);
    }

    const handleSubmit = async () => {
        insertCategory(createdCategory);
    }

    const handleRemoveCategory = async (categoryId: string) => {
        removeCategory(categoryId);
        handleGetAllCategories();
    }

    useEffect(() => {
        handleGetAllCategories();
    }, [])

    return ( 
        <MainContainer>
            <HeaderAdmin/>
            <DescriptionContainer
                title="Categorias"
                desc="Crie ou edite uma categoria para os seus produtos"
            />
            <FormContainer handleSubmit={handleSubmit}>
                <BaseInput
                    value={createdCategory}
                    icon={categoryIcon}
                    altIcon="ícone de categoria"
                    placeholder="Categoria"
                    id="category"
                    handleChange={(value: string) => setCreatedCategory(value)}
                />
                <PrimaryButton type="submit" value={"Criar categoria"} />
                <LineStyle/>
            </FormContainer>
            <CardContainer>
                { 
                    listCategories && listCategories.map((category) => (
                        <CardCategory 
                            handleRemove={() => handleRemoveCategory(category.id)}
                            value={category.category}
                            key={category.id}
                        />
                    ))
                }
            </CardContainer>
            <MenuAdmin/>
        </MainContainer> 
    );
}
 
export default CategoryContent;