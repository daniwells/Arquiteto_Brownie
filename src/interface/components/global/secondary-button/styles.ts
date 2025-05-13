import styled from 'styled-components';
import { colors } from '@/styles/themes';

export const SecondaryButtonStyle = styled.button`
  font-family: 'Comfortaa Bold';
  background-color: white;
  color: ${colors.beige};
  border-radius: 30px;
  box-shadow: none;
  border: solid 1px ${colors.beige};

  &:hover {
    box-shadow: none;
    background-color: ${colors.beige};
    color: white;
  }
  width: 100%;
  padding: 14px;
  font-size: 15px;
  cursor: pointer;
`;
