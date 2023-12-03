/* eslint-disable react/prop-types */
import Cookies from "js-cookie";
import { createContext, useCallback, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { UseLocalStorage } from "../../hooks/useLocalStorage";
import { useUser } from "../user provider/UserContext";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = UseLocalStorage();
  const navigate = useNavigate();
  const { refetch } = useUser();

  const login = useCallback(
    async (data) => {
      if (setUser) setUser(data);
      refetch()
      window.localStorage.setItem("user", JSON.stringify(data.user));
      Cookies.set("role", data.user.role_name);
      Cookies.set("token", data.token);
      navigate("/", { replace: true });
    },
    [navigate, refetch, setUser]
  );

  const logout = useCallback(async () => {
    if (setUser) setUser(null);
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("token");
    Cookies.remove("role");
    Cookies.remove("token");

    refetch()
    navigate("/login", { replace: true });
  }, [setUser, refetch, navigate]);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [login, logout, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
