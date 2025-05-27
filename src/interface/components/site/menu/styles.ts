import styled from 'styled-components';
import Link from 'next/link';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  grid-gap: 40px;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
`;

export const HomeIconStyle = styled(Link)`
  background-image: url('/svg/home.svg');
  background-size: 100%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition:
    width 0.3s ease-out,
    height 0.3s ease-out,
    opacity 0.3s ease-out;

  &:hover {
    width: 26px;
    height: 26px;
    opacity: 0.8;
  }
`;

export const CartIconStyle = styled(Link)`
  background-image: url('/svg/cart.svg');
  background-size: 100%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition:
    width 0.3s ease-out,
    height 0.3s ease-out,
    opacity 0.3s ease-out;

  &:hover {
    width: 26px;
    height: 26px;
    opacity: 0.8;
  }
`;
