import * as S from "./styles";
import Image from "next/image";

interface PhoneInputProps {
  icon: string;
  altIcon: string;
  value: string;
  placeholder: string;
  id: string;
  handleChange: (value: string) => void;
  mask: string;
}

const MaskedInput: React.FC<PhoneInputProps> = ({
  icon,
  altIcon,
  value,
  placeholder,
  id,
  handleChange,
  mask,
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
      />
    </S.InputContainer>
  );
};

export default MaskedInput;
