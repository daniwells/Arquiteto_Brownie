import { colors } from '@/styles/themes';
import styled from 'styled-components';

export const DropdownContainer = styled.div`
  position: relative;
`;

export const DropdownHeader = styled.div`
  height: 48px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const IconTrigger = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.05);
  
  &:hover{
    background-color: rgba(0, 0, 0, 0.02);
  }
`

export const DropdownList = styled.ul`
  position: absolute;
  width: 220px;
  background: white;
  list-style: none;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  overflow: hidden;
  z-index: 1000;
  right: 0;
  
  >div{
    font-size: 14px;
    padding: 10px 16px;
    cursor: pointer;
    opacity: 50%;

  }
`;

export const DropdownItem = styled.li<{$isred?: boolean}>`
  font-size: 16px;
  padding: 10px 16px;
  cursor: pointer;
  transition: background 0.3s;
  color: ${ props => props.$isred ? colors.red : "black" };

  &:hover {
    background-color: ${ props => props.$isred ? colors.red : colors.mediumGray};
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
