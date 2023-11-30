import { useEffect, useState, useCallback } from "react";
//assets
import "./assets/styles/App.scss";
import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
//Screen
import Main from "./pages/Main/Main";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Cart from "./pages/Cart/Cart";
import NotFound from "./pages/Notfound/Notfound";
import Market from "./pages/Market/Market";
import Detail from "./pages/Detail/Detail";
import Account from "./pages/Account/Account";
import CartContext from "./context/CartContext";
import axios from "axios";

function App() {
  const token = sessionStorage.getItem("token");
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = useCallback(() => {
    if (token) {
      axios
        .get(`${process.env.REACT_APP_BACKEND}cart`, {
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
    }
    else {
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
        setCartCount(total)
      });
    }
  }, [token]);
  
  useEffect(() => {
    updateCartCount();
  }, [updateCartCount]);
  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      <div className="App">
        <Layout>
          <Routes>
            <Route exact path="/" element={<Main />}></Route>
            <Route path="/SignIn" element={<SignIn />}></Route>
            <Route path="/SignUp" element={<SignUp />}></Route>
            <Route path="/Cart" element={<Cart />}></Route>
            <Route path="/Market" element={<Market />}></Route>
            <Route path="/Account" element={<Account />}></Route>
            <Route path="/Detail/:productId" element={<Detail />}></Route>
            <Route path="/*" element={<NotFound />}></Route>
          </Routes>
        </Layout>
      </div>
    </CartContext.Provider>
  );
}

export default App;
