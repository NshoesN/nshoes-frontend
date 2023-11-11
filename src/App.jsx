//assets
import "./assets/styles/App.scss";
import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
//Screen
import Main from "./pages/Main";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart"
import NotFound from "./pages/Notfound";
import Market from "./pages/Market";
import Detail from "./pages/Detail";
import Account from "./pages/Account"
//data

function App() {
  return (
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
  );
}

export default App;
