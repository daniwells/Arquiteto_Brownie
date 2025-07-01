import styled from "styled-components";
import breakpoints from "@/styles/breakpoints";

export const CardGridContainerStyle = styled.div`
    width: 100%;
    gap: 15px;
    display: grid;
    grid-template-columns: 1.5fr 1.5fr;
    max-height: 600px;
    padding-block: 10px;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-inline: 10px;
    
    @media (min-height: 600px) {
        min-height: 600px;
    }

    @media ${breakpoints.bg} {
        grid-template-columns: 1.5fr 1.5fr 1.5fr;        
    }
    
`