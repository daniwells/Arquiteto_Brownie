import * as S from "./style";

interface primaryButtonProps {
    value: string;
    handleClick?: () => void;
    type?: "submit" | "button" | "reset";
    isSecondary?: boolean;
}

const PrimaryButton: React.FC<primaryButtonProps> = ({value, handleClick, type, isSecondary}) => {
    return ( 
        <S.PrimaryButtonStyle $issecondary={isSecondary} type={type} onClick={handleClick} >
            {value}
        </S.PrimaryButtonStyle> 
    );
}
 
export default PrimaryButton;