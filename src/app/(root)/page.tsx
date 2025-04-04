"use client"

import MainContainer from "@/interface/containers/mobile/main-container/main";
import Search from "@/interface/components/mobile/search/main";
import Card from "@/interface/components/mobile/card/main";
import CardContainer from "@/interface/containers/mobile/card-container/main";
import Nav from "@/interface/components/mobile/nav/main";
// import { Main } from "next/document";
import Logo from "@/interface/components/mobile/logo/main";
import Menu from "@/interface/components/mobile/menu/main";
const Home = () => {
    return (
        <MainContainer>
            <Logo/>
            <Search />
            <Nav/>
            <CardContainer>
                <Card />
            </CardContainer>
            <Menu/>

        </MainContainer>
    );
}

export default Home;