import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Header.scss"
import Logo from "../assets/images/NshesLogo.png"
import Search from "../assets/icons/Search.png"
import Shopping from "../assets/icons/shopping.png"

function Header() {
    return (
        <nav className="header-container">
            <ul className="nav-list">
                <li className="nav-item"><Link to><img src={Logo} alt="logo" /></Link></li>
                <li className="nav-item"><Link to>Main</Link></li>
                <li className="nav-item"><Link to>Market</Link></li>
                <li className="nav-item"><Link to>New Releases</Link></li>
                <li className="nav-item"><Link to>SNKRS</Link></li>
                <li className="nav-item"><Link to><img src={Search} alt="seach"/></Link><Link><img src={Shopping} alt="shopping" /></Link></li>
            </ul>
        </nav>
    )
}

export default Header;