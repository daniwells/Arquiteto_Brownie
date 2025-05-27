import styled from 'styled-components';
import { colors } from '@/styles/themes';
import { motion } from 'framer-motion';
import { Swiper } from 'swiper/react';
import breakpoints from '@/styles/breakpoints';

export const BackgroundNav = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
`;

export const NavBar = styled(Swiper)`
  width: 100%;
  overflow: hidden;
  .swiper-slide {
    width: auto;
  }
`;

export const NavItem = styled.div`
  position: relative;

  z-index: 1;

  a {
    font-size: 16px;
    color: ${colors.brown};
    display: inline-block;
    white-space: nowrap;
  }

  &:hover {
    opacity: 0.7;
  }

  @media ${breakpoints.md} {
    
    a {
      font-size: 18px;
    }
  }
`;

export const Underline = styled(motion.div)`
  position: absolute;
  z-index: -1;
  bottom: -2px;
  width: 105%;
  height: 10px;
  background-color: ${colors.beige};
  border-radius: 0px 0px 5px 0px;
`;

export const CustomSwiper = styled(Swiper)`
  div {
    display: flex;
    justify-content: space-between;
  }
`;
