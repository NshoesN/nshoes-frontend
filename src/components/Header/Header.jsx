//import
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
//style
import "../../assets/styles/Header.scss";
//assets
import Logo from "../../assets/images/NshesLogo.png";
import Search from "../../assets/icons/Search.png";
import Shopping from "../../assets/icons/shopping.png";
//component
import HeaderSearch from "./SearchDropdown";
import HeaderCart from "./CartDropdown";
import axios from "axios";

function Header() {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isCartVisible, setCartVisible] = useState(false);
  const [cartCount, setCartCount] = useState(0);
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
  useEffect(() => {
  const token = window.sessionStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:3001/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          let total = 0;
          Object.values(response.data).forEach((item) => {
            item.forEach((item) => {
              total += item.quantity;
            });
            setCartCount(total);
          });
        });
    } else {
      let total = 0;
  
      let cartItems = JSON.parse(window.localStorage.getItem('cartItems'));
      if (cartItems) {
        cartItems.forEach((item) => {
          total += item.quantity;
        });
      }
      
      let cartItem = JSON.parse(window.localStorage.getItem('cartItem'));
      if (cartItem) {
        total += cartItem.quantity;
      }
  
      setCartCount(total);
    }
  });
  

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
