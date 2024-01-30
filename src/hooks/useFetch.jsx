import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function useFetch({ endpoint, enabled, select, queryKey, onError, onSuccess }) {
  const user_token = Cookies.get("token");
  const token = user_token;
  const authorizationHeader = `Bearer ${token}`;
  const navigate = useNavigate();
  const config = {
    headers: {
      Authorization: authorizationHeader,
    },
  };
  const baseURL = import.meta.env.VITE_BASE_URL;

  const query = useQuery({
    queryKey,

    queryFn: () =>
      axios.get(`${baseURL}/${endpoint}`, config).then((res) => res.data),
    enabled,
    select,

    onError: (error) => {
      console.log("🚀 ~ useFetch ~ error:", error);
      if (error?.message == "Unauthenticated.") {
        localStorage.removeItem("user");
        navigate("/");
        Cookies.remove("token");
      }
      if (onError) {
        console.log("🚀 ~ useFetch ~ onError:", onError);
        onError(error);
      }
    },
    onSuccess,
  });
  return query;
}

export default useFetch;
