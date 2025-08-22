import styled from "styled-components";
import breakpoints from "@/styles/breakpoints";

export const Banner = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #0055aa;
    color: white;
    padding: 16px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1000;
    font-size: 14px;

    p {
        margin: 0;
    }

    a {
        color: #ffd700;
        text-decoration: underline;
    }

    button {
        background: none;
        color: white;
        border: 1px solid white;
        padding: 4px 12px;
        cursor: pointer;
        border-radius: 4px;
    }
`

export const FloatingButton = styled.button`
    position: fixed;
    bottom: 10px;
    right: 10px;
    z-index: 999;
    background: #0055aa;
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    font-size: 14px;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    border: none;

    @media ${breakpoints.bs} {
        padding: 8px 16px;    
        width: auto;
        height: auto;
    }

    a {
        color: white;
        text-decoration: none;
    }
`