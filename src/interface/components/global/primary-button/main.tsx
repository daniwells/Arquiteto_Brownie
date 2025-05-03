import * as S from './styles';

interface primaryButtonProps {
  value: string;
  handleClick?: () => void;
  type?: 'submit' | 'button' | 'reset';
  category?: 'success' | 'error' | 'dark' | 'normal';
}

const PrimaryButton: React.FC<primaryButtonProps> = ({ value, handleClick, type, category }) => {
  return (
    <S.PrimaryButtonStyle $category={category} type={type} onClick={handleClick}>
    {value}
    </S.PrimaryButtonStyle>
  );
};

export default PrimaryButton;
