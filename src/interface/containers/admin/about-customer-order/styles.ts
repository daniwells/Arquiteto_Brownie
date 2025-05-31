import styled from 'styled-components';
import { colors } from '@/styles/themes';
import breakpoints from '@/styles/breakpoints';

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: start;
  min-width: 150px;
`;

export const AboutCustomerOrderContainer = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Comfortaa Regular';
  color: ${colors.darkGray};
  width: 100%;

  > div {
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 15px;
  }
  > p {
    display: flex;
    align-items: center;
    font-size: 12px;
    gap: 10px;
    justify-self: start;
    position: relative;
  }

  @media ${breakpoints.md} {
    p {
      font-size: 16px;
    }
  }
`;

export const ToolTip = styled.span`
  padding: 0.25rem 0.75rem;
  margin: 0.75px;
  font-size: 12px;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

  position: absolute;
  z-index: 1;
  left: 50%;
  top: -180%;

  opacity: 0;
`;

export const ToolTipContainer = styled.div`
  position: relative;

  :hover ${ToolTip} {
    opacity: 1;
  }
`;
