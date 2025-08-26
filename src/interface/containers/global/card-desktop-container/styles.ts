import styled from "styled-components";
import { colors } from "@/styles/themes";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  overflow: hidden;
  min-width: 800px;
  max-width: 1200px;
`;

export const SliderContainer = styled.div`
  width: 80%;
  >div{
    padding: 20px 15px;
  }
`;

export const NavButton = styled.div`
  background-color: white;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;

  transition:
      border 0.3s ease-out,
      transform 0.3s ease-out;
  
  &:hover {
      border: solid 1px ${colors.darkGray};
      transform: scale(1.05);
  }
`