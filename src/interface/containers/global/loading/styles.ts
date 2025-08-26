import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
`;

export const Spinner = styled.svg`
  width: 60px;
  height: 60px;
  animation: ${rotate} 2s linear infinite;

  circle {
    stroke: currentColor;
    stroke-linecap: round;
    stroke-width: 4;
    fill: none;
    animation: ${dash} 1.5s ease-in-out infinite;
  }
`;