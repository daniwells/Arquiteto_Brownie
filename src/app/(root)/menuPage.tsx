'use client';

// libs
import { useState, useEffect } from 'react';

// components
import MainContainer from '@/interface/containers/global/main-container/main';
import Search from '@/interface/components/global/search/main';
import Card from '@/interface/components/site/card/main';
import CardContainer from '@/interface/containers/site/card-container/main';
import Nav from '@/interface/components/site/nav/main';
import Menu from '@/interface/components/site/menu/main';
import AboutProduct from '@/interface/containers/site/about-product-container/main';

// assets
import Logo from '@/interface/components/global/logo/main';

// types
import { productTypeImageString } from '@/types';

interface menuProps {
  data: productTypeImageString[];
}

const MenuPage: React.FC<menuProps> = ({ data }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [selectedCategory, setSelectedCategory] = useState('classico');

  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<productTypeImageString | null>(null);

  const toggleDrawer = (newOpen: boolean) => {
    setOpen(newOpen);
  };

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
    <>
      <AboutProduct open={open} toggleDrawer={toggleDrawer} product={currentProduct} />
      <MainContainer>
        <Logo />
        <Search value={searchText} handleChange={setSearchText} placeholder='Pesquisar por produto' />
        <Nav handleChange={setSelectedCategory} />
        <CardContainer>
          {filteredData.length > 0 &&
            filteredData.map((product) => (
              <Card
                key={product.slug}
                product={product}
                handleClick={() => {
                  toggleDrawer(true);
                  setCurrentProduct(product);
                }}
              />
            ))}
        </CardContainer>
        <Menu />
      </MainContainer>
    </>
  );
};

export default MenuPage;
