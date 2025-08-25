import styled from 'styled-components';
import Link from 'next/link';
import { colors } from '@/styles/themes';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: ${colors.gray};
  padding-block: 20px;
`;

export const HomeIconStyle = styled(Link)`
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition:
    width 0.3s ease-out,
    height 0.3s ease-out,
    opacity 0.3s ease-out;

  &:hover {
    color: ${colors.brown};
  }
`;

export const CartIconStyle = styled(Link)`
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition:
    width 0.3s ease-out,
    height 0.3s ease-out,
    opacity 0.3s ease-out;

  &:hover {
    color: ${colors.brown};
  }
`;
