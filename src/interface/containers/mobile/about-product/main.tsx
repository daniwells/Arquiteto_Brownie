'use client'

import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Drawer } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import AddOrRemove from '@/interface/components/mobile/add-or-remove/main';
import ProductPrice from '@/interface/components/mobile/product-price/main';

import 'swiper/css';
import * as S from "./styles";

interface aboutProductProps {
  open: boolean;
  toggleDrawer: (open: boolean) => void;
}

const AboutProduct: React.FC<aboutProductProps> = ({open, toggleDrawer}) => {
  return (
    <>
      <Drawer
        anchor="bottom"
        open={open}
        onClose={() => toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            borderTopLeftRadius: '18px',
            borderTopRightRadius: '18px',
          },
        }}
      >
        
        <S.ContentAboutProduct>

        <Swiper 
          className="my-swiper"
          spaceBetween={20}
          slidesPerView={3}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide><img src="/images/sample-products/p1-1.jpg" alt=""/></SwiperSlide>
          <SwiperSlide><img src="/images/sample-products/p1-2.jpg" alt=""/></SwiperSlide>
          <SwiperSlide><img src="/images/sample-products/p1-1.jpg" alt=""/></SwiperSlide>
          <SwiperSlide><img src="/images/sample-products/p1-2.jpg" alt=""/></SwiperSlide>
        </Swiper>

        <S.Product>
          <h3>Clássico</h3>
          <p>Brownie de massa normal</p>

          <div>
            <AddOrRemove/>
            <p>R$ 3,40</p>
          </div> 
        </S.Product>
          
          <Button 
            variant="contained" 
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => toggleDrawer(false)}
          >
            Enviar
          </Button>
        </S.ContentAboutProduct>
      </Drawer>
    </>
  );
}

export default AboutProduct;