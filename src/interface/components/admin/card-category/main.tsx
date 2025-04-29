import * as S from "./styles";
import removeIcon from "../../../../../public/svg/remove.svg";
import Image from "next/image";

interface cardCategoryProps {
    value: string;
    handleRemove: () => void;
}

const CardCategory: React.FC<cardCategoryProps> = ({ value, handleRemove }) => {
    return ( 
        <S.CardCategoryStyle>
            {value} <Image width={20} src={removeIcon} alt="ícone de delete" onClick={handleRemove} />
        </S.CardCategoryStyle> 
    );
}
 
export default CardCategory;