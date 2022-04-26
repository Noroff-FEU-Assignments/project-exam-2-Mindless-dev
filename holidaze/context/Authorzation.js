import React, { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = React.createContext([null, () => {}]);

export const AuthorizationProvider = ({ children }) => {
  const [authorization, setAuthorization] = useLocalStorage("authentication", null);
  return <AuthContext.Provider value={[authorization, setAuthorization]}>{children}</AuthContext.Provider>;
};

export default AuthContext;
