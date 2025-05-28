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

    @media (${breakpoints.md}){
        gap: 80px;
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