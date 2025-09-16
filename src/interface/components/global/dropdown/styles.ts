import { colors } from '@/styles/themes';
import styled from 'styled-components';
import breakpoints from '@/styles/breakpoints';

import Image from 'next/image';

export const Icon = styled(Image)<{$rotate: boolean}>`
  width: 20px;
  rotate: ${props => props.$rotate ? "180deg" : "0deg"};
`;

interface DropdownContainerProps {
  'data-width'?: string | null;
}

export const DropdownContainer = styled.div<DropdownContainerProps>`
  position: relative;
  width: ${(props) => (props['data-width'] ? props['data-width'] : '240px')};
  min-width: 165px;
  max-width: 270px;
`;

export const DropdownHeader = styled.div`
  font-size: 16px;
  width: 100%;
  height: 48px;
  padding: 12px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const DropdownList = styled.ul`
  position: absolute;
  width: 100%;
  background: white;
  list-style: none;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  overflow: hidden;
  z-index: 1000;
`;

export const DropdownItem = styled.li`
  font-size: 16px;
  padding: 10px 16px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: ${colors.mediumGray};
    color: white;
  }
`;

interface ballProps {
  $color: string;
}

export const Ball = styled.div<ballProps>`
  width: 20px;
  height: 20px;
  background-color: ${(props) => (props.$color ? props.$color : colors.mediumGray)};
  border-radius: 50%;
`;
