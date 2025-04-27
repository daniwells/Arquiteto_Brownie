import styled from 'styled-components';
import Image from 'next/image';

export const LogoSmallStyle = styled.img`
  width: 3rem;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const BackIcon = styled(Image)`
  width: 20px;
  height: 20px;
`;
