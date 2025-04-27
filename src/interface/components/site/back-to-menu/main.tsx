// Style
import * as S from './styles';

// Libs
import Link from 'next/link';

const BackToMenu = () => {
  return (
    <S.BackToMenuStyle>
      <p>
        O carrinho está vazio... <Link href="/">Voltar as compras.</Link>
      </p>
    </S.BackToMenuStyle>
  );
};

export default BackToMenu;
