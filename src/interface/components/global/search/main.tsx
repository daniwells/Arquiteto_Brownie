import * as S from "./styles";

interface searchProps {
    handleChange: (value: string) => void;
    value: string;
}

const Search: React.FC<searchProps> = ({ value, handleChange }) => {
    return (
        <S.Wrapper>
            <S.Input 
                value={value}
                placeholder="Pesquisar por sabor" 
                onChange={(e) => handleChange(e.target.value)}
            />
            <S.Icon src="/svg/search.svg" alt="search icon"/>
        </S.Wrapper>
    );
}

export default Search;