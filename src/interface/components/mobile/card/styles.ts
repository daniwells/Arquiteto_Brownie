import styled from "styled-components";
import { colors } from "@/styles/themes";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    height: 300px;
`

interface imageProps {
    url: string
}

export const Image = styled.div<imageProps>`
    max-width: 200px;
    width: 45%;
    height: 150px;
    ${
        props => props?.url ? 
            `background-image: url(${props?.url});`
        :
            `background-color: ${colors.lightBrown};`
    };
    border-radius: 5px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
`

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    justify-content: space-between;
    width: 50%;
    
    h1{
        margin-bottom: 5px;
    }

    h1, span{
        font-size: 16px;
    }

    p{
        font-size: 16px;
        font-family: 'Comfortaa Bold'
    }
`