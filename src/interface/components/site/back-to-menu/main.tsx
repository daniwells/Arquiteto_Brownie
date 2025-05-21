// Style
import * as S from './styles';

// Libs
import Link from 'next/link';

interface backToMenu {
  text: string;
  link?: string;
}

const BackToMenu: React.FC<backToMenu> = ({ text, link }) => {
  return (
    <S.BackToMenuStyle>
      <p>
        {text} {link && <Link href="/">{link}</Link>}
      </p>
    </S.BackToMenuStyle>
  );
};

export default BackToMenu;
