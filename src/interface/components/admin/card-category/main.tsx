import * as S from './styles';
import removeIcon from '../../../../../public/svg/remove.svg';
import Image from 'next/image';
import { CircularProgress } from '@mui/material';

interface cardCategoryProps {
  value: string;
  handleRemove: () => void;
  loading?: boolean;
}

const CardCategory: React.FC<cardCategoryProps> = ({ value, handleRemove, loading }) => {
  return (
    <S.CardCategoryStyle>
      {value}{' '}
      {loading ? (
        <CircularProgress size={24} color="inherit" />
      ) : (
        <Image width={20} src={removeIcon} alt="ícone de delete" onClick={handleRemove} />
      )}
    </S.CardCategoryStyle>
  );
};

export default CardCategory;
