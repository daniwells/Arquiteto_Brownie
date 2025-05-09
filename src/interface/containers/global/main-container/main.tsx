import * as S from './styles';

interface mainContainerProps {
  children: React.ReactNode;
  minHeight?: string;
}

const MainContainer: React.FC<mainContainerProps> = ({ children, minHeight }) => {
  return <S.BackgroundMainContainer $minheight={minHeight}>{children}</S.BackgroundMainContainer>;
};

export default MainContainer;
