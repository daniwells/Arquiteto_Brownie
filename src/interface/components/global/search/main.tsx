import * as S from './styles';

interface searchProps {
  handleChange: (value: string) => void;
  value: string;
  placeholder: string;
  id: string;
}

const Search: React.FC<searchProps> = ({ value, handleChange, placeholder, id }) => {
  return (
    <S.Wrapper
      htmlFor={id}
    >
      <S.Input
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.value)}
      />
      <S.Icon src="/svg/search.svg" alt="search icon" />
    </S.Wrapper>
  );
};

export default Search;
