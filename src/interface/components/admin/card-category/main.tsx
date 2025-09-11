import * as S from './styles';
import removeIcon from '../../../../../public/svg/remove.svg';
import Image from 'next/image';
import { CircularProgress } from '@mui/material';

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface cardCategoryProps {
  value: string;
  handleRemove: () => void;
  loading?: boolean;
  id: string;
}

const CardCategory: React.FC<cardCategoryProps> = ({ value, handleRemove, loading, id }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <S.CardCategoryStyle
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
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
