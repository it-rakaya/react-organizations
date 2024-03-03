import { mdiPoll } from "@mdi/js";
import { t } from "i18next";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/auth-and-perm/AuthProvider";
import { UseOrg } from "../../../context/organization provider/OrganizationProvider";
import useFetch from "../../../hooks/useFetch";
import ButtonComp from "../../atoms/buttons/ButtonComp";
import UserVerifiedIcon from "../../atoms/icons/UserVerifiedIcon";
import CardStatsHorizontal from "../../molecules/card-stats-horizontal";
import Loading from "../../molecules/Loading";

function UserVerified() {
  const { user } = useAuth();
  const { orgData } = UseOrg();
  const { data: Orders, isFetching: isFetchingOrders } = useFetch({
    endpoint: `orders?organization_id=${orgData?.organizations?.id}`,
    queryKey: ["my_orders"],
    enabled: !!orgData?.organizations?.id,
  });
  const { data: facilities, isFetching: isFetchingFacility } = useFetch({
    endpoint: `facilities`,
    queryKey: ["facilities"],
  });
  const { data: employees, isFetching: isFetchingEmployee } = useFetch({
    endpoint: `facility-employees`,
    queryKey: ["facility_employees"],
  });

  const dataLoaded =
    !isFetchingOrders &&
    !isFetchingFacility &&
    !isFetchingEmployee &&
    Orders &&
    facilities &&
    employees;

  const AllOrder = Orders?.all_user_orders.length;
  const AllFacilities = facilities?.user_facilities.length;
  const AllEmployee = employees?.employees.length;

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
  if (!dataLoaded) return <Loading />;
  return (
    <div>
      <div
        className="grid grid-cols-12 px-2 py-10 bg-white dark:bg-dark-primary mx:px-5 mx:m-20 rounded-2xl dashboardHome"
        style={{ boxShadow: "0px 8px 27px -15px #000000d1" }}
      >
        <div className="grid grid-cols-12 col-span-12 ">
          <div className="flex flex-wrap items-center col-span-12 mb-3 mx:col-span-6 mx:mb-0">
            <h1 className="text-xl font-bold text-black mx:text-3xl dark:text-white">
              {t("Welcome")}
            </h1>
            <h1 className="mx-1 text-xl font-bold text-black mx:text-3xl dark:text-white">
              {user?.name}!
            </h1>
          </div>

          <div className="flex flex-wrap items-center justify-between col-span-12 gap-1 gap-2 mx:col-span-6 mx:justify-normal xs:flex-nowrap">
            <Link
              to={`https://wa.me/${orgData?.organizations?.phone}/`}
              className="w-full"
            >
              <ButtonComp
                className={"  !text-[10px] mx:!text-[14px] mx:!w-[full] !mt-0 "}
              >
                {t("customers service")}
              </ButtonComp>
            </Link>
            <Link to={"/dashboard/profile"} className="w-full">
              <ButtonComp
                className={" !text-[10px] mx:!text-[14px] mx:!w-[full] !mt-0 "}
                variant="outline"
              >
                {t("Personal Info")}
              </ButtonComp>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-12 col-span-12 mx:mt-10 ">
          <div className="grid justify-center grid-cols-12 col-span-12 mx:mt-5 mx:flex mx:flex-wrap mx:col-span-6">
            {data?.map((item, index) => (
              <div
                className="flex justify-start col-span-12 mx-5 mx:mx-0 mx:w-1/2 mx:justify-center"
                key={index}
              >
                <CardStatsHorizontal
                  item={item}
                  className="!bg-transparent !shadow-none "
                  classNameMain="!pr-0 !pl-0   "
                  // classNameBox={"flex-wrap"}
                  // itemClassName={"w-1/2"}
                />
              </div>
            ))}
          </div>
          <div className="col-span-12 mx:col-span-6">
            <UserVerifiedIcon className="w-full m-auto mx:w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserVerified;
