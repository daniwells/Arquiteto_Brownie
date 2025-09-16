import styled from "styled-components";

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
        height: 5rem;
    }

    @media (${breakpoints.lg}){
        gap: 60px;
    }
`

export const IconStyleContainer = styled.div`
    background-color: white;
    min-width: 40px;
    min-height: 40px;

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

    @media ${breakpoints.md} {
        min-width: 50px;
        min-height: 50px;
    }
`

export const DescAndReturn = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`