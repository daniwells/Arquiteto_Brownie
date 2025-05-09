import styled from 'styled-components';
import { colors } from '@/styles/themes';

interface primaryButtonStyleProps {
  $category?: string;
  $fontSize?: string;
}

export const PrimaryButtonStyle = styled.button<primaryButtonStyleProps>`
  background-color: ${(props) =>
    props.$category == 'dark'
    ? colors.lightBrown
    : props.$category == 'error'
    ? colors.red
    : props.$category == 'success'
    ? colors.green
    : props.$category == 'secondary' ?
    'transparent'
    : colors.beige};

  font-family: 'Comfortaa Bold';
  color: ${ props => props?.$category == 'secondary' ? colors.beige : 'white'};
  border-radius: 30px;
  box-shadow: none;
  width: 100%;
  border: ${ props => props?.$category == 'secondary' ? '1px solid'+colors.beige : 'none'};
  margin-block: 20px;
  padding: 14px;
  font-size: ${props => props?.$fontSize ? props?.$fontSize : '18px'};
  cursor: pointer;
  transition: all .5s ease-in-out;
  
  &:hover {
    box-shadow: none;
    background-color: ${(props) =>
      !(props.$category == 'error') && 
      !(props.$category == 'success') && 
      props.$category == 'secondary' ? colors.beige : colors.lightBrown
    };
    color: white;
  }
`;
