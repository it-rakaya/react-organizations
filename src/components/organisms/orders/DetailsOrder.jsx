/* eslint-disable react/prop-types */
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import { useState } from "react";
import MainHeader from "../../atoms/MainHeader";

export default function DetailsOrder({ data }) {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <MainHeader title={` تفاصيل طلب : ${data?.service?.name} `} />

      {/* <div className="grid grid-cols-2 p-4 gap-y-4">
        <div className="col-span-2">
          <h2 className="font-bold text-black">تفاصيل الطلب :</h2>
        </div>
        <div className="flex gap-2">
          <p className="font-bold text-contained"> الطلب:</p>
          <p>{data?.service?.name}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-bold text-contained">السعر:</p>
          <p>{data?.service?.price}</p>
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
        <div className="col-span-2">
          <h2 className="font-bold text-black"> الاسئله :</h2>
        </div>

        {data.answers.length ? (
          data.answers.map((item) => (
            <div className="flex gap-2">
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

      <div className="grid grid-cols-2 p-4 gap-y-4">
        <div className="col-span-2">
          <h2 className="font-bold text-black">تفاصيل المنشاه :</h2>
        </div>
        <div className="flex gap-2">
          <p className="font-bold text-contained">الاسم:</p>
          <p>{data?.facility?.name}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-bold text-contained">العنوان:</p>
          <p>{data?.facility?.address}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-bold text-contained">رقم الطهاة:</p>
          <p>{data?.facility?.chefs_number}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-bold text-contained"> تاريخ الإصدار:</p>
          <p>{data?.facility?.Version_date}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-bold text-contained"> تاريخ الإصدار بالهجري :</p>
          <p>{data?.facility?.Version_date_hj}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-bold text-contained"> رقم الموظف:</p>
          <p>{data?.facility?.employee_number}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-bold text-contained"> تاريخ الانتهاء:</p>
          <p>{data?.facility?.end_date}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-bold text-contained"> تاريخ الانتهاء بالهجري:</p>
          <p>{data?.facility?.end_date_hj}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-bold text-contained"> مساحة المطبخ:</p>
          <p>{data?.facility?.kitchen_space}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-bold text-contained"> الرخصه:</p>
          <p>{data?.facility?.license}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-bold text-contained"> تاريخ انتهاء الرخصه:</p>
          <p>{data?.facility?.license_expired}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-bold text-contained">
            {" "}
            تاريخ انتهاء الرخصه بالهجري:
          </p>
          <p>{data?.facility?.license_expired_hj}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-bold text-contained"> رقم التسجيل:</p>
          <p>{data?.facility?.registration_number}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-bold text-contained"> مصدر التسجيل:</p>
          <p>{data?.facility?.source_registration}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-bold text-contained"> شهادة الضرائب:</p>
          <p>{data?.facility?.tax_certificate}</p>
        </div>
      </div> */}
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label="nav tabs example">
          <Tab
            value="1"
            component="a"
            label={<h2 className="font-bold text-black">تفاصيل الطلب </h2>}
          />
          <Tab
            value="2"
            component="a"
            label={<h2 className="font-bold text-black"> الاسئله </h2>}
          />
          <Tab
            value="3"
            component="a"
            label={<h2 className="font-bold text-black">تفاصيل المنشاه </h2>}
          />
        </TabList>

        <TabPanel value="1">
          <div className="grid grid-cols-2 p-4 gap-y-4">
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
              <p className="font-bold text-contained">الحاله:</p>
              <p
                style={{ backgroundColor: data?.status?.color }}
                className="px-2 py-1 text-sm font-bold text-white rounded-md"
              >
                {data?.status?.name}
              </p>
            </div>
          </div>
        </TabPanel>
        <TabPanel value="2">
          <div className="grid grid-cols-2 p-4 gap-y-4">
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
        <TabPanel value="3">
          <div className="grid grid-cols-2 p-4 gap-y-4">
            <div className="flex gap-2">
              <p className="font-bold text-contained">الاسم:</p>
              <p>{data?.facility?.name}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-bold text-contained">العنوان:</p>
              <p>{data?.facility?.address}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-bold text-contained">رقم الطهاة:</p>
              <p>{data?.facility?.chefs_number}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-bold text-contained"> تاريخ الإصدار:</p>
              <p>{data?.facility?.Version_date}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-bold text-contained">
                {" "}
                تاريخ الإصدار بالهجري :
              </p>
              <p>{data?.facility?.Version_date_hj}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-bold text-contained"> رقم الموظف:</p>
              <p>{data?.facility?.employee_number}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-bold text-contained"> تاريخ الانتهاء:</p>
              <p>{data?.facility?.end_date}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-bold text-contained">
                {" "}
                تاريخ الانتهاء بالهجري:
              </p>
              <p>{data?.facility?.end_date_hj}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-bold text-contained"> مساحة المطبخ:</p>
              <p>{data?.facility?.kitchen_space}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-bold text-contained"> الرخصه:</p>
              <p>{data?.facility?.license}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-bold text-contained"> تاريخ انتهاء الرخصه:</p>
              <p>{data?.facility?.license_expired}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-bold text-contained">
                {" "}
                تاريخ انتهاء الرخصه بالهجري:
              </p>
              <p>{data?.facility?.license_expired_hj}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-bold text-contained"> رقم التسجيل:</p>
              <p>{data?.facility?.registration_number}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-bold text-contained"> مصدر التسجيل:</p>
              <p>{data?.facility?.source_registration}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-bold text-contained"> شهادة الضرائب:</p>
              <p>{data?.facility?.tax_certificate}</p>
            </div>
            {/* {data?.attachmentUrl.map((item) => (
              <div className="flex flex-col gap-2" key={item?.id}>
                <p className="font-bold text-contained"> صورة بطاقة العمل:</p>
                <p>
                  <img
                    className="w-[200px] h-[200px] rounded-xl"
                    src={data?.work_card_photo_url}
                    alt=""
                  />
                </p>
              </div>
            ))} */}
          </div>
        </TabPanel>
      </TabContext>
    </div>
  );
}
