import styled from 'styled-components';
import { colors } from '@/styles/themes';

export const Wrapper = styled.label`
  display: flex;
  align-items: center;
  background-color: white;
  height: 50px;
  border-radius: 50px;
  width: 100%;
  border: solid 1px transparent;
  padding-block: 10px;
  padding-inline: 20px;
  cursor: text;
  transition:
    border 0.3s ease-out,
    transform 0.3s ease-out;

  &:hover {
    border: solid 1px ${colors.darkGray};
    transform: scale(1.01);
  }
  
  &:focus-within {
    border: solid 1px ${colors.darkGray};
    transform: scale(1.01);
  }
  
`;

export const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  background: transparent;
`;

export const Icon = styled.img`
  width: 20px;
  height: 20px;
`;
