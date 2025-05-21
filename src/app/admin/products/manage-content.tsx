'use client';

// Styles
import { colors } from '@/styles/themes';

// Libs
import React, { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

// Components
import MainContainer from '@/interface/containers/global/main-container/main';
import Title from '@/interface/components/global/title/main';
import HeaderAdmin from '@/interface/components/admin/header-admin/main';
import CardManage from '@/interface/components/admin/card-manage/main';
import PrimaryButton from '@/interface/components/global/primary-button/main';
import MenuAdmin from '@/interface/components/admin/menu-admin/main';
import Search from '@/interface/components/global/search/main';
import CardContainer from '@/interface/containers/site/card-container/main';
import Dropdown from '@/interface/components/global/dropdown/main';

// Utils
import { productTypeImageString } from '@/types';

interface contentManageProps {
  data: productTypeImageString[];
  categories: string[];
}

const ContentManage: React.FC<contentManageProps> = ({ data, categories }) => {
  const [filteredData, setFilteredData] = useState(data);

  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState('Todos');

  const handleFilterProduct = () => {
    setFilteredData(
      data
        .filter((product) => {
          if (searchText === '') return true;
          let active = 'Ativo';
          if (!product.active) {
            active = 'Desativado';
          }

          return (
            !searchText.trim() ||
            [
              product.name?.toString(),
              product.category?.toLowerCase(),
              product.description?.toString(),
              product.price?.toString(),
              active,
            ].some((field) => field?.toLowerCase().includes(searchText.toLowerCase()))
          );
        })
        .filter((product) => {
          if (category === '' || category === 'Todos') return true;

          return product.category?.toLowerCase() === category.toLowerCase();
        }),
    );
  };

  useEffect(() => {
    handleFilterProduct();
  }, [searchText, category]);

  return (
    <MainContainer>
      <HeaderAdmin />
      <Title text="Gerenciar produtos" />
      <Search value={searchText} handleChange={setSearchText} placeholder="Pesquisar por produto" />
      <Dropdown
        colorBall={colors.mediumGray}
        options={[
          { value: 'Todos', label: 'Todos' },
          ...categories.map((value: string) => ({ value, label: value })),
        ]}
        selectedOption={category}
        setSelectedOption={(value: string) => setCategory(value)}
        width={`${category.length + 200}px`}
      />
      <PrimaryButton
        category="normal"
        type="submit"
        handleClick={() => {
          redirect('/admin/products/create');
        }}
        value="Criar novo produto"
      />
      <CardContainer height="18rem">
        {filteredData.length > 0 &&
          filteredData.map((product) => <CardManage key={product.slug} product={product} />)}
      </CardContainer>
      <MenuAdmin />
    </MainContainer>
  );
};

export default ContentManage;
