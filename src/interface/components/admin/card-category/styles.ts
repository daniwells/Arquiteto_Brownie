import styled from 'styled-components';
import { colors } from '@/styles/themes';
import breakpoints from '@/styles/breakpoints';

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
  cursor: pointer;
  transition:
    border 0.3s ease-out,
    transform 0.3s ease-out;

  &:hover {
    border: solid 1px ${colors.darkGray};
    transform: scale(1.01);
  }
  
  @media ${breakpoints.md} {
    max-width: 600px;
    margin-inline: auto;
  }
`;
