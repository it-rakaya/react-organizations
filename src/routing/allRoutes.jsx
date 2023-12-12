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
import StepperFacility from "../components/organisms/MyFacilities/StepperFacility";
import { useTranslation } from "react-i18next";
import { UseOrg } from "../context/organization provider/OrganizationProvider";
const Home = lazy(() => import("../pages/home/Home"));

export const AllRoutesProvider = () => {

  const {i18n} = useTranslation();  
  const { orgData } = UseOrg();

  useEffect(()=>{
    if(!orgData?.organizations?.name_ar)
    document.title = t('landing.organizationName');
    else 
    document.title = orgData?.organizations?.name_ar
  },[i18n.language])
  return (
    <Routes>
      <Route path="/" element={<Landing title={t("Landing")} />} />
      <Route
        errorElement={<ErrorPage />}
        path="/login"
        element={<Login title={t("login")} />}
      />
      <Route path="/dashboard" element={<Root />} errorElement={<ErrorPage />}>
        <Route index element={<Home title={t("home")} />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/dashboard/facilities" element={<MyFacilities />} />
        <Route
          path="/dashboard/facilities/create-facility"
          element={<StepperFacility />}
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
