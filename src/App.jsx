import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useIsRTL } from "./hooks/useIsRTL";
import { AllRoutesProvider } from "./routing/allRoutes";

const App = () => {
  ///
  const isRTL = useIsRTL();
  useEffect(() => {
    if (isRTL) {
      document.documentElement.lang = "ar";
      document.documentElement.setAttribute("dir", "rtl");
    } else {
      document.documentElement.lang = "en";
      document.documentElement.setAttribute("dir", "ltr");
    }
  }, [isRTL]);

  useEffect(() => {
    const darkModeSetting = localStorage.getItem("darkMode");
    if (darkModeSetting === "true") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <>
      <AllRoutesProvider />
      <ToastContainer rtl={isRTL} />
      {/* <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"} /> */}
      {/* </Box> */}
    </>
  );
};
export default App;
