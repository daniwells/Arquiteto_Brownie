import styled from 'styled-components';
import { colors } from '@/styles/themes';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const Container = styled.div`
  background-color: white;
  border-radius: 12px;
  max-width: 500px;
  width: 100%;
  padding: 24px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

  @media (max-width: 600px) {
    padding: 20px;
  }
`;

export const Message = styled.p`
  font-size: 16px;
  text-align: center;
  color: ${colors.blackGray};
`;

export const TitleError = styled.h2`
  font-size: 32px;
  text-align: center;
  margin-block: 20px;
`;
