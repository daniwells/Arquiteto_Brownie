import * as S from './styles';
import { CircularProgress } from '@mui/material';

interface primaryButtonProps {
  value: string;
  handleClick?: () => void;
  type?: 'submit' | 'button' | 'reset';
  category?: 'success' | 'error' | 'dark' | 'normal' | 'secondary' | 'delete' | 'deactivate';
  loading?: boolean;
  fontSize?: string;
}

const PrimaryButton: React.FC<primaryButtonProps> = ({
  value,
  handleClick,
  type,
  category,
  loading,
  fontSize,
}) => {
  return (
    <S.PrimaryButtonStyle
      $fontSize={fontSize}
      $category={category}
      type={type}
      onClick={category == "deactivate" ? () => {} : handleClick}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : value}
    </S.PrimaryButtonStyle>
  );
};

export default PrimaryButton;
