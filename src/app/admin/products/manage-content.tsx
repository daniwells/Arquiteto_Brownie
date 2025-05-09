'use client';

import React, { useEffect } from 'react'

import MainContainer from '@/interface/containers/global/main-container/main'
import Title from '@/interface/components/global/title/main'
import HeaderAdmin from '@/interface/components/admin/header-admin/main';
import CardManage from '@/interface/components/admin/card-manage/main';
import PrimaryButton from '@/interface/components/global/primary-button/main';
import MenuAdmin from '@/interface/components/admin/menu-admin/main';
import Search from '@/interface/components/global/search/main';
import { redirect } from 'next/navigation';
import CardContainer from '@/interface/containers/site/card-container/main';
import { useState } from 'react';
import { productTypeImageString } from '@/types';

interface contentManageProps {
  data: productTypeImageString[];
}

const ContentManage: React.FC<contentManageProps> = ({ data }) => {
  const [filteredData, setFilteredData] = useState(data);

  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleFilterProduct = () => {
    setFilteredData(
      data
        .filter((product) => {
          if (searchText === '') return true;

          return (
            !searchText.trim() ||
            [
              product.name?.toString(),
              product.category?.toLowerCase(),
              product.description?.toString(),
              product.price?.toString(),
            ].some((field) => field?.toLowerCase().includes(searchText.toLowerCase()))
          );
        })
        .filter((product) => {
          if (selectedCategory === '') return true;

          return product.category?.toLowerCase() === selectedCategory.toLowerCase();
        }),
    );
  };

  useEffect(() => {
      handleFilterProduct();
  }, [searchText, selectedCategory]);

  return (
    <MainContainer>
      <HeaderAdmin/>
      <Title text= "Gerenciar produtos"/>
      <Search value={searchText} handleChange={setSearchText} placeholder='Pesquisar por produto'/>
      <PrimaryButton
        category="normal"
        type="submit"
        handleClick={() => {redirect("/admin/products/create")}}
        value="Criar novo produto"
      />
      <CardContainer height='18rem' >
           {filteredData.length > 0 &&
            filteredData.map((product) => (
              <CardManage
                key={product.slug}
                product={product}
              />
          ))}
      </CardContainer>
      <MenuAdmin/>
    </MainContainer>
  )
}

export default ContentManage
