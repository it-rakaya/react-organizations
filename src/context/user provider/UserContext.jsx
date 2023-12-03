/* eslint-disable no-unused-vars */
// UserContext.js
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  // const [userData, setUserData] = useState(null);
  // const [user_token , setToken] = useState()
  const user_token = Cookies.get("token");
  // const authorizationHeader = `Bearer ${user_token}`;

  // const config = {
  //   headers: { Authorization: authorizationHeader },
  // };
  // const fetchUserData = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://admin.rakaya.co/api/users/info",
  //       config
  //     );
  //     const data = await response.json();
  //     setUserData(data);
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   }
  // };
  const { data: userData, refetch , isRefetching } = useFetch({
    endpoint: `users/info`,
    queryKey: ["users_info"],


    onError(e) {
      console.log("e", e);
    },
    enabled:user_token ? true : false
  });
  // Fetch user data on component mount (you can customize this behavior)
  useEffect(() => {
    // refetch();
  }, [refetch]);

  return (
    <UserContext.Provider value={{ userData, refetch , isRefetching   }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
