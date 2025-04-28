import * as S from './styles';
import Image from 'next/image';
// import { MaskedPattern } from 'imask';

interface PhoneInputProps {
  icon: string;
  altIcon: string;
  value: string;
  placeholder: string;
  id: string;
  handleChange: (value: string) => void;
  mask: any;
  radix?: string;
  min?: number;
  max?: number;
  scale?: number;
}

const MaskedInput: React.FC<PhoneInputProps> = ({
  icon,
  altIcon,
  value,
  placeholder,
  id,
  handleChange,
  mask,
  radix,
  min,
  max,
  scale
}) => {
  return (
    <S.InputContainer htmlFor={id}>
      <Image src={icon} alt={altIcon} width={20} height={20} />
      <S.MaskedInputStyle
        mask={mask}
        value={value}
        onAccept={(val: string) => handleChange(val)}
        placeholder={placeholder}
        id={id}
        radix={radix}
        min={min}
        max={max}
        scale={scale}
      />
    </S.InputContainer>
  );
};

export default MaskedInput;
