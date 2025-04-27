import * as S from './styles';
import Image from 'next/image';
import { ChangeEvent } from 'react';

interface baseTextareaProps {
  icon: string;
  value: string | number;
  placeholder: string;
  type?: string;
  altIcon: string;
  id: string;
  handleChange: (e: string) => void;
  min?: number;
  max?: number;
}

const BaseTextarea: React.FC<baseTextareaProps> = ({
  icon,
  altIcon,
  value,
  placeholder,
  id,
  handleChange,
  min,
  max,
}) => {
  return (
    <S.FieldContainer htmlFor={id}>
      <Image src={icon} alt={altIcon} width={20} height={20} />
      <S.TextareaStyle
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleChange(e.target.value)}
        value={value}
        placeholder={placeholder}
        id={id}
        maxLength={max}
        minLength={min}
      />
    </S.FieldContainer>
  );
};

export default BaseTextarea;
