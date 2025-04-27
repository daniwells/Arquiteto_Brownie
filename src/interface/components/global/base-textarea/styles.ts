import styled from 'styled-components';
import { colors } from '@/styles/themes';

export const TextareaStyle = styled.textarea`
  border: 0px solid transparent;
  background-color: transparent;
  width: 100%;
  height: 100%;
  outline: none;
  font-size: 20px;
  resize: none;
`;

export const FieldContainer = styled.label`
  display: flex;
  border: 1px solid ${colors.lightGray};
  border-radius: 30px;
  gap: 30px;
  width: 100%;
  height: 100px;
  padding: 20px;
  background-color: white;
`;
