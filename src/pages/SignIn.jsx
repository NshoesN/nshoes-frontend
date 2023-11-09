import { Link } from 'react-router-dom';
import { useState } from 'react';
//style
import '../assets/styles/Auth.scss';
//assets
import Logo from '../assets/images/NshesLogo.png';
import arrow from '../assets/icons/emojione-monotone_right-arrow.png';

function SignIn() {
  const [idValue, setId] = useState('');
  const [pwValue, setPw] = useState('');
  const [pwAct, setPwAct] = useState(false);

  const idCheck = () => {
    return idValue !== '';
  };

  const pwCheck = () => {
    return pwValue !== '';
  };

  const togglePw =  () => {
    setPwAct(!pwAct);
  }

  const isfilled = (e) => {
    const newValue = e.target.value;
    setId(newValue);

    if (newValue === '') {
      setPwAct(false);
      setPw('')
    }
    if (e.key === 'Enter') {
      togglePw()
    }
  }

  return (
    <div className="AuthLayout">
      <h1>Sign in with your Email</h1>
      <div className="AuthCenterLayout">
        <div className="SignTitle">
          <h2>Sign in to</h2>
          <img src={Logo} alt="logo" />
        </div>
        <div className='InputLayout'>
          <input
            type="text"
            placeholder='Enter your Email'
            value={idValue}
            onChange={isfilled}
            onKeyDown={isfilled}
          />
          {idCheck() && <img src={arrow} alt="arrow" onClick={() => togglePw()}/>}
        </div>
        { pwAct &&<div className='InputLayout'>
          <input
            type="password"
            placeholder='Enter your Password'
            value={pwValue}
            onChange={(e) => setPw(e.target.value)}
          />
          {pwCheck() && <img src={arrow} alt="arrow" />}
        </div>}
        <Link to='/SignUp'>
          <p>Create Account</p>
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
