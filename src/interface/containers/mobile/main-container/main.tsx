import * as S from "./styles"

interface mainContainerProps{
    children: React.ReactNode;
}
const MainContainer: React.FC<mainContainerProps> = ({children}) => {
    return ( 
        <S.Background>
        {children}
        </S.Background> 
    );
}
 
export default MainContainer;