'use client';

// Styles
import { colors } from '@/styles/themes';

// Libs
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

// Components
import MainContainer from '@/interface/containers/global/main-container/main';
import DescriptionContainer from '@/interface/containers/global/description-container/main';
import BaseInput from '@/interface/components/global/base-input/main';
import PrimaryButton from '@/interface/components/global/primary-button/main';
import MaskedInput from '@/interface/components/global/masked-input/main';
import FormContainer from '@/interface/containers/global/form-container/main';
import BaseTextarea from '@/interface/components/global/base-textarea/main';
import HeaderAdmin from '@/interface/components/admin/header-admin/main';
import MultiImageInput from '@/interface/components/admin/multi-image-input/main';
import Dropdown from '@/interface/components/global/dropdown/main';
import DropdownSecond from '@/interface/components/admin/dropdown-second/main';

// Images
import cakeIcon from '../../../../public/svg/cake.svg';
import priceIcon from '../../../../public/svg/dolar.svg';
import categoryIcon from '../../../../public/svg/category.svg';
import infoIcon from '../../../../public/svg/information.svg';

// Actions
import { insertProduct, editProduct } from '@/lib/actions/product.actions';
import { getAllCategories } from '@/lib/actions/category.actions';

// Utils
import { normalizeString } from '@/lib/utils';
import { productType } from '@/types';

// Context
import { usePopup } from '@/contexts/PopupContext';

interface formData {
  name: string;
  price: string;
  category: string;
  description: string;
  images: File[];
  active: string;
}

interface formsProduct {
  selectedProduct?: productType;
}

const FormsProduct: React.FC<formsProduct> = ({ selectedProduct }) => {
  const { openPopup } = usePopup();
  const [ categories, setCategories ] = useState([""]);
  const [ loading, setLoading ] = useState(false);

  const handleGetAllCategories = async () => {
    const response = await getAllCategories();
    if(!response.success){
      openPopup(response.message instanceof Promise ? await response.message : "", "error");
      return
    }

    const categoriesResponse = response?.content instanceof Promise ? await response.content : response.content
    const categories = [""]
    categoriesResponse.map((category: {category: string;id: string;}) => {
      categories.push(category.category)
    })

    setCategories(categories)
  }

  useEffect(() => {
    handleGetAllCategories();
  }, [])
  
  const { handleSubmit, setValue, watch } = useForm<formData>({
    defaultValues: {
      name: selectedProduct?.name || '',
      price: selectedProduct?.price?.replace(".", ",") || '',
      category: selectedProduct?.category || '',
      description: selectedProduct?.description || '',
      images: selectedProduct?.images,
      active: selectedProduct ? selectedProduct?.active ? "Ativo" : "Desativado" : "Ativo",
    },
  });
  
  const onSubmit = async (data: formData) => {

    const producToSave = {
      ...data,
      slug: normalizeString(data?.name) + '_' + data.category,
      active: data.active == 'Ativo' ? true : false,
      createdAt: new Date(),
      price: data.price.replace(',', '.'),
    };

    let response: {success: boolean, message: string | Promise<any>} = {success: false, message: ""};

    setLoading(true)
    if(selectedProduct){
      response = await editProduct(String(selectedProduct?.id), producToSave);
    }else{
      response = await insertProduct(producToSave);
    }
    setLoading(false)
    
    if (!response?.success) {
      const message =
      response.message instanceof Promise ? await response.message : "";
      
      openPopup(message, 'error');
    } else {
      openPopup('Produto criado com successo', 'success');
    }
  };

  const watchFields = watch();

  return (
    <MainContainer>
      <HeaderAdmin redirect="/admin/products" />
      {
        selectedProduct ?
          <DescriptionContainer
            title="Editar produto"
            desc="Altere qualquer informação deste produto"
          />
        :
          <DescriptionContainer
            title="Criar produto"
            desc="Preencha os campos abaixo para criar um novo produto"
          />
      }
      
      <FormContainer handleSubmit={handleSubmit(onSubmit)}>
        <BaseInput
          value={watchFields.name}
          icon={cakeIcon}
          altIcon="ícone de bolo"
          placeholder="Nome produto"
          id="name_product"
          handleChange={(value: string) => setValue('name', value)}
        />

        <MaskedInput
          mask={Number}
          value={watchFields.price}
          icon={priceIcon}
          altIcon="ícone de dolar"
          placeholder="Preço"
          id="price"
          handleChange={(value: string) => setValue('price', value)}
          max={1000}
          min={0}
          radix=","
          scale={2}
        />

        <DropdownSecond
          icon={categoryIcon}
          value={watchFields.category}
          onChange={(value: string) => {
            setValue('category', value);
          }}
          options={categories}
        />

        <BaseTextarea
          value={watchFields.description}
          icon={infoIcon}
          altIcon="ícone de informação"
          placeholder="Descrição"
          id="description"
          handleChange={(value: string) => setValue('description', value)}
        />

        <MultiImageInput
          value={watchFields.images}
          id="images"
          handleChange={(value: File[]) => setValue('images', value)}
        />

        <Dropdown
          colorBall={watchFields.active === 'Ativo' ? colors.green : colors.red}
          options={[
            { value: 'Ativo', label: 'Ativo' },
            { value: 'Desativado', label: 'Desativado' },
          ]}
          selectedOption={watchFields.active}
          setSelectedOption={(value: string) => {
            setValue('active', value);
          }}
          width={'175px'}
        />

        <PrimaryButton 
          loading={loading}
          type="submit"
          value={selectedProduct ? "Editar produto" : "Criar produto"} 
        />
      </FormContainer>
    </MainContainer>
  );
};

export default FormsProduct;
