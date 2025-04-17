import styled from "styled-components";
import { colors } from "@/styles/themes";
import Image from "next/image";


export const customImage = styled(Image)`
    margin: 20px;
`

export const MainLogin = styled.main`
    min-height: 100vh;
    background-color: ${colors.baseYellow};
    background-image: url("/images/background-signin.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    
`

export const ContentLogin = styled.div`
    background-color: white;
    position: fixed;
    bottom: 0;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    height: 70vh;
    min-height: 18rem;
    max-height: 26rem;
    
    width: 100%;
    >form{
        width: 100%;
    }
    border-radius: 20px 20px 0px 0px;
    
`