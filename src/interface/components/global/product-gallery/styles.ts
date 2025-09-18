import styled from "styled-components";
import { colors } from "@/styles/themes";
import breakpoints from "@/styles/breakpoints";

export const Container = styled.div`
  display: flex;
  gap: 20px;
  width: 45%;
  min-width: 290px;
  height: 100%;

  @media ${breakpoints.md}{
    width: 50%;
  }
`;

export const Thumbnails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  max-height: 300px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${colors.gray};
    border-radius: 2px;
  }
`;

export const ThumbnailWrapper = styled.div<{ $active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1.5px solid ${({ $active }) => ($active ? colors.baseYellow : colors.lightGray)};
  border-radius: 8px;
  padding: 4px;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${colors.baseYellow};
  }
`;

export const MainImageWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 500px;

  @media ${breakpoints.md}{
    img{
        width: 250px;
        height: 280px;
    }
  }

  @media ${breakpoints.lg}{
    img{
        width: 300px;
        height: 300px;
    }
  }

  @media ${breakpoints.bg}{
    img{
        width: 400px;
    }
  }
`;
