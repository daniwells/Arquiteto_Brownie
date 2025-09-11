'use client';

// Style
import * as S from './styles';
import 'swiper/css';

// Libs
import React, { useState } from 'react';
import Image from 'next/image';
import { Drawer } from '@mui/material';
import { SwiperSlide } from 'swiper/react';
import useMediaQuery from '@mui/material/useMediaQuery';

// Components
import AddOrRemove from '@/interface/components/global/add-or-remove/main';
import PrimaryButton from '@/interface/components/global/primary-button/main';
import ProductPrice from '@/interface/components/global/product-price/main';
import HeaderDesktopContainer from '../../global/header-desktop-container/main';
import ProductGallery from '@/interface/components/global/product-gallery/main';

// Utils
import { productTypeImageString } from '@/types';

// Actions
import { addItemToCart } from '@/lib/actions/cart.actions';

// Contexts
import { usePopup } from '@/contexts/PopupContext';

// Images
import LogoDark from "../../../../../public/svg/logo-dark.svg";

interface AboutProductProps {
  open: boolean;
  toggleDrawer: (open: boolean) => void;
  product: null | productTypeImageString;
}

const AboutProduct: React.FC<AboutProductProps> = ({ open, toggleDrawer, product }) => {
  const size_630 = useMediaQuery('(min-width:630px)');

  const [qty, setQty] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const { openPopup } = usePopup();

  const handleAddItemsCart = async () => {
    if (product) {
      setLoading(true);
      const response = await addItemToCart({ ...product, qty: qty });
      setLoading(false);

      if (!response?.success) {
        const message = response.message ? await response.message : '';
        openPopup(message, 'error');
      }else{
        openPopup("Produto adicionado ao carrinho", 'success');
      }

    }
  };

  const handleQuantity = (newQty: number) => {
    setQty(newQty);
  };

  const handleToggle = () => {
    setQty(1);
    toggleDrawer(false);
  };

  return <Drawer
      anchor="bottom"
      open={open}
      onClose={handleToggle}
      sx={{
        '& .MuiDrawer-paper': {
          borderTopLeftRadius: size_630 ? '0px' : '18px',
          borderTopRightRadius: size_630 ? '0px' : '18px',
          height: size_630 ? '100vh' : 'auto',
        },
      }}
    > 
      <S.AboutProductContainerStyle>
        {
          size_630 && <HeaderDesktopContainer logoPosition="start" handleReturn={handleToggle} hasReturn/>
        }
        <S.MainAboutProduct>
          {
            size_630 ?
              <ProductGallery images={product?.images || []}/>
            :
              <S.CustomSwiper
                className="my-swiper"
                spaceBetween={5}
                slidesPerView={product?.images?.length && product?.images?.length > 2 ? 2.5 : 2}
              >
                {product?.images.map((imagePath, key) => (
                  <SwiperSlide key={key}>
                    <Image src={imagePath} alt={`Produto ${key}`} width={80} height={80} />
                  </SwiperSlide>
                )) || false}
                {
                  
                  product?.images.length == 1 &&
                    <SwiperSlide>
                      <S.LogoDarkContainer>
                        <Image src={LogoDark} alt="Logo" style={{ width: "80px", height: "80px" }} />
                      </S.LogoDarkContainer>
                    </SwiperSlide>
                }
              </S.CustomSwiper>
          }
          <S.AboutColumn>
            <S.Product>
              <S.ContainerDesc>
                <h3>{product?.name}</h3>
                <p>{product?.description}</p>
              </S.ContainerDesc>

              <S.AboutProductContent>
                <AddOrRemove quantity={qty} handleQuantity={handleQuantity} />
                <S.PriceAndFreight>
                  <ProductPrice value={String(Number(product?.price) * qty || 0)} />
                  <S.Freight>+ Frete</S.Freight>
                </S.PriceAndFreight>
              </S.AboutProductContent>

              <PrimaryButton
                loading={loading}
                value="Adicionar ao carrinho"
                handleClick={handleAddItemsCart}
              />
            </S.Product>
          </S.AboutColumn>
        </S.MainAboutProduct>
      </S.AboutProductContainerStyle>
    </Drawer>
   
};

export default AboutProduct;
