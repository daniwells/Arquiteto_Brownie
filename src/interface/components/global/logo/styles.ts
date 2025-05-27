import styled from 'styled-components';
import breakpoints from '@/styles/breakpoints';

export const BackgroundLogo = styled.img`
  margin-block: 20px;
  width: 6rem;

  @media (${breakpoints.xs}) {
    width: 8rem;
  }
`;
