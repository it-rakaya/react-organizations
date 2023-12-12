/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { UseLocalStorage } from "../../hooks/useLocalStorage";

const OrgContext = createContext();
export const OrganizationProvider = ({ children }) => {
  // const url = window.location.href;
  // const local = "africa-dev.rmcc.sa"

  const [orgData, setOrgData] = UseLocalStorage("organization");
  // http://localhost:5173/
  const {
    data,
    refetch,
    isRefetching,
    isSuccess
  } = useFetch({
    endpoint: `organizations?organizationDomain=http://localhost:5173`,
    queryKey: ["organization_info"],

    onError(e) {
      console.log("e", e);
    },
  });
  useEffect(() => {
    if (isSuccess) {
      console.log("تم تحميل البيانات بنجاح");
      setOrgData(data)
    }
  }, [isSuccess]);
  useEffect(() => {

    // refetch();
  }, [refetch]);

  return (
    <OrgContext.Provider value={{ orgData, refetch, isRefetching  }}>
      {children}
    </OrgContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const UseOrg = () => {
  const context = useContext(OrgContext);
  
  if (!context) {
    throw new Error("useUser must be used within a OrganizationProvider");
  }

  return context;
};
