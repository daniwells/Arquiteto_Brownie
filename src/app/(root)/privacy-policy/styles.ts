import styled from "styled-components";
import { colors } from "@/styles/themes";
import Image from "next/image";
import Link from "next/link";

export const Container = styled.div`
    position: relative;
`

export const Main = styled.main`
    max-width: 800px;
    margin: 40px auto;
    padding: 0 20px;
    font-family: 'Inter', sans-serif;
    color: #333;

    h1 {
        font-size: 2.5rem;
        text-align: center;
        
    }
    h3{
        font-size: 1.2rem;
        text-align: center;
        color: ${colors.beige};
        margin-bottom: 1.5rem;
    }
    h2 {
        font-size: 1.5rem;
        margin-top: 2rem;
        color: ${colors.beige};
    }
    p, ul {
        line-height: 1.7;
        font-size: 1rem;
        text-align: justify;
    }
    ul li {
        margin-bottom: 0.5rem;
    }
    li{
        
    }
    footer {
        margin-top: 3rem;
        font-size: 0.9rem;
        color: #666;
        border-top: 1px solid #ddd;
        padding-top: 1rem;
    }
`

export const IconStyle = styled(Image)`
    width: 90px;
`

export const IconStyleContainer = styled.div`
    background-color: white;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;

    transition:
        border 0.3s ease-out,
        transform 0.3s ease-out;
    
    &:hover {
        border: solid 1px ${colors.darkGray};
        transform: scale(1.05);
    }
`

export const Return = styled(Link)`
    width: 100vw;
    padding: 20px;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 20px;
    cursor: pointer;
    >label{
        cursor: pointer;
    }

    &:hover {
        ${IconStyleContainer}{
            border: solid 1px ${colors.darkGray};
            transform: scale(1.05);
        }
    }
`



