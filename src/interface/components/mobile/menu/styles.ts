import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    grid-gap: 40px;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;

`

export const HomeIcon = styled.div`
    background-image: url("/svg/home.svg");
    background-size: 100%;
    width: 24px;
    height: 24px;
    cursor: pointer;
    transition: width 0.4s ease-in-out, height 0.4s ease-in-out, opacity 0.3s ease-out;

    &:hover {
        width: 28px;
        height: 28px;
        opacity: 0.8;
    } 

`

export const CartIcon = styled.div`
 background-image: url("/svg/cart.svg");
    background-size: 100%;
    width: 24px;
    height: 24px;
    cursor: pointer;
    transition: width 0.4s ease-in-out, height 0.4s ease-in-out, opacity 0.3s ease-out;

    &:hover {
        width: 28px;
        height: 28px;
        opacity: 0.8;
    } 
`