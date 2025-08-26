'use client';

import { createGlobalStyle } from 'styled-components';
import { colors } from './themes';

export const GlobalStyles = createGlobalStyle`  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 20px;
  }

  body{
    overflow-x: hidden;
    font-family: 'Comfortaa Regular', Arial, Helvetica, sans-serif;
    background-color: ${colors.gray};
    display: flex;
    justify-content: center;
    align-items: center;
    padding-inline: 10px;
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
