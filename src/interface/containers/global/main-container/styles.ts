import styled from 'styled-components';
import { colors } from '@/styles/themes';
import breakpoints from '@/styles/breakpoints';

interface backgroundProps {
  $minheight?: string;
}

export const BackgroundMainContainer = styled.main<backgroundProps>`
  background-color: ${colors.gray};
  width: 100%;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  grid-gap: 20px;
  min-height: ${(props) => (props.$minheight ? props.$minheight : '34rem')};
  max-width: 70rem;

  @media ${breakpoints.xs} {
    min-height: 100vh;
    padding: 20px;
  }

  @media ${breakpoints.sm} {
    padding: 30px;
  }

  @media ${breakpoints.md} {
    padding: 40px;
  }

  @media ${breakpoints.lg} {
    padding-inline: 80px;
  }
`;
