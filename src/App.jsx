import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerSW } from "virtual:pwa-register";
import { UseOrg } from "./context/organization provider/OrganizationProvider";
import { useIsRTL } from "./hooks/useIsRTL";
import { AllRoutesProvider } from "./routing/allRoutes";
const App = () => {
  const isRTL = useIsRTL();
  const { orgData } = UseOrg();
  const navigate = useNavigate();

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
    fetch(manifestLink.href)
      .then((response) => response.json())
      .then((manifest) => {
        manifest.start_url = window.location.href;
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

        manifest.icons = [
          {
            src: orgData?.organizations?.logo || "path/to/default/icon.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
        ];

        manifest.background_color =
          orgData?.organizations?.backgroundColor || "#ffffff";
        manifest.theme_color = orgData?.organizations?.themeColor || "#000000";

        var blob = new Blob([JSON.stringify(manifest)], {
          type: "application/json",
        });
        var newUrl = URL.createObjectURL(blob);
        manifestLink.href = newUrl;
      });
  }, [orgData]);

  useEffect(() => {
    if (!orgData?.isOrganization) return navigate("/404");
  }, [orgData?.isOrganization]);

  return (
    <>
      <AllRoutesProvider />
      <ToastContainer rtl={isRTL} />
    </>
  );
};
export default App;
