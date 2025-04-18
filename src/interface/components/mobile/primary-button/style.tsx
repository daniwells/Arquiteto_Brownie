import styled from "styled-components";
import { colors } from "@/styles/themes";

interface primaryButtonStyleProps {
    $issecondary?: boolean,
}

export const PrimaryButtonStyle = styled.button<primaryButtonStyleProps>`
    font-family: 'Comfortaa Bold';
    background-color: ${props => props.$issecondary ? colors.lightBrown : colors.beige};
    color: white;
    border-radius: 30px;
    box-shadow: none;

    &:hover{
        box-shadow: none;
        background-color: ${colors.lightBrown};
    }
    width: 100%;
    border: none;
    margin-block: 20px;
    padding: 14px;
    font-size: 18px;
    cursor: pointer;
`
    
  