/* eslint-disable react/prop-types */
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Divider, Tab } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { t } from "i18next";
import { useState } from "react";
import DetailsFacility from "../MyFacilities/DetailsFacility";

export default function DetailsOrder({ data }) {
  console.log("🚀 ~ file: DetailsOrder.jsx:22 ~ DetailsOrder ~ data:", data);
  const [value, setValue] = useState("1");
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const mainColor = theme?.palette?.primary?.main;

  return (
    <div className="">
      <div className="px-10 mt-10">
        <div className="col-span-2">
          <h1 className="font-bold " style={{ color: mainColor }}>
            تفاصيل الطلب
          </h1>
        </div>
        <div className="grid grid-cols-1 px-20 mt-5 md:grid-cols-2 ">
          <div className="flex col-span-2 gap-4 mt-5 md:col-span-1 ">
            <p className="font-bold ">نوع الخدمه</p>
            <p>{data?.service?.name}</p>
          </div>
          <div className="flex col-span-2 gap-4 mt-5 md:col-span-1 ">
            <p className="font-bold "> حالة الطلب </p>
            <p
              className="px-2 py-1 text-white rounded-md"
              style={{ backgroundColor: data?.status?.color }}
            >
              {data?.status?.name}
            </p>
          </div>
          <div className="flex col-span-2 gap-4 mt-5 md:col-span-1 ">
            <p className="font-bold "> كود الطلب </p>
            <p>{data?.code}</p>
          </div>
          <div className="flex col-span-2 gap-4 mt-5 md:col-span-1 ">
            <p className="font-bold "> تاريخ الانشاء </p>
            <p>{data?.created_at?.slice(0, 10)}</p>
          </div>
        </div>
      </div>
      <div className="my-5">
        <Divider />
      </div>

      <TabContext value={value}>
        <div className="px-10 mt-5">
          
        <TabList onChange={handleChange} aria-label="nav tabs example">
          <Tab
            value="1"
            component="a"
            style={{ alignItems: "start" }}
            label={<h2 className="font-bold text-black"> الاسئله </h2>}
          />
          <Tab
            value="2"
            component="a"
            label={<h2 className="font-bold text-black">تفاصيل المنشاه </h2>}
          />
        </TabList>
        <TabPanel value="1">
          <div className="grid grid-cols-2 p-4 mt-5 gap-y-4">
            {data?.answers?.length ? (
              data?.answers?.map((item) => (
                <div className="flex gap-2" key={item?.id}>
                  <p className="font-bold text-contained">
                    {item?.question?.content}؟
                  </p>
                  <p>{item?.value}</p>
                </div>
              ))
            ) : (
              <div className="text-xl font-bold"> لايوجد اساله </div>
            )}
          </div>
        </TabPanel>
        
        </div>
        <TabPanel value="2" className="pt-0">
          <div >
            <div className="">
              <DetailsFacility data={data?.facility} />
            </div>
          </div>
        </TabPanel>
      </TabContext>
    </div>
  );
}

{
  /* <div className="grid grid-cols-2 p-4 gap-y-4">
<div className="col-span-2"></div>
<div className="flex gap-2">
  <p className="font-bold text-contained"> الطلب:</p>
  <p>{data?.service?.name}</p>
</div>
<div className="flex gap-2">
  <p className="font-bold text-contained">السعر:</p>
  <p>{data?.service?.price}</p>
</div>
<div className="flex gap-2">
  <p className="font-bold text-contained">الكود:</p>
  <p>{data?.code}</p>
</div>
<div className="flex gap-2">
  <p className="font-bold text-contained">الحاله:</p>
  <p
    style={{ backgroundColor: data?.status?.color }}
    className="px-2 py-1 text-sm font-bold text-white rounded-md"
  >
    {data?.status?.name}
  </p>
</div>
</div> */
}
