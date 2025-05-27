import styled from 'styled-components';
import { colors } from '@/styles/themes';
import { Swiper } from 'swiper/react';
import breakpoints from '@/styles/breakpoints';


export const MainAboutProduct = styled.div`
  width: 100%;
  max-width: 70rem; 
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
  }

  @media ${breakpoints.xs}{
    padding: 20px;
  }

  @media ${breakpoints.sm} {
    padding: 25px;
  }

  @media ${breakpoints.bs} {
    padding: 35px 50px;
    min-height: 100vh;
  }


  @media ${breakpoints.md} {
    background-color: ${colors.gray};
    display: flex;
    justify-content: center;
    padding: 40px; 
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
  margin-bottom: 20px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const AboutColumn = styled.div<{size_630: boolean}>`
  width: ${props => props.size_630 ? "50%" : "100%"};

  
`