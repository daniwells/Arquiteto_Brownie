'use client';

// Style
import * as S from "./styles";
import 'swiper/css';

// Libs
import React, { useState } from 'react';
import Image from 'next/image';
import { Drawer } from '@mui/material';
import { SwiperSlide } from 'swiper/react';

// Components
import AddOrRemove from '@/interface/components/mobile/add-or-remove/main';
import PrimaryButton from "@/interface/components/mobile/primary-button/main";
import ProductPrice from "@/interface/components/mobile/product-price/main";

// Utils
import { productType } from "@/types";

// Actions
import { addItemToCart } from "@/lib/actions/cart.actions";

interface AboutProductProps {
  open: boolean;
  toggleDrawer: (open: boolean) => void;
  product: null | productType;
}

const AboutProduct: React.FC<AboutProductProps> = ({open, toggleDrawer, product}) => {
    const [qty, setQty] = useState<number>(1);

    const handleGetItemsCart = async () => {
        if(product){
            await addItemToCart({...product, qty: qty});
        }
    }

    const handleQuantity = (newQty: number) => {
        setQty(newQty);
    }

    const handleToggle = () => {
        setQty(1);
        toggleDrawer(false);
    }

    return (
        <>
            <Drawer
                anchor="bottom"
                open={open}
                onClose={handleToggle}
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
                        slidesPerView={product?.images?.length && product?.images?.length > 2 ? 2.5 : 2}
                    >
                        {product?.images.map((imagePath, key) => (
                            <SwiperSlide key={key}>
                                <Image src={imagePath} alt={`Produto ${key}`} width={80} height={80}/>
                            </SwiperSlide>
                        )) || false}
                    </S.CustomSwiper>

                    <S.Product>
                        <S.ContainerDesc>
                            <h3>{product?.name}</h3>
                            <p>{product?.description}</p>
                        </S.ContainerDesc>

                        <S.Row>
                            <AddOrRemove quantity={qty} handleQuantity={handleQuantity} />
                            <ProductPrice value={String(Number(product?.price)*qty || 0)} />
                        </S.Row> 
                    </S.Product>
                    
                    
                    <PrimaryButton 
                        value="Adicionar ao carrinho"
                        handleClick={handleGetItemsCart}
                    />
                </S.ContentAboutProduct>
            </Drawer>
        </>
    );
}

export default AboutProduct;