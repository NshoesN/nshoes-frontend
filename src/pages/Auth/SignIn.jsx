import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
//style
import "../../assets/styles/Auth.scss";
//assets
import Logo from "../../assets/images/NshesLogo.png";
import arrow from "../../assets/icons/emojione-monotone_right-arrow.png";
import axios from "axios";

export const backend = 'https://port-0-nshoes-backend-1igmo82clotxbvvk.sel5.cloudtype.app/'

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

  const togglePw = () => {
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
      togglePw();
    }
  };
  const signSubmit = () => {
    axios
      .post(`${backend}login`, {
        email: idValue,
        password: pwValue,
      })
      .then((response) => {
        console.log(response.data);
        window.alert("로그인에 성공했습니다!"); // 알림 표시
        window.sessionStorage.setItem('token', response.data.token); // 토큰 저장
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        window.alert("로그인에 실패했습니다"); // 오류 알림 표시
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
          <input
            type="mail"
            placeholder="Enter your Email"
            value={idValue}
            onChange={isfilled}
            onKeyDown={isfilled}
          />
          {idCheck() && (
            <img src={arrow} alt="arrow" onClick={() => togglePw()} />
          )}
        </div>
        {pwAct && (
          <div className="InputLayout">
            <input
              type="password"
              placeholder="Enter your Password"
              value={pwValue}
              onChange={(e) => setPw(e.target.value)}
            />
            {pwCheck() && <img src={arrow} alt="arrow" onClick={signSubmit} />}
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
