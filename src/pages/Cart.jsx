//import
import { useEffect, useState } from "react";
//style
import "../assets/styles/Cart.scss";
import axios from "axios";

const Cart = () => {
  const [cartList, setCartList] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
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
          setCartList(response.data);
          let total = 0;
          Object.values(response.data).forEach((item) => {
            item.forEach((item) => {
              total += item.price * item.quantity;
            });
            setTotalPrice(total.toLocaleString());
          });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      let storageObject = {};

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);

        storageObject[key] = JSON.parse(value);
      }
      setCartList(storageObject)
      let total = 0
      Object.values(storageObject).forEach((item) => {
        item.forEach((item) => {
          total += item.price * item.quantity
        })
        setTotalPrice(total.toLocaleString())
      })
    }
  }, []);
  const showList = () => {
    if (cartList) {
      let list = Object.values(cartList);
      return list.map((item, index) => {
        return (
          <div key={index} className="cart_container">
            {item.map((item, index) => {
              console.log(item.productId)
              axios.get(`http://localhost:3001/products/${item.productId}`)
              .then(response => {
                item.MainImgURL = response.data.MainImgURL;
                console.log(item.MainImgURL)
              })
              .catch(err => {
                console.error(err);
              });
              return (
                <div key={index}>
                  <img src={item.MainImgURL} alt="" />
                  <p>{item.productName}</p>
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
