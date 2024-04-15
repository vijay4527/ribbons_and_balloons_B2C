"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import Head from "next/head";
const AuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
