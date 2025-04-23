import * as S from "./styles";
import ProductPrice from "../../global/product-price/main";

interface TotalPriceInfoProps {
    date: Date,
    totalPrice: string,
}

const TotalPriceInfo: React.FC<TotalPriceInfoProps> = ({ date, totalPrice }) => {

    const formatedDate = (date: Date) => {
        return date.toLocaleDateString()
    }

    return ( 
        <S.TotalPriceContainer>
            <S.Row><S.Span>Data:</S.Span> {String(formatedDate(date))}</S.Row>
            <S.Row><S.Span>Preço total:</S.Span>  <ProductPrice value={totalPrice}/></S.Row>
        </S.TotalPriceContainer>
    );  
}
 
export default TotalPriceInfo;