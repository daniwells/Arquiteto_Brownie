import styled from 'styled-components';

export const BackgroundCardContainer = styled.div<{ $height?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  width: 100%;
  height: ${(props) => (props?.$height ? props?.$height : '12rem')};
  gap: 15px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-block: 10px;
  padding-inline: 10px;
`;
