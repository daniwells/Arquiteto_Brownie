'use client';

// Libs
import { useState, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

// Components
import MainContainer from '@/interface/containers/global/main-container/main';
import DescriptionContainer from '@/interface/containers/global/description-container/main';
import HeaderAdmin from '@/interface/components/admin/header-admin/main';
import FormContainer from '@/interface/containers/global/form-container/main';
import BaseInput from '@/interface/components/global/base-input/main';
import PrimaryButton from '@/interface/components/global/primary-button/main';
import { LineStyle } from '@/interface/components/admin/line/styles';
import CardContainer from '@/interface/containers/global/card-container/main';
import CardCategory from '@/interface/components/admin/card-category/main';
import MenuAdmin from '@/interface/components/admin/menu-admin/main';
import HeaderDesktopContainer from '@/interface/containers/site/header-desktop-container/main';

// Images
import categoryIcon from '../../../../public/svg/category.svg';

// Contexts
import { usePopup } from '@/contexts/PopupContext';

// Actions
import { getAllCategories, insertCategory, removeCategory } from '@/lib/actions/category.actions';

const CategoryContent = () => {
  const size_768 = useMediaQuery('(min-width:768px)');

  const [loading, setLoading] = useState(false);
  const { openPopup } = usePopup();
  const [createdCategory, setCreatedCategory] = useState('');
  const [listCategories, setListCategories] = useState<
    | {
        category: string;
        id: string;
      }[]
    | null
  >(null);

  const handleGetAllCategories = async () => {
    setLoading(true);
    const allCategories = await getAllCategories();
    setLoading(false);

    if (!allCategories.success) {
      openPopup(
        allCategories.message instanceof Promise
          ? await allCategories.message
          : "Erro ao resgatar as categorias",
        'error',
      );
      return;
    }

    const categoriesResponse =
      allCategories?.content instanceof Promise
        ? await allCategories.content
        : allCategories.content;

    setListCategories(categoriesResponse);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const response = await insertCategory(createdCategory);
    if (!response?.success) {
      const message = response.message instanceof Promise ? await response.message : '';
      openPopup(message, 'error');
    }
    setLoading(false);
  };

  const handleRemoveCategory = async (categoryId: string) => {
    setLoading(true);
    const response = await removeCategory(categoryId);
    setLoading(false);

    if (!response?.success) {
      const message = response.message instanceof Promise ? await response.message : '';
      openPopup(message, 'error');
    }

    handleGetAllCategories();
  };

  useEffect(() => {
    handleGetAllCategories();
  }, []);

  return (
    <MainContainer>
      {
        size_768 ?
          <HeaderDesktopContainer
            title="Categorias"
            description="Crie ou edite uma categoria para os seus produtos"
          />
        :
          <>
            <HeaderAdmin />
            <DescriptionContainer
              title="Categorias"
              desc="Crie ou edite uma categoria para os seus produtos"
            />
          </>
      }
      
      <FormContainer handleSubmit={handleSubmit}>
        <BaseInput
          value={createdCategory}
          icon={categoryIcon}
          altIcon="ícone de categoria"
          placeholder="Categoria"
          id="category"
          handleChange={(value: string) => setCreatedCategory(value)}
        />
        <PrimaryButton loading={loading} type="submit" value={'Criar categoria'} />
        <LineStyle />
      </FormContainer>
      <CardContainer>
        {listCategories &&
          listCategories.map((category) => (
            <CardCategory
              loading={loading}
              handleRemove={() => handleRemoveCategory(category.id)}
              value={category.category}
              key={category.id}
            />
          ))}
      </CardContainer>
      <MenuAdmin />
    </MainContainer>
  );
};

export default CategoryContent;
