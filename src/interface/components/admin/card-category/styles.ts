import styled from 'styled-components';
import { colors } from '@/styles/themes';

export const CardCategoryStyle = styled.div`
  display: flex;
  border-radius: 200px;
  padding-inline: 20px;
  gap: 15px;
  align-items: center;
  width: 100%;
  background-color: white;
  padding-block: 15px;
  font-size: 18px;
  border: 1px solid ${colors.lightGray};
  justify-content: space-between;
`;
