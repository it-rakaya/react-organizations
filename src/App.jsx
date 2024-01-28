import { useIsRTL } from "./hooks/useIsRTL";
import { AllRoutesProvider } from "./routing/allRoutes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useLayoutEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetch from "./hooks/useFetch";
import { useAuth } from "./context/auth-and-perm/AuthProvider";

const App = () => {
  ///
  const isRTL = useIsRTL();
  useLayoutEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = isRTL ? "ar" : "en";
  }, []);
  useEffect(() => {
    const darkModeSetting = localStorage.getItem("darkMode");
    console.log("🚀 ~ useEffect ~ darkModeSetting:", darkModeSetting)
    if (darkModeSetting === "true") {
      document.documentElement.classList.add("dark");
    }else{
      document.documentElement.classList.remove("dark");

    }
  }, []);


  return (
    <>
      <AllRoutesProvider />
      <ToastContainer rtl={isRTL} />
      <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"} />
      {/* </Box> */}
    </>
  );
};
export default App;
