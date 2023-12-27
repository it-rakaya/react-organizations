/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { UseLocalStorage } from "../../hooks/useLocalStorage";
import lightModeLogo from "../../assets/refadaLogos/Group-1.png";
import darkModeLogo from "../../assets/refadaLogos/Group-2.png";
import default_image from "../../assets/refadaLogos/default.jpeg";
const OrgContext = createContext();
export const OrganizationProvider = ({ children }) => {
  const url = window.location.href;
  // const local = "http://localhost:5173";
  const baseUrl = new URL(url).origin;

  // const isDevelopment = true;
  // const origin = isDevelopment ? local : baseUrl;

  // const local = "africa-dev.rmcc.sa"
  const savedMode = localStorage.getItem("darkMode");
  const [orgData, setOrgData] = UseLocalStorage("organization");
  // http://localhost:5173/
  const { data, refetch, isRefetching, isSuccess , isLoading } = useFetch({
    endpoint: `organizations?organizationDomain=${baseUrl}`,
    queryKey: ["organization_info"],
  });
  useEffect(() => {
    if (isSuccess) {
      console.log("تم تحميل البيانات بنجاح");
      setOrgData(data);
    }
  }, [isSuccess]);
  useEffect(() => {
    // refetch();
  }, [refetch]);
  useEffect(() => {
    if (orgData?.organizations?.background_image == undefined) {
      setOrgData((prev) => {
        return {
          ...prev,
          organizations: {
            ...prev?.organizations,
            background_image: default_image,
            logo: !savedMode ? lightModeLogo : darkModeLogo,
          },
        };
      });
    }
    if (orgData?.organizations?.phone == null) {
      setOrgData((prev) => {
        return {
          ...prev,
          organizations: { ...prev?.organizations, phone: "0570044066" },
        };
      });
    }
  }, [orgData]);

  const updateLogo = (mode) => {
    setOrgData((prev) => {
      if (
        orgData.organizations.logo != lightModeLogo &&
        orgData.organizations.logo != darkModeLogo
      )
        return prev;
      return {
        ...prev,
        organizations: {
          ...prev?.organizations,
          logo: mode ? lightModeLogo : darkModeLogo,
        },
      };
    });
  };
  return (
    <OrgContext.Provider value={{ orgData, refetch, isRefetching, updateLogo , isLoading }}>
      {children}
    </OrgContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const UseOrg = () => {
  const context = useContext(OrgContext);

  if (!context) {
    throw new Error("organization must be used within a OrganizationProvider");
  }

  return context;
};
