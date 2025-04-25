import styled from "styled-components";
import { colors } from "@/styles/themes";

interface primaryButtonStyleProps {
    $category?: string,
}

export const PrimaryButtonStyle = styled.button<primaryButtonStyleProps>`
    font-family: 'Comfortaa Bold';
    background-color: ${props => 
            props.$category == "dark" ? colors.lightBrown : 
            props.$category == "error" ? colors.red :   
            props.$category == "success" ? colors.green :
            colors.beige
        };
    color: white;
    border-radius: 30px;
    box-shadow: none;

    &:hover{
        box-shadow: none;
        background-color: ${props => 
            !(props.$category == "error") && 
            !(props.$category == "success") && 
            colors.lightBrown
        };
    }
    width: 100%;
    border: none;
    margin-block: 20px;
    padding: 14px;
    font-size: 18px;
    cursor: pointer;
`
    
  