import { mdiPoll } from "@mdi/js";
import { Grid } from "@mui/material";
import { t } from "i18next";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/auth-and-perm/AuthProvider";
import { UseOrg } from "../../../context/organization provider/OrganizationProvider";
import useFetch from "../../../hooks/useFetch";
import ButtonComp from "../../atoms/buttons/ButtonComp";
import UserVerifiedIcon from "../../atoms/icons/UserVerifiedIcon";
import CardStatsHorizontal from "../../molecules/card-stats-horizontal";
import { useTheme } from "@mui/material/styles";

function UserVerified() {
  const { user } = useAuth();
  const { orgData } = UseOrg();
  const { data: Orders } = useFetch({
    endpoint: `orders?organization_id=${orgData?.organizations?.id}`,
    queryKey: ["my_orders"],
    enabled: !!orgData?.organizations?.id,
  });
  const { data: facilities } = useFetch({
    endpoint: `facilities`,
    queryKey: ["facilities"],
  });
  const { data: employees } = useFetch({
    endpoint: `facility-employees`,
    queryKey: ["facility_employees"],
  });

  const AllOrder = Orders?.all_user_orders.length;
  const AllFacilities = facilities?.user_facilities.length;
  const AllEmployee = employees?.employees.length;
  const theme = useTheme();

  const data = [
    {
      trendNumber: "8.1",
      title: t("All Facilities"),
      stats: AllFacilities,
      icon: mdiPoll,
    },
    {
      trendNumber: "8.1",
      title: t("All Employee"),
      stats: AllEmployee,
      icon: mdiPoll,
    },
    {
      trendNumber: "8.1",
      title: t("All Orders"),
      stats: AllOrder,
      icon: mdiPoll,
    },
  ];

  return (
    <div>
      <div
        className="grid grid-cols-12 px-2 py-10 bg-white dark:bg-dark-primary md:px-5 md:m-20 rounded-2xl"
        style={{ boxShadow: "0 0 27px -20px" }}
      >
        <div className="grid grid-cols-12 col-span-12">
          <div className="flex items-center col-span-12 md:col-span-6">
            <h1 className="text-xl font-bold text-black md:text-3xl dark:text-white">
              {t("Welcome")}
            </h1>
            <h1 className="mx-1 text-xl font-bold text-black md:text-3xl dark:text-white">
              {user?.name}!
            </h1>
          </div>

          <div className="flex flex-wrap items-center justify-between col-span-12 gap-1 md:col-span-6 md:justify-normal md:gap-2 xs:flex-nowrap">
            <Link
              to={`https://wa.me/${orgData?.organizations?.phone}/`}
              className="w-full"
            >
              <ButtonComp
                className={"  !text-[10px] md:!text-[14px] md:!w-[full] !mt-0"}
              >
                {t("customers service")}
              </ButtonComp>
            </Link>
            <Link to={"/dashboard/profile"} className="w-full">
              <ButtonComp
                className={" !text-[10px] md:!text-[14px] md:!w-[full] !mt-0"}
                variant="outline"
              >
                {t("PERSONAL INFO")}
              </ButtonComp>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-12 col-span-12 mt-10 ">
          <div className="flex justify-center col-span-12 mt-5 md:flex-wrap md:col-span-6">
            {data?.map((item, index) => (
              <div className="flex justify-center w-1/2" key={index}>
                <CardStatsHorizontal
                  item={item}
                  className="!bg-transparent !shadow-none"
                  classNameMain="!pr-0 !pl-0   "
                  // classNameBox={"flex-wrap"}
                  // itemClassName={"w-1/2"}
                />
              </div>
            ))}
          </div>
          <div className="col-span-12 md:col-span-6">
            <UserVerifiedIcon className="w-3/4 m-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserVerified;
