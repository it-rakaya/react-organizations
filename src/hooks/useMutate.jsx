import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useIsRTL } from './useIsRTL';

export function useMutate({
  endpoint,
  mutationKey,
  onError,
  onSuccess,
  formData,
  onMutate,
  method = 'post',
}) {
  const [uploadProgress, setUploadProgress] = useState(0); // Add this line to track upload progress
  const user_token = Cookies.get('token');
  const token = user_token;
  const authorizationHeader = `Bearer ${token}`;
  const isRTL = useIsRTL();
  const baseURL = import.meta.env.VITE_BASE_URL;

  const { data, isLoading, isSuccess, mutate, failureReason, isError, isPending } = useMutation({
    mutationKey,
    mutationFn: (values) => {
      const requestConfig = {
        method: method.toUpperCase(),
        url: `${baseURL}/${endpoint}`,
        data: values,
        headers: formData
          ? {
              'Content-Type': 'multipart/form-data',
              Authorization: authorizationHeader,
              'Accept-Language': isRTL ? 'ar' : 'en',
            }
          : {
              'Content-Type': 'application/json; charset=utf-8',
              Authorization: authorizationHeader,
              'Accept-Language': isRTL ? 'ar' : 'en',
            },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted); // Update upload progress state
        },
      };

      return axios(requestConfig);
    },
    onSuccess,
    onError,
    onMutate,
  });

  // Also return the uploadProgress state so it can be used in your component
  return {
    data,
    isLoading,
    isSuccess,
    mutate,
    failureReason,
    isError,
    isPending,
    uploadProgress, // Include this in the return object
  };
}
