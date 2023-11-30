import React, { useState } from "react";
import { AuthProvider } from "./AuthContext";

const AuthProviderComponent = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logIn = () => setIsLoggedIn(true);
  const logOut = () => setIsLoggedIn(false);

  return (
    <AuthProvider value={{ isLoggedIn, logIn, logOut }}>
      {children}
    </AuthProvider>
  );
};

export default AuthProviderComponent;
