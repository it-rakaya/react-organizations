/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect } from "react";
import useFetch from "../../hooks/useFetch";

const OrgContext = createContext();
export const OrganizationProvider = ({ children }) => {
  const url = window.location.href;
  console.log(
    "🚀 ~ file: OrganizationProvider.jsx:10 ~ OrganizationProvider ~ url:",
    url
  );

  const {
    data: orgData,
    refetch,
    isRefetching,
  } = useFetch({
    endpoint: `organizations?organizationDomain=africa.rmcc.sa`,
    queryKey: ["organization_info"],
    onError(e) {
      console.log("e", e);
    },
});
console.log("🚀 ~ file: OrganizationProvider.jsx:17 ~ OrganizationProvider ~ orgData:", orgData)
  useEffect(() => {
    if (isRefetching) {
      console.log("تم تحميل البيانات بنجاح");
    }
  }, [isRefetching]);
  useEffect(() => {
    // refetch();
  }, [refetch]);

  return (
    <OrgContext.Provider value={{ orgData, refetch, isRefetching }}>
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
