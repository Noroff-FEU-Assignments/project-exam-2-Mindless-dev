import useLocalStorage from "../hooks/useLocalStorage";
import React from "react";

const AuthContext = React.createContext([null, () => {}]);

export const AuthorizationProvider = ({ children }) => {
  const [authorization, setAuthorization] = useLocalStorage("authentication", null);
  return <AuthContext.Provider value={[authorization, setAuthorization]}>{children}</AuthContext.Provider>;
};

export default AuthContext;
