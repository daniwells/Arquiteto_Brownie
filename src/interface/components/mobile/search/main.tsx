import * as S from "./styles";

const Search = () => {
    return (
        <S.Wrapper>
            <S.Input placeholder="Pesquisar por sabor"/>
            <S.Icon src="/svg/search.svg" alt="search icon"/>
        </S.Wrapper>
    );
}

export default Search;