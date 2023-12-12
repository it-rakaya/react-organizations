import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

export function useMutate({
  endpoint,
  mutationKey,
  onError,
  onSuccess,
  formData,
  onMutate,
  method = "post",
}) {
  const user_token = Cookies.get("token");
  const token = user_token;
  const authorizationHeader = `Bearer ${token}`;

  const { data, isLoading, isSuccess, mutate, failureReason, isError ,isPending } =
    useMutation({
      mutationKey,
      mutationFn: (values) => {
        const requestConfig = {
          method: method.toUpperCase(), // Use the specified method
          url: `https://admin.rmcc.sa/api/${endpoint}`,
          data: values,
          headers: formData
            ? {
                "Content-Type": "multipart/form-data",
                Authorization: authorizationHeader,
                origin: "africa-dev.rmcc.sa",
                mode:'cors'

              }
            : {
                "Content-Type": "application/json; charset=utf-8",
                Authorization: authorizationHeader,
                origin: "africa-dev.rmcc.sa",
                mode:'cors'

              },
        };

        return axios(requestConfig);
      },
      onSuccess,
      onError,
      onMutate,
    });
  return { data, isLoading, isSuccess, mutate, failureReason, isError , isPending };
}
