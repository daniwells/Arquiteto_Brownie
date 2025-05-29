import styled from 'styled-components';
import { colors } from '@/styles/themes';
import breakpoints from '@/styles/breakpoints';

export const BackToMenuStyle = styled.div`
  width: 100%;
  a {
    color: ${colors.baseYellow};
    text-decoration: underline;
  }
  margin-bottom: 50px;

  @media ${breakpoints.md} {
    display: flex;
    justify-content: center;
    padding-block: 50px;

    >p{
      font-size: 18px;
      >a{
        font-size: 18px;
      }
    }

    
  }
`;
