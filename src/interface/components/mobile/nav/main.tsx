import * as S from "./styles"
import { useState, useEffect } from "react";

interface navProps {
    handleChange: (category: string) => void,
}

const Nav: React.FC<navProps> = ({ handleChange }) => {
    const navItems = [
        {name: "Brownies Clássicos", value: "classico"}, 
        {name: "Brownies Meio Amargo", value: "meio-amargo"},
    ];

    const [active, setActive] = useState(navItems[0]);
    
    useEffect(() => {
        handleChange(active.value);
    }, [active]);

    return (
        <S.Background>
            <h1>Nosso menu</h1>
            <S.Nav>
                {navItems.map((item) => (
                    <S.NavItem key={item.value} onClick={() => setActive(item)}>
                        <a href="#">{item.name}</a>
                        {active.value === item.value && <S.Underline layoutId="underline" />}
                    </S.NavItem>
                ))}
            </S.Nav>
        </S.Background>
    );
}
export default Nav;