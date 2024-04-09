import { createContext, useContext, useState, useEffect } from "react";
import { PropTypes } from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    verifyUser();
  }, []);

  const verifyUser = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/`, {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Unauthorized user: ${response.status}`);
      }
      const data = await response.json();

      if (data.status) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    } catch (err) {
      console.error("Authentication verification error:", err);
      setIsAuth(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuth }}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/* eslint-disable react-refresh/only-export-components */
export const useAuth = () => {
  return useContext(AuthContext) || { isAuth: false };
};
