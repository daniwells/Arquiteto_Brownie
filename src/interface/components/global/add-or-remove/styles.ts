import styled from 'styled-components';
import { colors } from '@/styles/themes';

export const CounterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  width: fit-content;
`;

export const ButtonBackground = styled.button`
  background-color: ${colors.darkBrown};
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  cursor: pointer;
  transition: 0.2s ease;

  &:disabled {
    border: 1px solid ${colors.darkBrown};
    color: ${colors.darkBrown};
    background-color: #f2f2f2;
    cursor: not-allowed;
  }
`;

export const Quantity = styled.span`
  font-size: 18px;
  width: 30px;
  text-align: center;
`;
