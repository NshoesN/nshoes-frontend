import { useState } from 'react';
//style
import '../assets/styles/Auth.scss';
//assets

function SignUp() {
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwdValue, setPasswdValue] = useState('');
  const [passwdcheckValue, setPasswdcheckValue] = useState('');
  const [sameCheck, setSameCheck] = useState(false);

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

  return (
    <div className="AuthLayout">
      <h1>Create Account</h1>
      <div className="AuthCenterLayout">
        <div className="SignTitle">
          <h2>Name</h2>
        </div>
        <div className='InputLayout'>
          <input
            type="text"
            placeholder='Enter your Name'
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
          />
        </div>
        <div className='SignTitle'>
            <h2>Email</h2>
        </div>
        <div className='InputLayout'>
          <input
            type="text"
            placeholder='Enter your Email'
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
          />
        </div>
        <div className='SignTitle'>
            <h2>Password</h2>
        </div>
        <div className='InputLayout'>
          <input
            type="password"
            placeholder='Enter your Password'
            value={passwdValue}
            onChange={(e) => setPasswdValue(e.target.value)}
          />
        </div>
        <div className={`InputLayout ${sameCheck ? 'success' : 'error'}`}>
          <input
            type="password"
            placeholder='Enter your Password Check'
            value={passwdcheckValue}
            onChange={pswdcheck}
          />
        </div>
        <button type='submit'>Create Account</button>
      </div>
    </div>
  );
}

export default SignUp;
