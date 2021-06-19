import React, { useState, createContext } from "react";

const AccessTokenContext = createContext({});

export const AccessTokenContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState("");

  return (
    <AccessTokenContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AccessTokenContext.Provider>
  );
};

export const getAccessTokenContext = () => {
  if (!AccessTokenContext) {
    throw new Error("Access Token Context not found !");
  }
  return AccessTokenContext;
};
