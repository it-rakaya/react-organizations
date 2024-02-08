import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useIsRTL } from "./useIsRTL";
import { notify } from "../utils/toast";

function useFetch({
  endpoint,
  enabled,
  select,
  queryKey,
  onError,
  onSuccess,
  error,
  throwOnError,
}) {
  const user_token = Cookies.get("token");
  const token = user_token;
  const authorizationHeader = `Bearer ${token}`;
  const navigate = useNavigate();
  const isRTL = useIsRTL();
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
      axios.get(`${baseURL}/${endpoint}`, config).then((res) => res.data),
    enabled,
    select,
    error,
    throwOnError,

    onError: (error) => {
      // if (error?.response?.data?.message == "Unauthenticated.") {
      //   localStorage.removeItem("user");
      //   navigate("/");
      //   Cookies.remove("token");
      //   notify("error");
      // }
      if (onError) {
        onError(error);
      }
    },
    onSuccess,
  });
  return query;
}

export default useFetch;
