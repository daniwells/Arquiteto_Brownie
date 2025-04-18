'use client'

// libs
import { useState, useEffect } from "react";

import MainContainer from "@/interface/containers/mobile/global/main-container/main";
import Logo from "@/interface/components/mobile/logo/main";
import Menu from "@/interface/components/mobile/menu/main";
import CardContainer from "@/interface/containers/mobile/site/card-container/main";
import CartItem from "@/interface/components/mobile/cart-item/main";
import PrimaryButton from "@/interface/components/mobile/primary-button/main";
import Title from "@/interface/components/mobile/title/main";
import TotalPriceInfo from "@/interface/components/mobile/total-price-info/main";

const CartContent = () => {

    return (
        <>
            <MainContainer>
                <Logo />
                <Title text="Carrinho" />

                <CardContainer>
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                </CardContainer>
                <TotalPriceInfo totalPrice="0.00" date={new Date()} />
                <PrimaryButton
                    value="Finalizar pedido"
                    handleClick={() => { }}
                />
                <Menu />
            </MainContainer>
        </>
    );
};
export default CartContent;