import styled from "styled-components";
import { colors } from "@/styles/themes";

export const Background = styled.div`
    background-color: ${colors.grey};
    width: 100%;
    height: 100vh;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    grid-gap: 20px;
    min-height: 30rem;
`