import * as S from "./styles"

interface mainContainerProps{
    children: React.ReactNode;
    minHeight?: string;
}

const MainContainer: React.FC<mainContainerProps> = ({children, minHeight}) => {
    return ( 
        <S.Background $minheight={minHeight} >
        {children}
        </S.Background> 
    );
}
 
export default MainContainer;