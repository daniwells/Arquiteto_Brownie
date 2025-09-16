import styled from 'styled-components';
import { colors } from '@/styles/themes';
import { motion } from 'framer-motion';
import breakpoints from '@/styles/breakpoints';

interface imageProps {
  $url: string;
}

export const ImageContainer = styled.div`
  max-width: 200px;
  width: 45%;
  height: 100%;
  overflow: hidden;
`

export const Image = styled.div<imageProps>`
  max-width: 200px;
  width: 100%;
  height: 100%;
  ${(props) =>
    props?.$url
      ? `background-image: url("${props?.$url}");`
      : `background-color: ${colors.lightGray};`};
  border-radius: 5px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
`;

export const Container = styled(motion.div)`
  display: flex;
  flex-direction: row;
  height: 150px;
  cursor: pointer;
  width: 100%;
  
  &:hover, &:active {
    ${Image}{
      scale: 1.05;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  justify-content: space-between;
  width: 50%;

  h1 {
    margin-bottom: 5px;
  }

  h1, span {
    font-size: 14px;
  }

  p {
    font-size: 14px;
    font-family: 'Comfortaa Bold';
  }

  @media ${breakpoints.xs} {
    p{
      font-size: 16px;
    }

    h1, span {
      font-size: 16px;
    }
  }

  @media ${breakpoints.md} {
    p{
      font-size: 18px;
    }

    h1, span {
      font-size: 18px;
    }
  }
`;

export const PriceAmountContainer = styled.div`
  display: flex;
  gap: 20px;
`;
