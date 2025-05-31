import styled from 'styled-components';
import { colors } from '@/styles/themes';
import { motion } from 'framer-motion';
import breakpoints from '@/styles/breakpoints';

export const BackgroundCardManage = styled(motion.div)`
  display: flex;
  flex-direction: column;

  @media ${breakpoints.xs} {
    height: 270px;
  }
  
  border-radius: 20px;
  background-color: white;
  padding: 20px;
  width: 100%;
  max-width: 500px;
  align-items: center;
`;

export const ImageProductManageCard = styled.div<{ $url: string }>`
  border-radius: 5px;
  background-color: ${colors.gray};
  width: 100%;
  height: 150px;
  margin-bottom: 20px;
  border-radius: 5px;

  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  ${(props) =>
    props?.$url
      ? `background-image: url("${props?.$url}");`
      : `background-color: ${colors.lightGray};`};
  
  @media ${breakpoints.xs} {
    max-width: 200px;
    width: 45%;
    margin-bottom: 0px;
  }

  @media ${breakpoints.md} {
    width: 50%;
  }
`;

export const AboutProduct = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  font-family: 'Comfortaa Regular';
  color: ${colors.darkGray};
  padding-right: 15px;

  h3 {
    font-size: 18px;
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

  @media ${breakpoints.xs} {
    width: 55%;
  }

  @media ${breakpoints.md} {
    padding-right: 0px;
    gap: 5px;
    width: 50%;
  }
`;
export const RowOrColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;

  @media ${breakpoints.xs} {
    flex-direction: row;
    justify-content: center;
  }

  @media ${breakpoints.bs} {
    gap: 50px;
  }

  @media ${breakpoints.md} {
    gap: 20px;
  }
`;

export const SpanColor = styled.span<{ status: string }>`
  font-size: 15px;
  color: ${(props) => (props.status === 'active' ? colors.green : colors.red)};
`;
