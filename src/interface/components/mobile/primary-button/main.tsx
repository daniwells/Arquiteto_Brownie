import * as S from "./style";

interface primaryButtonProps {
    value: string;
    handleClick: () => void; 
}

const PrimaryButton: React.FC<primaryButtonProps> = ({value, handleClick}) => {
    return ( 
        <S.PrimaryButtonStyle onClick={handleClick} >
            {value}
        </S.PrimaryButtonStyle> 
    );
}
 
export default PrimaryButton;