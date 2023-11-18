//import
import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
//style
import "../../assets/styles/Header.scss";
//assets
import Logo from "../../assets/images/NshesLogo.png";
import Search from "../../assets/icons/Search.png";
import Shopping from "../../assets/icons/shopping.png";
//component
import HeaderSearch from "./SearchDropdown";
import HeaderCart from "./CartDropdown";
import CartContext from "../../context/CartContext";

function Header() {
  const { cartCount } = useContext(CartContext);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isCartVisible, setCartVisible] = useState(false);
  const location = useLocation();

  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
    if (isCartVisible === true) {
      setCartVisible(!isCartVisible);
    }
  };
  const toggleCart = () => {
    setCartVisible(!isCartVisible);
    if (isSearchVisible === true) {
      setSearchVisible(!isSearchVisible);
    }
  };
  useEffect(() => {
    setSearchVisible(false);
    setCartVisible(false);
  }, [location]);
  
  
  

  return (
    <nav className="header-container">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
        </li>
        <li className="nav-item">
          <Link>Men</Link>
        </li>
        <li className="nav-item">
          <Link to="/Market">Market</Link>
        </li>
        <li className="nav-item">
          <Link to>New Releases</Link>
        </li>
        <li className="nav-item">
          <Link to>SNKRS</Link>
        </li>
        <li className="nav-item">
          <img src={Search} alt="search" onClick={toggleSearch} />
          <div onClick={toggleCart}>
            <img src={Shopping} alt="shopping" />
            {cartCount > 0 && <div className="cartCount">{cartCount}</div>}
          </div>
        </li>
      </ul>
      <div className={`dropdown-menu ${isSearchVisible ? "open" : ""}`}>
        <HeaderSearch toggle={toggleSearch} />
      </div>
      <div className={`dropdown-menu ${isCartVisible ? "open" : ""}`}>
        <HeaderCart toggle={toggleCart} />
      </div>
    </nav>
  );
}
export default Header;
