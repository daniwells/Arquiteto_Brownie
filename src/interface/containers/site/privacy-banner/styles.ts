import styled from "styled-components";
import breakpoints from "@/styles/breakpoints";
import Link from "next/link";

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

export const FloatingButton = styled(Link)`
    position: fixed;
    bottom: 10px;
    right: 10px;
    z-index: 999;
    background: #0055aa;
    color: white;
    width: 40px;
    height: 40px;
    font-size: 14px;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    border: none;
    border-radius: 20px;
    cursor: pointer;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;

    @media ${breakpoints.bs} {
        padding: 8px 16px;    
        width: auto;
        height: auto;
    }
`