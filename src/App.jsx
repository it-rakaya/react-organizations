import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useIsRTL } from "./hooks/useIsRTL";
import { AllRoutesProvider } from "./routing/allRoutes";
import { registerSW } from "virtual:pwa-register";
import { UseOrg } from "./context/organization provider/OrganizationProvider";
const App = () => {
  ///
  const isRTL = useIsRTL();
  const { orgData } = UseOrg();
  console.log("🚀 ~ App ~ org:", orgData);
  const updateSW = registerSW({
    onNeedRefresh() {},
    onOfflineReady() {},
  });
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
  useEffect(() => {
    var manifestLink = document.querySelector('link[rel="manifest"]');
    console.log("🚀 ~ useEffect ~ manifestLink:", manifestLink);
    fetch(manifestLink.href)
      .then((response) => response.json())
      .then((manifest) => {
        manifest.start_url = window.location.href; // تحديث start_url
        var blob = new Blob([JSON.stringify(manifest)], {
          type: "application/json",
        });
        var newUrl = URL.createObjectURL(blob);
        manifestLink.href = newUrl;
      });
  }, []);
  useEffect(() => {
    var manifestLink = document.querySelector('link[rel="manifest"]');
    fetch(manifestLink.href)
      .then((response) => response.json())
      .then((manifest) => {
        manifest.short_name = orgData?.organizations?.name || "Rakaya";
        manifest.name = orgData?.organizations?.name || "Rakaya";
        manifest.start_url = orgData?.organizations?.domain;

        var blob = new Blob([JSON.stringify(manifest)], {
          type: "application/json",
        });
        var newUrl = URL.createObjectURL(blob);
        manifestLink.href = newUrl;
      });
  }, [orgData]);
  return (
    <>
      <AllRoutesProvider />
      <ToastContainer rtl={isRTL} />
    </>
  );
};
export default App;
