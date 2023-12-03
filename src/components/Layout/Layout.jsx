import { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
//styles
import "../../assets/styles/Main.scss";

const Layout = ({ children }) => {
  const [preScrim, setPreScrim] = useState(false);
  const toggleScrim = () => {
    setPreScrim(!preScrim);
  };
  return (
    <div className="Layout">
      <Header toggleScrim={toggleScrim} />
      <main>{children}</main>
      {preScrim && <div className="backdrop"></div>  }
      <Footer />
    </div>
  );
};

export default Layout;
