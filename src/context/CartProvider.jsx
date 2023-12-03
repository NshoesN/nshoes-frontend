import React, { useContext, useState } from "react";
import { CartProvider } from "./CartContext";
import AuthContext from "./AuthContext";
import axios from "axios";

const CartProviderComponent = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = useCallback(() => {
    if (isLoggedIn) {
      axios
        .get(`${process.env.REACT_APP_BACKEND}cart`)
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
      let storageObject = {};

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);

        storageObject[key] = JSON.parse(value);
      }
      let total = 0;
      Object.values(storageObject).forEach((item) => {
        item.forEach((item) => {
          total += item.quantity;
        });
        setCartCount(total);
      });
    }
  }, [isLoggedIn]);
  useEffect(() => {
    updateCartCount();
  }, [updateCartCount]);

  return (
    <CartProvider value={{ cartCount, updateCartCount }}>
      {children}
    </CartProvider>
  );
};

export default CartProviderComponent;
