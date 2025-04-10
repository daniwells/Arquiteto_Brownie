import styled from "styled-components";
import { colors } from "@/styles/themes";

export const PrimaryButtonStyle = styled.button`
    font-family: 'Comfortaa Bold';
    background-color: ${colors.beige};
    color: white;
    border-radius: 30px;
    box-shadow: none;

    &:hover{
        box-shadow: none;
    }
    width: 100%;
    border: none;
    margin-block: 20px;
    padding: 14px;
    font-size: 18px;
`
    
  