'use client';

import MainContainer from "@/interface/containers/mobile/main-container/main";
import Search from "@/interface/components/mobile/search/main";
import Card from "@/interface/components/mobile/card/main";
import CardContainer from "@/interface/containers/mobile/card-container/main";
import Nav from "@/interface/components/mobile/nav/main";
import Logo from "@/interface/components/mobile/logo/main";
import { productType } from "@/types";

interface menuProps {
    data: productType[]
}

const Menu: React.FC<menuProps> = ({ data }) => {
    console.log(data)
    return (
        <MainContainer>
            <Logo/>
            <Search />
            <Nav/>
            <CardContainer>
                {   
                    data.length && 
                        data.map((product) => (
                            <Card key={product.slug} product={product}  />
                        ))
                }
            </CardContainer>
        </MainContainer>
    );
}

export default Menu;