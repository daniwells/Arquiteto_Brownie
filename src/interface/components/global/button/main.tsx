import * as S from './styles';
import { CircularProgress } from '@mui/material';

interface buttonProps {
  value: string;
  handleClick?: () => void;
  type?: 'submit' | 'button' | 'reset';
  category?: 'success' | 'error' | 'dark' | 'normal' | 'secondary' | 'delete' | 'deactivate';
  loading?: boolean;
  fontSize?: string;
}

const Button: React.FC<buttonProps> = ({
  value,
  handleClick,
  type,
  category,
  loading,
  fontSize,
}) => {
  return (
    <S.ButtonStyle
      $fontSize={fontSize}
      $category={category}
      type={type}
      onClick={category == "deactivate" ? () => {} : handleClick}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : value}
    </S.ButtonStyle>
  );
};

export default Button;
