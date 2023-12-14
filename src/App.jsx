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
  ///
  /////////// STATES
  ///

  ///
  /////////// SIDE EFFECTS
  ///
  const isDark = localStorage.getItem("darkMode");
  console.log("🚀 ~ file: Root.jsx:23 ~ Root ~ isDark:", isDark);

  // useEffect(() => {
  //   if (isDark) {
  //     document.body.classList.add("dark");
  //   }
  //   document.body.classList.remove("dark");
  // }, [isDark]);

  useLayoutEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = isRTL ? "ar" : "en";
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
