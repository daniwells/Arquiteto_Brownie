import styled from 'styled-components';
import { colors } from '@/styles/themes';
import { motion } from 'framer-motion';
import breakpoints from '@/styles/breakpoints';

export const Container = styled(motion.div)`
  display: flex;
  flex-direction: row;
  height: 150px;
  cursor: pointer;
`;

interface imageProps {
  $url: string;
}

export const Image = styled.div<imageProps>`
  max-width: 200px;
  width: 45%;
  height: 140px;
  ${(props) =>
    props?.$url
      ? `background-image: url("${props?.$url}");`
      : `background-color: ${colors.lightGray};`};
  border-radius: 5px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;

  @media ${breakpoints.xs} {
    height: 150px;
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
