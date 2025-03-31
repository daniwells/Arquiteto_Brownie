import * as S from "./styles"

const Card = () => {
    return (
        <S.Container>
            <S.Image />
            <S.Content>
                <div>
                    <h1>Clássico</h1>
                    <span>Brownie de massa normal</span>
                </div>
                <p>R$3.00</p>
            </S.Content>
        </S.Container>
    );
}

export default Card;