import styled from 'styled-components';
import Link from 'next/link';
import breakpoints from '@/styles/breakpoints';
import { colors } from '@/styles/themes';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  background-color: ${colors.gray};
  padding-block: 40px;

  @media ${breakpoints.md}{
    gap: 100px;
  }
`;

export const PhoneIcon = styled(Link)`
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: all 0.3s ease-out;
  
  &:hover {
    color: ${colors.brown};
  }
  
  @media ${breakpoints.md}{
    width: auto;
    background-image: None;
    background-size: None;
    font-size: 18px;
  }
`;

export const CutleryIcon = styled(Link)`
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: all 0.3s ease-out;

  &:hover {
    color: ${colors.brown};
  }

  @media ${breakpoints.md}{
    width: auto;
    background-image: None;
    background-size: None;
    font-size: 18px;
  }
`;

export const CategoryIcon = styled(Link)`
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: all 0.3s ease-out;

  &:hover {
    color: ${colors.brown};
  }

  @media ${breakpoints.md}{
    width: auto;
    background-image: None;
    background-size: None;
    font-size: 18px;
  }
`;
