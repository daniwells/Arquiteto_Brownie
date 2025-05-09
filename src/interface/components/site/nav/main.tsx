import * as S from './styles';
import { useState, useEffect } from 'react';
import Title from '../../global/title/main';

interface navProps {
  handleChange: (category: string) => void;
  navItems: {name: string, value: string}[]
}

const Nav: React.FC<navProps> = ({ handleChange, navItems }) => {
  const [active, setActive] = useState(navItems[0]);

  useEffect(() => {
    handleChange(active.value);
  }, [active]);

  return (
    <S.BackgroundNav>
      <Title text="Nosso menu" />
      <S.Nav>
        {navItems.map((item) => (
          <S.NavItem key={item.value} onClick={() => setActive(item)}>
            <a href="#">{item.name}</a>
            {active.value === item.value && <S.Underline layoutId="underline" />}
          </S.NavItem>
        ))}
      </S.Nav>
    </S.BackgroundNav>
  );
};
export default Nav;
