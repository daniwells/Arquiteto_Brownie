import styled from "styled-components";
import { colors } from "@/styles/themes";

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    background-color: white;
    height: 50px;
    border-radius: 50px;
    width: 100%;
    border: solid 1px transparent; 
    padding: 10px;
    transition: border 0.3s ease-out, transform 0.3s ease-out;

    &:hover{
        border: solid 1px ${colors.darkerGrey};
        transform: scale(1.02);
    }
`;

export const Input = styled.input`
    flex: 1;
    border: none;
    outline: none;
    font-size: 16px;
    padding-left: 10px;
    background: transparent;
`;

export const Icon = styled.div`
    background-image: url("/svg/search.svg");
    background-size: 100%;
    width: 24px;
    height: 24px;
`;
