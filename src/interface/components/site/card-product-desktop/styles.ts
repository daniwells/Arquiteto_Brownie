import styled from 'styled-components';
import { colors } from '@/styles/themes';

export const ContainerCardProductDesktop = styled.div`
  background-color: #fff;
  border-radius: 10px;
  height: 400px;
  display: flex;
  flex-direction: column;

  h3 {
    margin: 0;
    color: #333;
  }

  p {
    color: #666;
    margin: 5px 0 0 0;
  }

  
  transition: border 0.3s ease-out, transform 0.3s ease-out;
  
  &:hover {
    box-shadow: 0px 0px 10px rgba(0,0,0,.1);
    transform: scale(1.05);
  }

  min-width: 270px;
  max-width: 300px;
`;

export const Image = styled.div<{$url: string;}>`
    width: 100%;
    height: 50%;
    ${(props) =>
        props?.$url
        ? `background-image: url("${props?.$url}");`
        : `background-color: ${colors.lightGray};`};
    border-radius: 5px;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
`;

export const Content = styled.div`
    height: 50%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: space-between;

`

export const ButtonCardContainer = styled.div`
    padding-block: 20px;
`

export const TitleAndPriceContainer = styled.div`
    display: flex;
    justify-content: space-between;
`