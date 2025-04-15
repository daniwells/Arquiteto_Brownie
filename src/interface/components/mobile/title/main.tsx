import React from "react";
import * as S from "./styles";

interface TitleProps {
    text: string,
}   

const Title: React.FC<TitleProps> = ({ text }) => {
    return ( 
        <S.TitleStyle>{text}</S.TitleStyle>
    );
}
 
export default Title;