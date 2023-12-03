//import
import { useContext, useEffect, useState } from "react";

//style
import "../../assets/styles/Cart.scss";
import "../../assets/styles/Flex.scss";
import axios from "axios";
import CartContext from "../../context/CartContext";

export const backend =
  "https://port-0-nshoes-backend-1igmo82clotxbvvk.sel5.cloudtype.app/";

const Cart = () => {
  const { updateCartCount } = useContext(CartContext);
  const [cartList, setCartList] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [productList, setProductList] = useState();

  useEffect(() => {
    const token = window.sessionStorage.getItem("token");

    axios
      .get(`${process.env.REACT_APP_BACKEND}products`)
      .then((response) => {
        setProductList(response.data);
      });

    if (token) {
      axios
        .get(`${process.env.REACT_APP_BACKEND}cart`, {
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
      setCartList(storageObject);
      let total = 0;
      Object.values(storageObject).forEach((item) => {
        item.forEach((item) => {
          total += item.price * item.quantity;
        });
        setTotalPrice(total.toLocaleString());
      });
    }
  }, []);

  const deleteItem = (itemId) => {
    const token = window.sessionStorage.getItem("token");
    if (token) {
      axios
        .delete(`${process.env.REACT_APP_BACKEND}cart/${itemId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          axios
            .get(`${process.env.REACT_APP_BACKEND}cart`, {
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
              updateCartCount();
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
    }
  };
  const showList = () => {
    if (cartList && productList) {
      let list = Object.values(cartList);
      return list.map((item, index) => {
        return (
          <div key={index} className="cart_container">
            {item.map((item, index) => {
              const product = productList.find(
                (productItem) => productItem.Id === item.product_id
              );
              return (
                <div key={index} className="cart_item">
                  <img src={product?.MainImgURL} alt="" />
                  <div className="check">
                    <p>{item.product_name}</p>
                    <p>count: {item.quantity}</p>
                    <p>size: {item.size}</p>
                    <p>₩ {item.price.toLocaleString()}</p>
                    <div className="both">
                      <p>More Info</p>
                      <p onClick={() => deleteItem(item.id)}>Delete</p>
                    </div>
                  </div>
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
        <button>Order</button>
      </div>
    </div>
  );
};
export default Cart;
