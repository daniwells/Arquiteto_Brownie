import styled, { css } from 'styled-components';
import { colors } from '@/styles/themes';
import breakpoints from '@/styles/breakpoints';

export const TotalPriceContainer = styled.div<{background?: string}>`
  text-align: center;
  color: ${colors.darkGray};
  min-width: 290px;
  width: 290px;
    
  ${(props) =>
    props.background &&
    css`
      @media ${breakpoints.md} {
        background-color: white;
        padding: 20px;
        border-radius: 10px;
      }
    `}
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  >Button{
    margin-top: 20px;
  }
`;

export const Span = styled.span`
  color: ${colors.blackGray};
  font-weight: 600;
  font-size: 18px;
`;
