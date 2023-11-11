//import
import { useEffect, useState } from "react";
//style
import "../assets/styles/Cart.scss";
import axios from "axios";

const Cart = () => {
  const [cartList, setCartList] = useState();
  const [totalPrice, setTotalPrice] = useState(0)
  const token = window.sessionStorage.getItem("token");
  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:3001/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setCartList(response.data);
          let total = 0
          Object.values(response.data).forEach(item => {
            item.forEach(item => {
                total += item.price * item.quantity
            })
            setTotalPrice(total)
          })
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [token]);
  const showList = () => {
    if (cartList) {
      let list = Object.values(cartList);
      return list.map((item, index) => {
        return (
          <div key={index} className="cart_container">
            {item.map((item, index) => {
              return (
                <div key={index}>
                  <p>{item.product_name}</p>
                  <p>사이즈: {item.size}</p>
                  <p>수량: {item.quantity}</p>
                  <p>가격: {item.price}</p>
                </div>
              );
            })}
          </div>
        );
      });
    }
  };

  return (
    <div className="cart_bg padding">
      <div className="cart_container">
        <h1>Total: ₩{totalPrice}</h1>
        <hr />
        {showList()}
        <hr />
      </div>
    </div>
  );
};
export default Cart;
