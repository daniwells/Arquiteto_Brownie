import * as S from './styles';

interface cardContainerProps {
  children: React.ReactNode;
  height?: string;
}

const CardContainer: React.FC<cardContainerProps> = ({ children, height }) => {
  return <S.BackgroundCardContainer $height={height} >{children}</S.BackgroundCardContainer>;
};

export default CardContainer;
