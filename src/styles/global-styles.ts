'use client';

import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 20px;
  }

  @font-face {
    font-family: 'Comfortaa Regular';
    src: url('/fonts/Comfortaa-Regular.ttf');
  }

  @font-face {
    font-family: 'Comfortaa Bold';
    src: url('/fonts/Comfortaa-Bold.ttf');
  }

  @font-face {
    font-family: 'Pacifico Regular';
    src: url('/fonts/Pacifico-Regular.ttf');
  }

  body{
    overflow-x: hidden;
    font-family: 'Comfortaa Regular', Arial, Helvetica, sans-serif;
  }

  a {
    text-decoration: none;
    color: inherit;
    font-size: 16px;
  }

  ul {
    list-style: none;
  }

  p{
    font-size: 16px;
  }
`;
