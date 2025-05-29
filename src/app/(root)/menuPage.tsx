'use client';

// libs
import { useState, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SwiperSlide } from 'swiper/react';

// components
import MainContainer from '@/interface/containers/global/main-container/main';
import Search from '@/interface/components/global/search/main';
import Card from '@/interface/components/site/card/main';
import CardContainer from '@/interface/containers/global/card-container/main';
import NavCategories from '@/interface/components/site/nav-categories/main';
import Menu from '@/interface/components/site/menu/main';
import AboutProduct from '@/interface/containers/site/about-product-container/main';
import HeaderDesktopContainer from '@/interface/containers/site/header-desktop-container/main';
import CardDesktopContainer from '@/interface/containers/global/card-desktop-container/main';
import CardProductDesktop from '@/interface/components/site/card-product-desktop/main';

// assets
import Logo from '@/interface/components/global/logo/main';

// types
import { productTypeImageString } from '@/types';

interface menuProps {
  data: productTypeImageString[];
  categories: { name: string; value: string }[];
}

const MenuPage: React.FC<menuProps> = ({ data, categories }) => {
  const size_768 = useMediaQuery('(min-width:768px)');

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [selectedCategory, setSelectedCategory] = useState('');

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
        })
        .filter((product) => {
          return product.active;
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
        {
          size_768 ?
            <HeaderDesktopContainer
              value={searchText}
              handleChange={setSearchText}
              placeholder="Pesquisar por produto"
              hasSearch
              hasCart
            />
          :
            <>
              <Logo/>
              <Search
                id="menuSearch"
                value={searchText}
                handleChange={setSearchText}
                placeholder="Pesquisar por produto"
              />
            </>
        }
        <NavCategories navItems={categories} handleChange={setSelectedCategory} />
        {
          size_768 ?
            <CardDesktopContainer>
              {filteredData.length > 0 &&
                filteredData.map((product) => (
                  <SwiperSlide key={product.slug}>
                    <CardProductDesktop
                      product={product}
                      handleClick={() => {
                        toggleDrawer(true);
                        setCurrentProduct(product);
                      }}
                    />
                  </SwiperSlide>
                ))
              }
            </CardDesktopContainer>
          :
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
                ))
              }
            </CardContainer>
        }
        {
          size_768 ? 
            <></> 
          :
            <Menu/>
        }
        
      </MainContainer>
    </>
  );
};

export default MenuPage;
