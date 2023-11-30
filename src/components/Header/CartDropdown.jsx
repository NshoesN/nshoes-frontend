//import
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
//style
import "../../assets/styles/Header.scss";
//components
import CartContext from "../../context/CartContext";

function CartDropdown(props) {
  const { cartCount } = useContext(CartContext);
  const token = window.sessionStorage.getItem("token");
  const navigate = useNavigate();
  const isLogin = () => {
    if (token) {
      return (
        <li onClick={handleLogout}>
          <Link>Log Out</Link>
        </li>
      );
    } else {
      return (
        <li onClick={() => {props.toggle();props.toggleScrim()}}>
          <Link to="/SignIn">Sign In</Link>
        </li>
      );
    }
  };
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    props.toggle();
    props.toggleScrim();
    navigate("/");
  };
  return (
    <div className="CartDropdown_Container">
      <p>{cartCount === 0 ? 'Your bag is empt' : `${cartCount} Item in your bag`}</p>
      <ul>
        <li onClick={() => {props.toggle();props.toggleScrim()}}>
          <Link>My Profile</Link>
        </li>
        <li onClick={() => {props.toggle();props.toggleScrim()}}>
          <Link to="/Cart">Cart</Link>
        </li>
        <li onClick={() => {props.toggle();props.toggleScrim()}}>
          <Link>Order</Link>
        </li>
        {isLogin()}
        <li onClick={() => {props.toggle();props.toggleScrim()}}>
          <Link to="/Account">Account</Link>
        </li>
      </ul>
    </div>
  );
}
export default CartDropdown;
