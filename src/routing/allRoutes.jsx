import { t } from "i18next";
import { Route, Routes } from "react-router-dom";
import { lazy, useEffect } from "react";
import { ErrorPage } from "./ErrorPage";
import { Root } from "./Root";
import Login from "../pages/login/Login";
import Orders from "../pages/orders/Orders";
import Profile from "../pages/profile/Profile";
import Register from "../pages/register/Register";
import Landing from "../pages/landing/Landing";
import MyFacilities from "../pages/Facilities/MyFacilities";
import MyEmployees from "../pages/Employees/MyEmployees";
import { useTranslation } from "react-i18next";
import { UseOrg } from "../context/organization provider/OrganizationProvider";
import AddFacilityPage from "../pages/Facilities/AddFacilityPage";
import EditFacilityPage from "../pages/Facilities/EditFacilityPage";
const Home = lazy(() => import("../pages/home/Home"));

export const AllRoutesProvider = () => {
  const { i18n } = useTranslation();
  const { orgData } = UseOrg();
  useEffect(() => {
    const manifestLink = document.querySelector('link[rel="manifest"]');
    if (manifestLink) {
      fetch(manifestLink.href)
        .then(response => response.json())
        .then(manifest => {
          manifest.short_name = orgData?.organizations?.name || "Default Short Name";
          manifest.name = orgData?.organizations?.name || "Default Name";  
          manifest.icons.forEach(icon => {
            if (icon.sizes === "192x192" || icon.sizes === "512x512") {
              icon.src = orgData?.organizations?.logo || "path/to/default/icon.png";
            }
          });  
          manifest.background_color = orgData?.organizations?.backgroundColor || "#ffffff";
          manifest.theme_color = orgData?.organizations?.themeColor || "#000000";  
          const blob = new Blob([JSON.stringify(manifest)], { type: "application/json" });
          const newUrl = URL.createObjectURL(blob);
          manifestLink.href = newUrl;
        });
    }
  }, [orgData]);  
  
  useEffect(() => {
    if (!orgData?.organizations?.name_ar) {
      document.title = t("landing.organizationName");
    } else {
      document.title = orgData?.organizations?.name_ar;
    }
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.getElementsByTagName("head")[0].appendChild(metaDescription);
    }

    // Assuming you have a translation function similar to `t` for descriptions
    if (!orgData?.organizations?.about_us) {
      metaDescription.setAttribute(
        "content",
        t("landing.organizationDescription")
      );
    } else {
      metaDescription.setAttribute("content", orgData?.organizations?.about_us);
    }
  }, [i18n.language, orgData?.organizations?.name_ar, orgData?.organizations?.description_ar, t]);
  return (
    <Routes>
      <Route path="/" element={<Landing title={t("Landing")} />} />
      <Route path="*" element={<ErrorPage />} />
      <Route
        // errorElement={<ErrorPage />}
        path="/login"
        element={<Login title={t("login")} />}
      />
      <Route path="/dashboard" element={<Root />}>
        <Route index element={<Home title={t("home")} />} />
        <Route path="/dashboard/facilities" element={<MyFacilities />} />
        <Route
          path="/dashboard/facilities/create-facility"
          element={<AddFacilityPage />}
        />
        <Route
          path="/dashboard/facilities/edit-facility/:id"
          element={<EditFacilityPage />}
        />

        <Route path="/dashboard/employee" element={<MyEmployees />} />
        <Route path="/dashboard/orders" element={<Orders />} />
        <Route path="/dashboard/profile" element={<Profile />} />
      </Route>
      <Route
        errorElement={<ErrorPage />}
        path="/register"
        element={<Register title={t("login")} />}
      />
    </Routes>
  );
};
