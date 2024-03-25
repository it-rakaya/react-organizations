import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useIsRTL } from "./useIsRTL";

function useFetch({ endpoint, enabled, select, queryKey, onError, onSuccess }) {
  const user_token = Cookies.get("token");
  const token = user_token;
  const authorizationHeader = `Bearer ${token}`;
  const isRTL = useIsRTL();
  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: authorizationHeader,
      "Accept-Language": isRTL ? "ar" : "en",
    },
  };
  const baseURL = import.meta.env.VITE_BASE_URL;

  const query = useQuery({
    queryKey,
    queryFn: () =>
      axios
        .get(`${baseURL}/${endpoint}`, config)
        .then((res) => res.data)
        .catch((err) => {
          console.log("🚀 ~ err:", err);
          if (
            err.response.data.message == "Unauthenticated." ||
            err.response.status == 403 ||
            err.response.status == 401
          ) {
            window.localStorage.removeItem("user");
            window.localStorage.removeItem("token");
            window.localStorage.setItem("token", null);
            Cookies.remove("token");

            navigate("/", { replace: true }); 
            throw new Error("unauthenticated");
          }
          throw err;
        }),
    enabled,
    select,
    onError: (error) => {
      if (error.message === "unauthenticated") {
        console.log("🚀 ~ error.message:", error.message);

        // Perform specific actions like redirecting the user to the login page.
      }
      if (onError) {
        onError(error); // Call the onError callback if provided.
      }
    },
    onSuccess,
  });
  return query;
}

export default useFetch;
