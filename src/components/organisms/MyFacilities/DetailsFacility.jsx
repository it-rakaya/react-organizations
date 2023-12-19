/* eslint-disable react/prop-types */
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Divider, Tab } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { t } from "i18next";
import { useState } from "react";
import PreviewImageLink from "../../molecules/PreviewImageLink";
import PreviewPdf from "../../molecules/PreviewPdf";

export default function DetailsFacility({ data }) {
  console.log(
    "🚀 ~ file: DetailsFacility.jsx:15 ~ DetailsFacility ~ data:",
    data
  );
  const theme = useTheme();
  const mainColor = theme?.palette?.primary?.main;
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className="px-10 mt-8">
        {/* <div className="col-span-2">
          <h1 className="font-bold " style={{ color: mainColor }}>
            {t("Facility data")}
          </h1>
        </div>
        <div className="grid grid-cols-1 p-4 px-20 md:grid-cols-2 gap-x-28">
          <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
            <p className="font-bold ">الاسم</p>
            <p className="mt-1">{data?.name}</p>
          </div>
          <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
            <p className="font-bold "> رقم التسجيل </p>
            <p className="mt-1">{data?.registration_number}</p>
          </div>
          <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
            <p className="font-bold "> تاريخ الإصدار </p>
            <p className="mt-1">{data?.version_date}</p>
          </div>
          <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
            <p className="font-bold "> تاريخ الإصدار بالهجري</p>
            <p className="mt-1">{data?.version_date_hj}</p>
          </div>
          <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
            <p className="font-bold "> تاريخ الانتهاء </p>
            <p className="mt-1">{data?.end_date}</p>
          </div>
          <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
            <p className="font-bold "> تاريخ الانتهاء بالهجري</p>
            <p className="mt-1">{data?.end_date_hj}</p>
          </div>
          <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
            <p className="font-bold "> مصدر التسجيل </p>
            <p className="mt-1">{data?.registration_source}</p>
          </div>
          <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
            <p className="font-bold "> الرخصه </p>
            <p className="mt-1">{data?.license}</p>
          </div>
          <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
            <p className="font-bold "> تاريخ انتهاء الرخصه </p>
            <p className="mt-1">{data?.license_expired}</p>
          </div>
          <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
            <p className="font-bold "> تاريخ انتهاء الرخصه بالهجري</p>
            <p className="mt-1">{data?.license_expired_hj}</p>
          </div>
          <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
            <p className="font-bold ">العنوان</p>
            <p className="mt-1">{data?.address}</p>
          </div>
          <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
            <p className="font-bold "> شهادة الضرائب </p>
            <p className="mt-1">{data?.tax_certificate}</p>
          </div>
        </div>

        <div className="col-span-2">
          <Divider />
        </div>

        <div className="col-span-2 mt-5">
          <h1 className="font-bold " style={{ color: mainColor }}>
            {t("National address data")}
          </h1>
        </div>
        <div className="grid grid-cols-1 p-4 px-20 md:grid-cols-2 gap-x-28">
          <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
            <p className="font-bold "> الشارع </p>
            <p className="mt-1">{data?.street_name}</p>
          </div>
          <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
            <p className="font-bold "> الحي </p>
            <p className="mt-1">{data?.neighborhood}</p>
          </div>
          <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
            <p className="font-bold "> اسم المدينة </p>
            <p className="mt-1">{data?.city}</p>
          </div>
          <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
            <p className="font-bold "> رقم المبنى </p>
            <p className="mt-1">{data?.building_number}</p>
          </div>
          <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
            <p className="font-bold ">رمز البريد </p>
            <p className="mt-1">{data?.postal_code}</p>
          </div>
          <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
            <p className="font-bold "> الرقم الفرعي</p>
            <p className="mt-1">{data?.sub_number}</p>
          </div>
        </div>

        <div className="col-span-2">
          <Divider />
        </div>

        <div className="col-span-2 mt-5">
          <h1 className="font-bold " style={{ color: mainColor }}>
            {t("Additional data")}
          </h1>
        </div>

        <div className="grid grid-cols-1 p-4 px-20 md:grid-cols-2 gap-x-28">
          <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
            <p className="font-bold ">رقم الطهاة </p>
            <p className="mt-1">{data?.chefs_number}</p>
          </div>

          <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
            <p className="font-bold "> رقم الموظف </p>
            <p className="mt-1">{data?.employee_number}</p>
          </div>

          <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
            <p className="font-bold "> مساحة المطبخ </p>
            <p className="mt-1">{data?.kitchen_space}</p>
          </div>
        </div> */}

        {/* {data?.attachmentUrl.map((item) => (
          <div className="flex items-center " key={item?.id}>
            <p className="font-bold "> {item?.label} </p>
            {!item?.value?.toLowerCase().endsWith(".pdf") ? (
              <p>
                <PreviewImageLink url={item?.value} />
              </p>
            ) : (
              <PreviewPdf item={item?.value} />
            )}
          </div>
        ))} */}
        <TabContext value={value}>
          <div className="px-10 mt-5">
            <TabList onChange={handleChange} aria-label="nav tabs example">
              <Tab
                value="1"
                component="a"
                style={{ alignItems: "start" }}
                label={
                  <h2 className="font-bold text-black"> بيانات المنشاة </h2>
                }
              />
              <Tab
                value="2"
                component="a"
                label={
                  <h2 className="font-bold text-black">
                    {" "}
                    بيانات العنوان الوطني{" "}
                  </h2>
                }
              />
              <Tab
                value="3"
                component="a"
                label={<h2 className="font-bold text-black"> بيانات اضافية</h2>}
              />
              <Tab
                value="4"
                component="a"
                label={<h2 className="font-bold text-black"> مرفقات </h2>}
              />
            </TabList>
            <TabPanel value="1">
              <div className="grid grid-cols-1 p-4 px-20 md:grid-cols-2 gap-x-28">
                <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
                  <p className="font-bold ">الاسم</p>
                  <p className="mt-1">{data?.name}</p>
                </div>
                <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
                  <p className="font-bold "> رقم التسجيل </p>
                  <p className="mt-1">{data?.registration_number}</p>
                </div>
                <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
                  <p className="font-bold "> تاريخ الإصدار </p>
                  <p className="mt-1">{data?.version_date}</p>
                </div>
                <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
                  <p className="font-bold "> تاريخ الإصدار بالهجري</p>
                  <p className="mt-1">{data?.version_date_hj}</p>
                </div>
                <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
                  <p className="font-bold "> تاريخ الانتهاء </p>
                  <p className="mt-1">{data?.end_date}</p>
                </div>
                <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
                  <p className="font-bold "> تاريخ الانتهاء بالهجري</p>
                  <p className="mt-1">{data?.end_date_hj}</p>
                </div>
                <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
                  <p className="font-bold "> مصدر التسجيل </p>
                  <p className="mt-1">{data?.registration_source}</p>
                </div>
                <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
                  <p className="font-bold "> الرخصه </p>
                  <p className="mt-1">{data?.license}</p>
                </div>
                <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
                  <p className="font-bold "> تاريخ انتهاء الرخصه </p>
                  <p className="mt-1">{data?.license_expired}</p>
                </div>
                <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
                  <p className="font-bold "> تاريخ انتهاء الرخصه بالهجري</p>
                  <p className="mt-1">{data?.license_expired_hj}</p>
                </div>
                <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
                  <p className="font-bold ">العنوان</p>
                  <p className="mt-1">{data?.address}</p>
                </div>
                <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
                  <p className="font-bold "> شهادة الضرائب </p>
                  <p className="mt-1">{data?.tax_certificate}</p>
                </div>
              </div>
            </TabPanel>
          </div>
          <TabPanel value="2" className="pt-0">
            <div className="grid grid-cols-1 p-4 px-20 md:grid-cols-2 gap-x-28">
              <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
                <p className="font-bold "> الشارع </p>
                <p className="mt-1">{data?.street_name}</p>
              </div>
              <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
                <p className="font-bold "> الحي </p>
                <p className="mt-1">{data?.neighborhood}</p>
              </div>
              <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
                <p className="font-bold "> اسم المدينة </p>
                <p className="mt-1">{data?.city}</p>
              </div>
              <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
                <p className="font-bold "> رقم المبنى </p>
                <p className="mt-1">{data?.building_number}</p>
              </div>
              <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
                <p className="font-bold ">رمز البريد </p>
                <p className="mt-1">{data?.postal_code}</p>
              </div>
              <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
                <p className="font-bold "> الرقم الفرعي</p>
                <p className="mt-1">{data?.sub_number}</p>
              </div>
            </div>
          </TabPanel>
          <TabPanel value="3" className="pt-0">
            <div className="grid grid-cols-1 p-4 px-20 md:grid-cols-2 gap-x-28">
              <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
                <p className="font-bold ">رقم الطهاة </p>
                <p className="mt-1">{data?.chefs_number}</p>
              </div>

              <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
                <p className="font-bold "> رقم الموظف </p>
                <p className="mt-1">{data?.employee_number}</p>
              </div>

              <div className="flex flex-col col-span-2 mt-5 ga md:col-span-1 ">
                <p className="font-bold "> مساحة المطبخ </p>
                <p className="mt-1">{data?.kitchen_space}</p>
              </div>
            </div>
          </TabPanel>
          <TabPanel value="4" className="pt-0">
            {data?.attachmentUrl?.map((item) => (
              <div className="flex items-center " key={item?.id}>
                <p className="font-bold "> {item?.label} </p>
                {!item?.value?.toLowerCase()?.endsWith(".pdf") ? (
                  <p>
                    <PreviewImageLink url={item?.value} />
                  </p>
                ) : (
                  <PreviewPdf item={item?.value} />
                )}
              </div>
            ))}
          </TabPanel>
        </TabContext>
      </div>
    </div>
  );
}
