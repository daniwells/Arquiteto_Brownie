import * as S from "./styles";

const ProductPrice = ({ 
    value
}:{
    value: string;
}) => {
    const stringValue = Number(value).toFixed(2);

    const [intValue, floatValue] = stringValue.split(".");

    return ( 
        <p>
            $
            {intValue}
            <S.Span>
                .{ floatValue }
            </S.Span>
        </p>
    );
}
 
export default ProductPrice;