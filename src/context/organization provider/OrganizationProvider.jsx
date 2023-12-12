/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { UseLocalStorage } from "../../hooks/useLocalStorage";
import img from '../../assets/refadaLogos/Group-1.png'
import default_image from '../../assets/refadaLogos/default.jpeg'
const OrgContext = createContext();
export const OrganizationProvider = ({ children }) => {
  const url = window.location.href;
  const [orgData, setOrgData] = UseLocalStorage("organization");

  const {
    data,
    refetch,
    isRefetching,
    isSuccess
  } = useFetch({
    endpoint: `organizations?organizationDomain=africa.rmcc.sa`,
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

  useEffect(()=>{
    console.log(orgData?.organizations?.background_image);
    if(orgData?.organizations?.background_image == undefined){
      setOrgData((prev)=>{
        return {...prev, organizations:{...prev?.organizations, background_image:default_image, logo:img}}
      })
    }
  },[orgData])
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
