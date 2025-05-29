import styled from 'styled-components';
import { colors } from '@/styles/themes';
import Image from 'next/image';
import breakpoints from '@/styles/breakpoints';

export const customImage = styled(Image)`
  margin: 20px;
`;

export const MainLogin = styled.main`
  width: 100%;
  min-height: 100vh;
  background-color: ${colors.baseYellow};
  background-image: url('/images/background-signin.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media ${breakpoints.md} {
    justify-content: end;
  }
`;

export const ContentLogin = styled.div`
  background-color: white;
  bottom: 0;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75vh;
  width: 100%;
  >form{
    width: 100%;
  }
  border-radius: 20px 20px 0px 0px;

  >form{
    display: flex;
    justify-content: center;
  }

  >div{
    max-width: 450px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  @media ${breakpoints.md} {
    height: 90vh;
    gap: 100px;
  }

  @media ${breakpoints.lg} {
    gap: 200px;
  }
`;
