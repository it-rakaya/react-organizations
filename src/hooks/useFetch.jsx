import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useIsRTL } from "./useIsRTL";

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

    onError: () => {
      if (onError) {
        onError(error);
      }
    },
    onSuccess,
  });
  return query;
}

export default useFetch;
