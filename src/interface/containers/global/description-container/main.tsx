import * as S from "./styles";
import Title from "@/interface/components/global/title/main";

interface descriptionContainerProps {
    desc: string,
    title: string,
}

const DescriptionContainer: React.FC<descriptionContainerProps> = ({desc, title}) => {
    return ( 
        <div>
            <Title text={title}/>
            <S.Text>{desc}</S.Text>
        </div>
    );
}
 
export default DescriptionContainer;

