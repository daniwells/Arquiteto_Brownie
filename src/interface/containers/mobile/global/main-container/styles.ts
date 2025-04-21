import styled from "styled-components";
import { colors } from "@/styles/themes";

interface backgroundProps {
    $minheight?: string;
}

export const Background = styled.main<backgroundProps>`
    background-color: ${colors.grey};
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    grid-gap: 20px;
    min-height: ${props => props.$minheight ? props.$minheight : '34rem'};
`