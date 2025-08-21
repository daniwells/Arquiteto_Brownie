import styled from 'styled-components';
import { colors } from '@/styles/themes';
import { Swiper } from 'swiper/react';
import breakpoints from '@/styles/breakpoints';


export const MainAboutProduct = styled.div`
  width: 100%;
  max-width: 60rem;

  @media ${breakpoints.sm} {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media ${breakpoints.bs} {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 230px;
  }

  @media ${breakpoints.md} {
    height: 280px;
  }

  @media ${breakpoints.lg} {
    height: 320px;
  }
`

export const AboutProductContainerStyle = styled.div`
  padding: 10px;
  border-radius: 20px;
  width: 100%;
  background-color: white;

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
    .swiper-slide div {
      width: 100%;
      height: 140px;
      border-radius: 5px;
      object-fit: cover;
    }
  }

  @media ${breakpoints.xs}{
    padding: 20px;
  }

  @media ${breakpoints.sm} {
    padding: 25px;
  }

  @media ${breakpoints.bs} {
    min-height: 100vh;
  }

  
  @media ${breakpoints.md} {
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: ${colors.gray};
    padding: 40px;

    h3 {
      font-size: 32px;
    }
  }

  @media ${breakpoints.lg} {
    padding-inline: 80px;
  }
`;

export const CustomSwiper = styled(Swiper)`
  div {
    display: flex;
    justify-content: space-between;
  }
  max-width: 450px;
`;

export const AboutProductContent = styled.div`
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
  justify-content: space-between;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const AboutColumn = styled.div`
  width: 100%;
  max-width: 450px;
  height: 100%;

  @media ${breakpoints.bs} {
    width: 45%;
  }
`

export const LogoDarkContainer = styled.div`
  background-color: ${colors.mediumGray};
  img{
    margin: auto;
  }
`