import styled from 'styled-components';
import { colors } from '@/styles/themes';
import { motion } from 'framer-motion';

export const BackgroundCardManage = styled(motion.div)`
  display: flex;
  flex-direction: column;

  border-radius: 20px;
  background-color: white;
  padding: 20px;
`;

export const HeaderCardOrder = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StatusContainer = styled.div`
  display: flex;
  gap: 5px;
  font-size: 15px;
  > span {
    font-size: 18px;
  }
`;

export const AboutOrder = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  row-gap: 10px;
  column-gap: 20px;
  margin-inline: 10px;

  & > :nth-child(2n + 1) {
    display: flex;
    align-items: center;
    font-size: 16px;
    gap: 10px;
    justify-self: start;
  }

  & > :nth-child(2n) {
    display: flex;
    align-items: center;
    font-size: 16px;
    gap: 10px;
    justify-self: end;
  }

  font-family: 'Comfortaa Regular';
  color: ${colors.darkGray};
  margin-block: 20px;
`;

export const SpanColor = styled.span<{ status: string }>`
  color: ${(props) =>
    props.status === 'pronto'
      ? colors.red
      : props.status === 'entregue'
        ? colors.green
        : colors.baseYellow};
`;
