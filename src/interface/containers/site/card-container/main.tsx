import * as S from './styles';

interface cardContainerProps {
  children: React.ReactNode;
}

const CardContainer: React.FC<cardContainerProps> = ({ children }) => {
  return <S.Background>{children}</S.Background>;
};

export default CardContainer;
