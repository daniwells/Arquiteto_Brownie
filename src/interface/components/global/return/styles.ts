import styled from 'styled-components';
import Image from 'next/image';
import { colors } from '@/styles/themes';
import breakpoints from '@/styles/breakpoints';

export const HeaderContainerSite = styled.div`
  width: 100%;

  a{
    background-color: white;
    width: 40px;
    height: 40px;

    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;

    transition:
        border 0.3s ease-out,
        transform 0.3s ease-out;
    
    &:hover {
        border: solid 1px ${colors.darkGray};
        transform: scale(1.05);
    }

    @media ${breakpoints.md} {
        min-width: 50px;
        min-height: 50px;
    }
  }
`;

export const BackIcon = styled(Image)`
  width: 20px;
  height: 20px;
`;