//import
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
//style
import "../../assets/styles/Flex.scss";
import "../../assets/styles/Header.scss";
//assets
import Logo from "../../assets/images/NshesLogo.png";
import Search from "../../assets/icons/Search.png";
import SearchMobile from "../../assets/icons/search-mobile.png";
import Shopping from "../../assets/icons/shopping.png";
import Burger from "../../assets/icons/hamburger.png";
//component
import HeaderSearch from "./SearchDropdown";
import HeaderCart from "./CartDropdown";
import CartContext from "../../context/CartContext";
import { Mobile, PC } from "../Layout/Responsive";

function Header(props) {
  const { cartCount } = useContext(CartContext);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isCartVisible, setCartVisible] = useState(false);
  const [isInfoOpen, setInfoOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleInfo = () => {
    setInfoOpen(!isInfoOpen)
    if (!isInfoOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }

  const toggleSearch = () => {
    if (isCartVisible === false || isCartVisible === undefined) {
      props.toggleScrim();
    }
    setSearchVisible(!isSearchVisible);
    if (isCartVisible === true) {
      setCartVisible(!isCartVisible);
    }
    if (!isSearchVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const toggleCart = () => {
    if (isSearchVisible === false || isSearchVisible === undefined) {
      props.toggleScrim();
    }
    setCartVisible(!isCartVisible);
    if (isSearchVisible === true) {
      setSearchVisible(!isSearchVisible);
    }
    if (!isCartVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };
  const toggleLogo = () => {
    if (isCartVisible === true || isSearchVisible === true) {
    props.toggleScrim();
    }
    navigate('/');
  }

  useEffect(() => {
    setSearchVisible(undefined);
    setCartVisible(undefined);
  }, [location]);

  const Infoselect = () => {
  return (
    <div className={`infoContainer ${isInfoOpen ? 'open' : ''}`}>
      <ul>
        <li onClick={toggleInfo}>
          <Link to='SignIn'>Account</Link>
        </li>
        <li onClick={toggleInfo}>
          <Link to='/Cart'>Cart</Link>
        </li>
        <li onClick={toggleInfo}>
          <Link to='/Market'>Market</Link>
        </li>
        <li onClick={toggleInfo}>
          <Link to='/New'>Show Room</Link>
        </li>
      </ul>
    </div>
  )
}

  return (
    <>
      <PC>
        <nav className="header-container">
          <div className="flex_column header-item">
            <ul className="nav-list">
              <li className="nav-item" onClick={toggleLogo}>
                  <img src={Logo} alt="logo" id="Logo" />
              </li>
              <li className="nav-item">
                <Link to="/Market">Market</Link>
              </li>
              <li className="nav-item">
                <Link to="/New">Show Room</Link>
              </li>
              <li className="nav-item">
                <Link to="/New">New Releases</Link>
              </li>
              <li className="nav-item">
                <Link to>SNKRS</Link>
              </li>
              <li className="nav-item">
                <img src={Search} alt="search" onClick={toggleSearch} />
                <div onClick={toggleCart}>
                  <img src={Shopping} alt="shopping" />
                  {cartCount > 0 && (
                    <div className="cartCount">{cartCount}</div>
                  )}
                </div>
              </li>
            </ul>
            <div
              className={`dropdown-menu ${isSearchVisible === undefined ? "" : isSearchVisible ? "open" : "close"}`}
            >
              <HeaderSearch toggle={toggleSearch} className="content" toggleScrim={props.toggleScrim} />
            </div>
            <div
              className={`dropdown-menu ${isCartVisible === undefined ? "" : isCartVisible ? "open" : "close"}`}
            >
              <HeaderCart toggle={toggleSearch} className="content" toggleScrim={props.toggleScrim} />
            </div>
          </div>
        </nav>
      </PC>
      <Mobile>
        <div className="header-container">
          <div className="flex_column">
            <ul className="nav-list">
              <li>
                <Link>
                  <img src={SearchMobile} alt="search" />
                </Link>
              </li>
              <li>
                <Link to="/">
                  <img src={Logo} alt="logo" id="Logo" />
                </Link>
              </li>
              <li>
                <Link onClick={toggleInfo}>
                  <img src={Burger} alt="burger" />
                </Link>
              </li>
            </ul>
            {isInfoOpen && <Infoselect />}
            {/* <Searchselect /> */}
          </div>
        </div>
      </Mobile>
    </>
  );
}
export default Header;
