import styled from "styled-components";

export const OrderButtonsContainerStyle = styled.div<{$width?: number}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: ${props => props?.$width ? props?.$width+"%" : "100%"} ;
`