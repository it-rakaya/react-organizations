/* eslint-disable react/prop-types */
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Divider, Tab } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { t } from "i18next";
import { useState } from "react";
import { convertArabicToEnglish, convertToHijri } from "../../../utils/helpers";
import MainHeader from "../../atoms/MainHeader";
import NotesOrder from "../../molecules/NotesOrder";
import DetailsFacility from "../MyFacilities/DetailsFacility";

export default function DetailsOrder({ data }) {
  const [value, setValue] = useState("1");
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // const mainColor = theme?.palette?.primary?.main;
  const Rejected = 5;
  return (
    <div className="overflow-hidden" style={{ height: "calc(90vh - 2rem)" }}>
      <div className="mt-10 md:px-10 ">
        <div className="col-span-2">
          <MainHeader
            title={t("Details Order")}
            styleHead={{ color: theme.palette.primary.main }}
          />
        </div>

        <div className="grid grid-cols-1 px-10 mt-5 md:px-20 md:grid-cols-2 ">
          <div className="flex col-span-2 gap-4 mt-5 md:col-span-1 ">
            <p className="font-bold dark:text-white">{t("service type")}</p>
            <p className="dark:text-white">{data?.service?.name}</p>
          </div>
          <div className="flex items-center col-span-2 gap-4 mt-5 md:col-span-1 ">
            <p className="font-bold dark:text-white">{t("Order status")}</p>
            <p
              className="px-2 py-1 text-white rounded-md"
              style={{ backgroundColor: data?.status?.color }}
            >
              {data?.status?.name}
            </p>
          </div>
          <div className="flex col-span-2 gap-4 mt-5 md:col-span-1 ">
            <p className="font-bold dark:text-white"> {t("Order code")}</p>
            <p className="dark:text-white">{data?.code}</p>
          </div>
          <div className="flex col-span-2 gap-4 mt-5 md:col-span-1 ">
            <p className="font-bold dark:text-white"> {t("Date created")}</p>
            <div className="flex gap-1">
              <p className="dark:text-white">
                {data?.created_at?.slice(0, 10)}
              </p>
              /
              <p className="dark:text-white">
                {convertArabicToEnglish(
                  convertToHijri(data?.created_at?.slice(0, 10))
                )}
              </p>
              {t("H")}
            </div>
          </div>
        </div>
      </div>
      <div className="my-5">
        <Divider />
      </div>

      <TabContext value={value}>
        <div className="mt-5 md:px-10">
          <TabList onChange={handleChange} aria-label="nav tabs example">
            <Tab
              value="1"
              component="a"
              label={
                <h2 className="font-bold text-black dark:text-white">
                  {" "}
                  {t("Order notes")}
                </h2>
              }
            />
            {Rejected !== data?.status?.id && (
              <Tab
                value="2"
                component="a"
                style={{ alignItems: "center" }}
                label={
                  <h2 className="font-bold text-black dark:text-white">
                    {" "}
                    {t("Questions")}
                  </h2>
                }
              />
            )}
            {Rejected !== data?.status?.id && (
              <Tab
                value="3"
                component="a"
                label={
                  <h2 className="font-bold text-black dark:text-white">
                    {t("Facility Details")}
                  </h2>
                }
              />
            )}
          </TabList>
          <div className="">
            <TabPanel value="1" className="pt-0">
              <div>
                <div className="">
                  <NotesOrder notes={data?.notes} />
                </div>
              </div>
            </TabPanel>
            <TabPanel value="2">
              <div className="grid grid-cols-2 gap-4 px-4 mt-5">
                {data?.answers?.length ? (
                  data?.answers?.map((item) => (
                    <div
                      className="flex flex-col col-span-2 gap-2 py-2 mt-5 border-b md:col-span-1"
                      key={item?.id}
                    >
                      <p
                        className="font-bold "
                        style={{ color: theme.palette.primary.main }}
                      >
                        {item?.question?.content}:
                      </p>
                      <p className="dark:text-white">{item?.value}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-2xl font-bold text-black dark:text-white">
                    {t("There are no questions")}
                  </div>
                )}
              </div>
            </TabPanel>
            <TabPanel value="3" className="pt-0">
              <div>
                <div className="">
                  <DetailsFacility
                    data={data?.facility}
                    className="detailsOrderFacility"
                    style={{height:"calc(100vh - 28rem)"}}
                  />
                </div>
              </div>
            </TabPanel>
          </div>
        </div>
      </TabContext>
    </div>
  );
}
