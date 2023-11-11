//import
import { Link, useNavigate } from "react-router-dom";
//style
import "../../assets/styles/Header.scss";

function CartDropdown(props) {
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
        <li onClick={() => props.toggle()}>
          <Link to="/SignIn">Sign In</Link>
        </li>
      );
    }
  };
  const handleLogout = () => {
    window.sessionStorage.removeItem("token"); // 토큰 삭제
    props.toggle();
    navigate("/"); // 홈페이지로 리다이렉트
  };
  return (
    <div className="CartDropdown_Container">
      <p>Your bag is empty</p>
      <ul>
        <li onClick={() => props.toggle()}>
          <Link>My Profile</Link>
        </li>
        <li onClick={() => props.toggle()}>
          <Link to="/Cart">Cart</Link>
        </li>
        <li onClick={() => props.toggle()}>
          <Link>Order</Link>
        </li>
        {isLogin()}
        <li onClick={() => props.toggle()}>
          <Link to="/Account">Account</Link>
        </li>
      </ul>
    </div>
  );
}
export default CartDropdown;
