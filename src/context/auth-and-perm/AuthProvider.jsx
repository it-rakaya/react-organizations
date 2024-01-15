/* eslint-disable react/prop-types */
import Cookies from "js-cookie";
import { createContext, useCallback, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { UseLocalStorage } from "../../hooks/useLocalStorage";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = UseLocalStorage("user");
  const navigate = useNavigate();
  const login = useCallback(
    async (data) => {
      if (setUser) setUser(data.user);
      Cookies.set("role", data.user.role_name);
      Cookies.set("token", data.token);
      navigate("/dashboard", { replace: true });
    },
    [navigate, setUser]
  );

  const logout = useCallback(async () => {
    if (setUser) setUser(null);
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("token");
    Cookies.remove("role");
    Cookies.remove("token");
    

    navigate("/", { replace: true });
  }, [setUser, navigate]);

  const value = useMemo(
    () => ({
      user,
      setUser,
      login,
      logout,
    }),
    [login, logout, user , setUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
