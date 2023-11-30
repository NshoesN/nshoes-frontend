import { useState } from "react";
import Header from "../Header/Header";
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
    </div>
  );
};

export default Layout;
