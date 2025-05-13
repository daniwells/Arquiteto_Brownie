import styled from 'styled-components';
import { colors } from '@/styles/themes';
import { motion } from 'framer-motion';

export const BackgroundCardManage = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: 270px;
  border-radius: 20px;
  background-color: white;
  padding: 20px;
`;

export const ImageProductManageCard = styled.div<{ $url: string }>`
  border-radius: 5px;
  background-color: ${colors.gray};
  max-width: 200px;
  width: 45%;
  height: 150px;
  ${(props) =>
    props?.$url
      ? `background-image: url("${props?.$url}");`
      : `background-color: ${colors.lightGray};`};
  border-radius: 5px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
`;

export const AboutProduct = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
  width: 55%;
  font-family: 'Comfortaa Regular';
  color: ${colors.darkGray};
  padding-right: 15px;

  h3 {
    font-size: 15px;
    color: ${colors.blackGray};
  }

  div {
    display: flex;
    flex-direction: row;
    gap: 5px;
    justify-content: space-between;

    > span {
      font-size: 15px;
      font-weight: bold;
    }
  }
`;
export const Column = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

export const SpanColor = styled.span<{ status: string }>`
  font-size: 15px;
  color: ${(props) => (props.status === 'active' ? colors.green : colors.red)};
`;
