/////////// IMPORTS
///
import { useIsRTL } from "./hooks/useIsRTL";
import { AllRoutesProvider } from "./routing/allRoutes";
// import { router } from "./routing/allRoutes"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useLayoutEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  /////////// VARIABLES
  ///

  ///
  /////////// CUSTOM HOOKS
  ///
  const isRTL = useIsRTL();


  useLayoutEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = isRTL ? "ar" : "en";
  }, []);
  useEffect(() => {
    const darkModeSetting = localStorage.getItem("darkMode");
    if (darkModeSetting === "true") {
      document.documentElement.classList.add("dark");
    }
  }, []);
  
  /////////// FUNCTIONS | EVENTS | IF CASES
  ///

  ///

  // const { visible, toggle, open, close } = useLoadingOverlay();

  return (
    <>
      {/* <Breadcrumbs/> */}
      {/* <Box pos="relative">
        <LoadingOverlay
          visible={visible}
          zIndex={10000}
          loader={<Spinner />}
          overlayColor="black"
          overlayOpacity={0.9}
        /> */}
      <AllRoutesProvider />
      <ToastContainer rtl={isRTL} />
      <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"} />
      {/* </Box> */}
    </>
  );
};
export default App;
