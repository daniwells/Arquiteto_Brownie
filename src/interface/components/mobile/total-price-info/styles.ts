import styled from "styled-components";
import { colors } from "@/styles/themes";

export const TotalPriceContainer = styled.div`
    text-align: center;
    color: ${colors.darkGrey};
    margin-top: 20px;
`

export const Row = styled.div`
    display: flex;
    justify-content: space-between;
    width: 250px;
    font-size: 18px;
`

export const Span = styled.span`
    color: ${colors.blackGray};
    font-weight: 600;
    font-size: 18px;
`