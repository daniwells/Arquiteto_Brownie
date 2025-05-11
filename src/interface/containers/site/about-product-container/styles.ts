import styled from 'styled-components';
import { colors } from '@/styles/themes';
import { Swiper } from 'swiper/react';

export const ContentAboutProduct = styled.div`
  padding: 20px;
  border-radius: 20px;

  h3 {
    font-family: 'Pacifico Regular';
    color: ${colors.darkBrown};
    font-size: 24px;
  }

  p {
    font-family: 'Comfortaa Regular';
    font-size: 18px;
  }

  .my-swiper {
    .swiper-slide img {
      width: 100%;
      height: 140px;
      border-radius: 5px;
      object-fit: cover;
    }
  }
`;

export const CustomSwiper = styled(Swiper)`
  div {
    display: flex;
    justify-content: space-between;
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ContainerDesc = styled.div`
  margin-block: 20px;
`;

export const Product = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 15px;
  margin-bottom: 20px;
`;
