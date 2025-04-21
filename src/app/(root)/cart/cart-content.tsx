'use client'

// Libs
import { redirect } from "next/navigation";

// Components
import MainContainer from "@/interface/containers/mobile/global/main-container/main";
import Logo from "@/interface/components/mobile/logo/main";
import Menu from "@/interface/components/mobile/menu/main";
import CardContainer from "@/interface/containers/mobile/site/card-container/main";
import CartItem from "@/interface/components/mobile/cart-item/main";
import PrimaryButton from "@/interface/components/mobile/primary-button/main";
import Title from "@/interface/components/mobile/title/main";
import TotalPriceInfo from "@/interface/components/mobile/total-price-info/main";
import BackToMenu from "@/interface/components/mobile/back-to-menu/main";

// Utils
import { cartType } from "@/types";

interface cartContentProps {
    cart?: cartType
}

const CartContent: React.FC<cartContentProps> = ({ cart }) => {
    return (
        <>
            <MainContainer minHeight={!cart?.items ? '100vh' : undefined} >
                <Logo />
                <Title text="Carrinho" />
                {
                    cart && cart?.items?.length > 0 ? 
                        <>
                            <CardContainer>
                                {
                                    cart?.items.map((item) => (
                                        <CartItem product={item} key={item.slug}/>
                                    ))
                                }
                            </CardContainer>
                            <TotalPriceInfo totalPrice={cart.itemsPrice} date={new Date()} />
                            <PrimaryButton
                                value="Finalizar pedido"
                                handleClick={() => { redirect("/forms") }}
                            />
                        </>
                    :
                        <BackToMenu/>
                }

                <Menu />
            </MainContainer>
        </>
    );
};
export default CartContent;