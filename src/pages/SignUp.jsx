import { useState } from "react";
import axios from "axios";
//style
import "../assets/styles/Auth.scss";
import { useNavigate } from "react-router-dom";
//assets

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

    // 비밀번호 확인과 비밀번호를 비교하여 sameCheck 업데이트
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
    axios.post('http://localhost:3001/register', {
      "name": nameValue,
      "email": emailValue,
      "password": passwdValue
    })
    .then(response => {
      console.log(response.data);
      window.alert('회원가입에 성공했습니다!');  // 알림 표시
      navigate("/Signin");  // 요청이 성공적으로 완료된 후에 페이지 이동
    })
    .catch(err => {
      console.error(err);
      window.alert('회원가입에 실패했습니다');  // 오류 알림 표시
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
        <button type="submit" onClick={toggle_submit}>
          Create Account
        </button>
      </div>
    </div>
  );
}

export default SignUp;
