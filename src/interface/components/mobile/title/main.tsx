import React from "react";
import * as S from "./styles";

interface TitleProps {
    text: string,
}   

const Title: React.FC<TitleProps> = ({ text }) => {
    return ( 
        <S.Container>
            <S.TitleStyle>{text}</S.TitleStyle>
        </S.Container>
    );
}
 
export default Title;