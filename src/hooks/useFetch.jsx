import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { notify } from "../utils/toast";
import { useNavigate } from "react-router-dom";
// import { UseOrg } from "../context/organization provider/OrganizationProvider";

function useFetch({ endpoint, enabled, select, queryKey, onError, onSuccess }) {
  const user_token = Cookies.get("token");
  const token = user_token;
  const authorizationHeader = `Bearer ${token}`;
  const navigate = useNavigate();
  // const { orgData } = UseOrg();
  // console.log("🚀 ~ file: useFetch.jsx:14 ~ useFetch ~ orgData:", orgData)

  const config = {
    headers: {
      Authorization: authorizationHeader,
      // Origin: "africa.rmcc.sa",
    },
  };

  const query = useQuery({
    queryKey,
    queryFn: () =>
      axios
        .get(`https://admin.rmcc.sa/api/${endpoint}`, config)
        .then((res) => res.data),
    enabled,
    select,
    onError: (error) => {
      notify("error", error?.response?.data?.message);
      if (error?.response?.data?.message == "Unauthenticated.") {
        localStorage.removeItem("user");
        navigate("/login");
        Cookies.remove("token");
      }
      if (onError) {
        onError(error);
      }
    },
    onSuccess,
  });
  return query;
}

export default useFetch;
