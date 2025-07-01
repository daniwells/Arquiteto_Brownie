import styled from 'styled-components';
import { colors } from '@/styles/themes';
import breakpoints from '@/styles/breakpoints';
import { motion } from 'framer-motion';

export const BackgroundCardManage = styled(motion.div)`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background-color: white;
  padding: 20px;
  width: 100%;
  max-width: 450px;
  max-height: 205px;
`;

export const HeaderCardOrder = styled.div`
  display: flex;
  justify-content: space-between;
  >h2{
    font-size: 18px;
  }
  @media ${breakpoints.xs}{
    >h2{
      font-size: 20px;
    }
  }
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
  width: 100%;
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

export const Row = styled.div`
  width: 100%;
  justify-content: space-between;

  >div{
    display: flex;
    gap: 5px;
    align-items: center;
    width: 45%;
    font-size: 16px;
    margin-bottom: 10px;
  }

  >p{
    font-size: 16px;
    width: 50%;
    margin-bottom: 10px;
  }

  @media ${breakpoints.xs} {
    display: flex;

    >p{
      
      margin-bottom: 0px;
    }
  }
`