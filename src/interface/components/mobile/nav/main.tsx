import * as S from "./styles"
import { useState } from "react";
import { motion } from "framer-motion";

const navItems = ["Brownies Clássicos", "Brownies Meio Amargo"];

const Nav = () => {
    const [active, setActive] = useState(navItems[0]);

    return (
        <S.Background>
            <h1>Nosso menu</h1>
            <S.Nav>
                {navItems.map((item) => (
                    <S.NavItem key={item} onClick={() => setActive(item)}>
                        <a href="#">{item}</a>
                        {active === item && <S.Underline layoutId="underline" />}
                    </S.NavItem>
                ))}
            </S.Nav>
        </S.Background>
    );
}
export default Nav;