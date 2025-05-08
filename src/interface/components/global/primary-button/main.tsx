import * as S from './styles';
import { CircularProgress } from '@mui/material';

interface primaryButtonProps {
  value: string;
  handleClick?: () => void;
  type?: 'submit' | 'button' | 'reset';
  category?: 'success' | 'error' | 'dark' | 'normal';
  loading?: boolean;
}

const PrimaryButton: React.FC<primaryButtonProps> = ({ value, handleClick, type, category, loading }) => {
  return (
    <S.PrimaryButtonStyle $category={category} type={type} onClick={handleClick}>
    {loading ? <CircularProgress size={24} color="inherit" /> : value}
    </S.PrimaryButtonStyle>
  );
};

export default PrimaryButton;
