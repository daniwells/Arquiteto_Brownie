import styled from 'styled-components';
import { colors } from '@/styles/themes';
import breakpoints from '@/styles/breakpoints';

interface backgroundProps {
  $minheight?: string;
  $isBottomMenu?: boolean;
}

export const BackgroundMainContainer = styled.main<backgroundProps>`
  background-color: ${colors.gray};
  width: 100%;
  padding: 5px 5px ${props => props.$isBottomMenu ? '100px' : '5px'} 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  min-height: ${(props) => (props.$minheight ? props.$minheight : '34rem')};
  max-width: 70rem;

  @media ${breakpoints.xs} {
    min-height: 100vh;
    padding: 10px 20px ${props => props.$isBottomMenu ? '100px' : '10px'} 20px;
  }

  @media ${breakpoints.sm} {
    padding-inline: 30px;
  }

  @media ${breakpoints.md} {
    padding-inline: 40px;
  }

  @media ${breakpoints.lg} {
    padding-inline: 80px;
  }
`;
