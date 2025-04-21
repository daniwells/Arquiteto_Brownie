import styled from "styled-components"

export const RemoveIcon = styled.div`
    background-image: url("/svg/remove.svg");
    background-size: 100%;
    width: 20px;
    height: 20px;
    cursor: pointer;
    transition: width 0.3s ease-out, height 0.3s ease-out, opacity 0.3s ease-out;

    &:hover {
        width: 26px;
        height: 26px;
        opacity: 0.8;
    }
`