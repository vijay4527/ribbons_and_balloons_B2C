"use client"
import React, { createContext, useState } from 'react';

export const AuthOtpContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <AuthOtpContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </AuthOtpContext.Provider>
  );
};

export default AuthProvider;
