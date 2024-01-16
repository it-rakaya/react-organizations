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
      <div className="grid grid-cols-12 p-5 m-20 bg-white rounded-2xl" style={{boxShadow:"0 0 27px -20px"}}>
        <div className="flex flex-col justify-center col-span-7">
          <div className="flex">
            <h1 className="text-3xl font-bold text-black dark:text-white">
              {t("Welcome")}
            </h1>
            <h1 className="mx-1 text-3xl font-bold text-black dark:text-white">
              {user?.name}!
            </h1>
          </div>

          <div className="flex w-full gap-20 ">
            <Link to={`https://wa.me/${orgData?.organizations?.phone}/`}>
              <ButtonComp className={"!w-[250px] ltr:!w-[300px]"}>
                {t("Communication via WhatsApp")}
              </ButtonComp>
            </Link>
            <Link to={"/dashboard/profile"}>
              <ButtonComp className={"!w-[250px] ltr:!w-[300px]"} variant="outlined">
                {t("My personal data")}
              </ButtonComp>
            </Link>
          </div>
          <div className="flex justify-between mt-5">
            {data?.map((item, index) => (
              <Grid xs={12} md={3} sm={6} item key={index}>
                <CardStatsHorizontal
                  item={item}
                  className="bg-transparent !shadow-none"
                />
              </Grid>
            ))}
          </div>
        </div>
        <div className="col-span-5">
          <UserVerifiedIcon className="w-full" />
        </div>
      </div>
    </div>
  );
}

export default UserVerified;
