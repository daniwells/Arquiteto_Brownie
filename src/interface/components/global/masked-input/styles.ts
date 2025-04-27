import styled from 'styled-components';
import { IMaskInput } from 'react-imask';
import { colors } from '@/styles/themes';

export const InputContainer = styled.label`
  display: flex;
  border: 1px solid ${colors.lightGray};
  border-radius: 200px;
  padding-inline: 20px;
  gap: 15px;
  align-items: center;
  width: 100%;
  background-color: white;
`;

export const MaskedInputStyle = styled(IMaskInput)`
  border: 0px solid transparent;
  background-color: transparent;
  width: 100%;
  height: 100%;
  padding: 15px;
  outline: none;
  font-size: 18px;
`;
