'use client';

// libs
import { useState, useEffect } from "react";

// components
import MainContainer from "@/interface/containers/mobile/main-container/main";
import Search from "@/interface/components/mobile/search/main";
import Card from "@/interface/components/mobile/card/main";
import CardContainer from "@/interface/containers/mobile/card-container/main";
import Nav from "@/interface/components/mobile/nav/main";

// assets
import Logo from "@/interface/components/mobile/logo/main";

// types
import { productType } from "@/types";

interface menuProps {
    data: productType[]
}

const Menu: React.FC<menuProps> = ({ data }) => {
    const [ searchText, setSearchText ] = useState("");
    const [ filteredData, setFilteredData ] = useState(data);
    const [ selectedCategory, setSelectedCategory ] = useState("classico");
    
    const handleFilterProduct = () => {
        setFilteredData(
            data.filter(product => {
                    if(searchText === "") return true;

                    return !searchText.trim() || 
                        [   
                            product.name?.toString(),
                            product.category?.toLowerCase(),
                            product.description?.toString(),
                            product.price?.toString(),
                        ].some(field => 
                            field?.toLowerCase().includes(searchText.toLowerCase())
                        )
                }
            ).filter(
                product => {
                    if(selectedCategory === "") return true;

                    return product.category?.toLowerCase() === selectedCategory.toLowerCase()
                }
            )
        );
    }

    useEffect(() => {
        handleFilterProduct();
    }, [searchText, selectedCategory]);


    return (
        <MainContainer>
            <Logo/>
            <Search value={searchText} handleChange={setSearchText}/>
            <Nav handleChange={setSelectedCategory} />
            <CardContainer>
                {   
                    filteredData.length > 0 && 
                        filteredData.map((product) => (
                            <Card key={product.slug} product={product}  />
                        ))
                }
            </CardContainer>
        </MainContainer>
    );
}

export default Menu;