import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
//style
import "../../assets/styles/Auth.scss";
//assets
import Logo from "../../assets/images/NshesLogo.png";
import arrowBK from "../../assets/icons/right-errowBK.png";
import axios from "axios";

export const backend =
  "https://port-0-nshoes-backend-1igmo82clotxbvvk.sel5.cloudtype.app/";

function SignIn() {
  const [idValue, setId] = useState("");
  const [pwValue, setPw] = useState("");
  const [pwAct, setPwAct] = useState(false);
  const navigate = useNavigate();

  const idCheck = () => {
    return idValue !== "";
  };

  const pwCheck = () => {
    return pwValue !== "";
  };

  const togglePw = (e) => {
    e.preventDefault();
    setPwAct(!pwAct);
  };

  const isfilled = (e) => {
    const newValue = e.target.value;
    setId(newValue);
  
    if (newValue === "") {
      setPwAct(false);
      setPw("");
    }
    if (e.key === "Enter") {
      togglePw(e); // 이벤트 객체 e를 전달
    }
  };
  const signSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${backend}login`, {
        email: idValue,
        password: pwValue,
      })
      .then((response) => {
        console.log(response.data);
        window.alert("로그인에 성공했습니다!");
        window.sessionStorage.setItem("token", response.data.token);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        window.alert("로그인에 실패했습니다");
      });
  };

  return (
    <div className="AuthLayout">
      <h1>Sign in with your Email</h1>
      <div className="AuthCenterLayout">
        <div className="SignTitle">
          <h2>Sign in to</h2>
          <img src={Logo} alt="logo" />
        </div>
        <div className="InputLayout">
          <form onSubmit={togglePw}>
            <input
              type="mail"
              placeholder="Enter your Email"
              value={idValue}
              onChange={isfilled}
              onKeyDown={isfilled}
            />
            {idCheck() && !pwAct && (
              <button type="submit">
              <img src={arrowBK} alt="arrow" />
              </button>
            )}
          </form>
        </div>
        {pwAct && (
          <div className="InputLayout">
            <form onSubmit={signSubmit}>
              <input
                type="password"
                placeholder="Enter your Password"
                value={pwValue}
                onChange={(e) => setPw(e.target.value)}
              />
              {pwCheck() && (
                <button type="submit">
                  <img src={arrowBK} alt="arrow" />
                </button>
              )}
            </form>
          </div>
        )}
        <Link to="/SignUp">
          <p>Create Account</p>
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
