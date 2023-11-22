import { useState } from "react";
import axios from "axios";
//style
import "../../assets/styles/Auth.scss";
import { useNavigate } from "react-router-dom";
//assets

export const backend = 'https://port-0-nshoes-backend-1igmo82clotxbvvk.sel5.cloudtype.app/'

function SignUp() {
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwdValue, setPasswdValue] = useState("");
  const [passwdcheckValue, setPasswdcheckValue] = useState("");
  const [sameCheck, setSameCheck] = useState(false);
  const navigate = useNavigate();

  const pswdcheck = (e) => {
    const newcheck = e.target.value;
    setPasswdcheckValue(newcheck);

    if (passwdValue === newcheck) {
      setSameCheck(true);
    } else {
      setSameCheck(false);
    }
  };
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPasswdValue(newPassword);
    
    if (passwdcheckValue === newPassword) {
      setSameCheck(true);
    } else {
      setSameCheck(false);
    }
  };  
  const toggle_submit = () => {
    axios.post(`${backend}register`, {
      "name": nameValue,
      "email": emailValue,
      "password": passwdValue
    })
    .then(response => {
      console.log(response.data);
      window.alert('회원가입에 성공했습니다!');
      navigate("/Signin");
    })
    .catch(err => {
      console.error(err);
      window.alert('회원가입에 실패했습니다'); 
    });
  };
  

  return (
    <div className="AuthLayout">
      <h1>Create Account</h1>
      <div className="AuthCenterLayout">
        <div className="SignTitle">
          <h2>Name</h2>
        </div>
        <div className="InputLayout">
          <input
            type="text"
            placeholder="Enter your Name"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
          />
        </div>
        <div className="SignTitle">
          <h2>Email</h2>
        </div>
        <div className="InputLayout">
          <input
            type="text"
            placeholder="Enter your Email"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
          />
        </div>
        <div className="SignTitle">
          <h2>Password</h2>
        </div>
        <div className="InputLayout">
          <input
            type="password"
            placeholder="Enter your Password"
            value={passwdValue}
            onChange={handlePasswordChange}
          />
        </div>
        <div className={`InputLayout ${sameCheck ? "success" : "error"}`}>
          <input
            type="password"
            placeholder="Enter your Password Check"
            value={passwdcheckValue}
            onChange={pswdcheck}
          />
        </div>
        <button type="submit" onClick={toggle_submit} id="button">
          Create Account
        </button>
      </div>
    </div>
  );
}

export default SignUp;
