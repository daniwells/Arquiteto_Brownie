import styled from "styled-components";

export const OrderButtonsContainer = styled.div<{$width?: number}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: ${props => props?.$width ? props?.$width+"%" : "100%"} ;
    margin-top: 20px;
`

export const Row = styled.div`
    display: flex;
    align-items: start;
    gap: 10px;
    width: 100%;
    justify-content: center;
`