import styled from "styled-components";
import { colors } from "@/styles/themes";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
`

export const Image = styled.div`
    max-width: 200px;
    width: 180px;
    height: 160px;
    background-color: ${colors.lightBrown};
    border-radius: 5px;
`

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    justify-content: space-between;
    
    h1, span{
        font-size: 16px;
    }

    p{
        font-size: 16px;
        font-family: 'Comfortaa Bold'
    }
`