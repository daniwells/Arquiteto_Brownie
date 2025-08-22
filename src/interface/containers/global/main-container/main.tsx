import * as S from './styles';

interface mainContainerProps {
  children: React.ReactNode;
  minHeight?: string;
  isBottomMenu?: boolean;
}

const MainContainer: React.FC<mainContainerProps> = ({ children, minHeight, isBottomMenu }) => {
  return <S.BackgroundMainContainer $isBottomMenu={isBottomMenu} $minheight={minHeight}>{children}</S.BackgroundMainContainer>;
};

export default MainContainer;
