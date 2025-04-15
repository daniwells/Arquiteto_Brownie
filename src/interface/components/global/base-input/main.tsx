import * as S from "./styles";
import Image from "next/image";
import { ChangeEvent } from "react";

interface BaseInputProps {
    icon: string;
    value: string | number;
    placeholder: string;
    type?: string;
    altIcon: string;
    id: string;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const BaseInput: React.FC<BaseInputProps> = ({ 
    icon, 
    altIcon, 
    value, 
    placeholder, 
    type,
    id,
    handleChange
}) => {
    return (
        <S.InputContainer htmlFor={id} >
            <Image src={icon} alt={altIcon} width={20} height={20} />
            <S.InputStyle
                onChange={handleChange}
                type={type || "text"}
                value={value}
                placeholder={placeholder}
                id={id}
            />
        </S.InputContainer>
    );
}
 
export default BaseInput;