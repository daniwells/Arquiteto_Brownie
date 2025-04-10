import styled from "styled-components";
import { colors } from "@/styles/themes";

export const ContentAboutProduct = styled.div`
    padding: 20px;
    border-radius: 20px;


    h3{
        font-family: 'Pacifico Regular';
        color: ${colors.darkBrown};
    }

    p{ 
      font-family: 'Comfortaa Regular';
      font-size: 18px;
    }
    Button{
      font-family: 'Comfortaa Bold';
        background-color: ${colors.beige};
        color: white;
        border-radius: 20px;
        box-shadow: none;

        &:hover{
            box-shadow: none;
        }
    }
    .my-swiper {
    .swiper-slide img {
      width: 200px;
      height: 140px;
      border-radius: 5px;
      object-fit: cover;
    }
  }

  div{ 
    display: flex;
    justify-content: space-between;
  }

`

export const Product = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 15px;
`