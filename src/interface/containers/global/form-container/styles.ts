import styled from 'styled-components';

export const Form = styled.form<{$style?: string}>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  ${props => props.$style}
  //padding-block: 30px;
  align-items: center;
  max-width: 600px;
`;
