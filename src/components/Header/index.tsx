import { HeaderContainer } from "./styles";
import Logo from '../../assets/svg/Logo.svg';
import { Timer, Scroll } from "phosphor-react";
import { NavLink } from "react-router-dom"

export function Header() {
    return (
        <HeaderContainer>
            <img src={Logo} alt="logo"/>
            <nav>
                <NavLink to="/" title="Timer">
                    <Timer size={24}/>
                </NavLink>
                <NavLink to="/history" title="Historico">
                    <Scroll size={24}/>
                </NavLink>
            </nav>
        </HeaderContainer>
    )
}