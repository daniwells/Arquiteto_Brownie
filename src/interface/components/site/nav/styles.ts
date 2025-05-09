import styled from 'styled-components';
import { colors } from '@/styles/themes';
import { motion } from 'framer-motion';

export const BackgroundNav = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
`;

export const Nav = styled.div`
  display: flex;
  flex-direction: row;
  grid-gap: 25px;
`;

export const NavItem = styled.li`
  position: relative;
  z-index: 1;
  list-style: none;

  a {
    font-size: 16px;
    color: ${colors.brown};
    display: inline-block;
  }

  &:hover {
    opacity: 0.7;
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
