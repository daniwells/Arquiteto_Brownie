import styled from "styled-components";
import Image from "next/image";
import breakpoints from "@/styles/breakpoints";
import { colors } from "@/styles/themes";

export const HeaderDesktopContainerStyle = styled.div`
    display: flex;
    gap: 30px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 60rem;

    @media (${breakpoints.lg}){
        gap: 60px;
    }
`

export const IconStyle = styled(Image)`
    width: 70px;

    @media (${breakpoints.lg}){
        width: 90px;
    }
`

export const IconStyleContainer = styled.div`
    background-color: white;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
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

export const DescAndReturn = styled.div`
    display: flex;
    gap: 40px;
    align-items: center;
`