import styled from 'styled-components';
import { colors } from '@/styles/themes';
import breakpoints from '@/styles/breakpoints';

export const TitleStyle = styled.h1`
  font-family: 'Pacifico Regular';
  color: ${colors.darkBrown};
  font-size: 32px;
  
  @media ${breakpoints.md} {
    font-size: 38px;
  }
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: left;
`;
