import styled from 'styled-components';
import { colors } from '@/styles/themes';

export const InputImage = styled.input`
  display: none;
`;

export const InputContainer = styled.label`
  display: flex;
  border: 1px solid ${colors.lightGray};
  border-radius: 30px;
  gap: 30px;
  width: 100%;
  height: 100px;
  padding: 20px;
  cursor: pointer;
  background-color: white;

  p {
    font-size: 18px;
    opacity: 60%;
    cursor: pointer;
  }
`;
