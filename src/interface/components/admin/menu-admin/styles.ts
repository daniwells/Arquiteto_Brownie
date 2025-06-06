import styled from 'styled-components';
import Link from 'next/link';
import breakpoints from '@/styles/breakpoints';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;

  @media ${breakpoints.md}{
    gap: 100px;
  }
`;

export const PhoneIcon = styled(Link)`
  background-image: url('/svg/phone.svg');
  background-size: 100%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: all 0.3s ease-out;
  
  &:hover {
    width: 26px;
    height: 26px;
    opacity: 0.7;
  }
  
  @media ${breakpoints.md}{
    width: auto;
    background-image: None;
    background-size: None;
    font-size: 18px;

    &:hover {
      width: auto;
      height: 24px;
      opacity: 0.7;
    }
  }
`;

export const CutleryIcon = styled(Link)`
  background-image: url('/svg/cutlery.svg');
  background-size: 100%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: all 0.3s ease-out;

  &:hover {
    width: 26px;
    height: 26px;
    opacity: 0.7;
  }

  @media ${breakpoints.md}{
    width: auto;
    background-image: None;
    background-size: None;
    font-size: 18px;

    &:hover {
      width: auto;
      height: 24px;
      opacity: 0.7;
    }
  }
`;

export const CategoryIcon = styled(Link)`
  background-image: url('/svg/category.svg');
  background-size: 100%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: all 0.3s ease-out;

  &:hover {
    width: 26px;
    height: 26px;
    opacity: 0.7;
  }

  @media ${breakpoints.md}{
    width: auto;
    background-image: None;
    background-size: None;
    font-size: 18px;

    &:hover {
      width: auto;
      height: 24px;
      opacity: 0.7;
    }
  }
`;
