'use client'

// Style
import * as S from "./styles";
import 'swiper/css';

// Libs
import React from 'react';
import Image from 'next/image';
import { Drawer } from '@mui/material';
import { SwiperSlide } from 'swiper/react';

// Components
import AddOrRemove from '@/interface/components/mobile/add-or-remove/main';
import PrimaryButton from "@/interface/components/mobile/primary-button/main";

// Utils
import { formatNumberWithDecimal, formatCurrency } from "@/lib/utils";

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

        <S.CustomSwiper 
          className="my-swiper"
          spaceBetween={5}
          slidesPerView={2.5}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide>
            <Image src="/images/sample-products/p1-1.jpg" alt="" width={80} height={80}/>
          </SwiperSlide>
          <SwiperSlide>
            <Image src="/images/sample-products/p1-2.jpg" alt="" width={80} height={80}/>
          </SwiperSlide>
          <SwiperSlide>
            <Image src="/images/sample-products/p1-1.jpg" alt="" width={80} height={80}/>
          </SwiperSlide>
          <SwiperSlide>
            <Image src="/images/sample-products/p1-2.jpg" alt="" width={80} height={80}/>
          </SwiperSlide>
        </S.CustomSwiper>

        <S.Product>
          <S.ContainerDesc>
            <h3>Clássico</h3>
            <p>Brownie de massa normal</p>
          </S.ContainerDesc>

          <S.Row>
            <AddOrRemove/>
            <p>{formatCurrency(3.40)}</p>
          </S.Row> 
        </S.Product>
          
          
          <PrimaryButton 
            value="Adicionar ao carrinho"
            handleClick={() => toggleDrawer(false)}
          />
        </S.ContentAboutProduct>
      </Drawer>
    </>
  );
}

export default AboutProduct;