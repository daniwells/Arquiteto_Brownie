'use client';

// Styles
import { colors } from '@/styles/themes';

// Libs
import React, { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import useMediaQuery from '@mui/material/useMediaQuery';

// Components
import MainContainer from '@/interface/containers/global/main-container/main';
import Title from '@/interface/components/global/title/main';
import HeaderAdmin from '@/interface/components/admin/header-admin/main';
import CardManage from '@/interface/components/admin/card-manage/main';
import PrimaryButton from '@/interface/components/global/primary-button/main';
import MenuAdmin from '@/interface/components/admin/menu-admin/main';
import Search from '@/interface/components/global/search/main';
import CardContainer from '@/interface/containers/global/card-container/main';
import Dropdown from '@/interface/components/global/dropdown/main';
import HeaderDesktopContainer from '@/interface/containers/site/header-desktop-container/main';
import RowContainer from '@/interface/containers/global/row-container/main';
import CardGridContainer from '@/interface/containers/admin/card-grid-container/main';
import BackToMenu from '@/interface/components/site/back-to-menu/main';

// Utils
import { productTypeImageString } from '@/types';

interface contentManageProps {
  data: productTypeImageString[];
  categories: string[];
}

const ContentManage: React.FC<contentManageProps> = ({ data, categories }) => {
  const size_768 = useMediaQuery('(min-width:768px)');

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
      {
        size_768 ?
          <>
            <HeaderDesktopContainer
              value={searchText}
              handleChange={setSearchText}
              hasSearch
              placeholder="Pesquisar por produto"
              filter={
                <Dropdown
                  colorBall={colors.mediumGray}
                  options={[
                    { value: 'Todos', label: 'Todos' },
                    ...categories.map((value: string) => ({ value, label: value })),
                  ]}
                  selectedOption={category}
                  setSelectedOption={(value: string) => setCategory(value)}
                  width={`${category.length + 400}px`}
                />
              }
            />
            <RowContainer>
              <Title text="Gerenciar produtos" />
              <PrimaryButton
                category="normal"
                type="submit"
                handleClick={() => {
                  redirect('/admin/products/create');
                }}
                value="Criar novo produto"
              />
            </RowContainer>
              {
                filteredData.length > 0 ?
                  <CardGridContainer>
                    {filteredData.map((product) => <CardManage key={product.slug} product={product} />)}
                  </CardGridContainer>
                :
                  <BackToMenu text="Nenhum produto encontrado..."/>
              }
          </>    
        :
          <>
            <HeaderAdmin />
            <Title text="Gerenciar produtos" />
            <Search 
              id="search-products"
              value={searchText}
              handleChange={setSearchText}
              placeholder="Pesquisar por produto"
            />
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
            { 
              filteredData.length > 0 ?
                <CardContainer height="18rem">
                  {
                    filteredData.map((product) => <CardManage key={product.slug} product={product} />)
                  }
                </CardContainer>
              :
                <BackToMenu text="Nenhum produto encontrado..."/>
            }
          </>
      }
      <MenuAdmin />
    </MainContainer>
  );
};

export default ContentManage;
