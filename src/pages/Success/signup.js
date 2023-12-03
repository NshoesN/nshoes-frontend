import React from 'react';
import { Link } from 'react-router-dom';

const successStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  background: 'linear-gradient(white, black)',
  color: 'white',
  textAlign: 'center',
};

const titleStyle = {
  fontSize: '4em',
  marginBottom: '1em',
};

const contentStyle = {
  fontSize: '1.2em',
};

const buttonStyle = {
  marginTop: '2em',
  padding: '10px 20px',
  fontSize: '1em',
  color: 'white',
  backgroundColor: '#117EFE',
  borderRadius: '10px',
  border: 'none',
  cursor: 'pointer',
};

function SignUpSuccess() {
  return (
    <div style={successStyle}>
      <h1 style={titleStyle}>Welcome</h1>
      <p style={contentStyle}>Successful SignUp</p>
      <Link to="/Signin">
        <button style={buttonStyle}>Login</button>
      </Link>
    </div>
  );
}

export default SignUpSuccess
