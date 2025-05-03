import styled from "styled-components";
import { colors } from "@/styles/themes";

export const Background = styled.div`
    display: flex;
    flex-direction: column;
    height: 270px;
    width: 400px;
    border-radius: 20px;
    background-color: white;
    padding: 20px;
    grid-gap: 20px;
`

export const Image = styled.div`
    max-width: 200px;
    width: 50%;
    height: 150px;
    border-radius: 5px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    background-color: ${colors.gray};
`

export const AboutProduct = styled.div`
    display: flex;
    flex-direction: column;
    grid-gap: 10px;
    width: 50%;
    font-family: 'Comfortaa Regular';
    color: ${colors.darkGray};

    h3{ 
        font-size: 15px;
        color: ${colors.blackGray};
    }

    div{
        display: flex;
        flex-direction: row;
        gap: 5px;

        span{ 
            color: ${colors.blackGray};
            font-size: 15px;
            font-weight: bold;

        }
    }

`
export const Column = styled.div`
    display: flex;
    flex-direction: row;
`