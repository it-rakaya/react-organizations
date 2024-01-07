/* eslint-disable react/prop-types */
import {
  mdiFileDocumentOutline,
  mdiFormatListBulleted,
  mdiMapMarkerOutline,
  mdiOfficeBuildingOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import AdditionalInformationData from "./AditionalInformationData";
import AttachmentsData from "./AttachmentsData";
import DetailsFacilityData from "./DetailsFacilityData";
import NationalAdressData from "./NationalAdressData";

export default function DetailsFacility({ data, className }) {
  const theme = useTheme();
  const mainColor = theme?.palette?.primary?.main;
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const parentSection =
    "grid grid-cols-1 p-4 md:px-5 md:grid-cols-2 md:gap-x-20";
  const childSection =
    "flex flex-col col-span-2 py-2 mt-5 border-b gap-2 md:col-span-1";

  const colorHead = mainColor;

  return (
    <div>
      <div className="mt-8 px-">
        <TabContext value={value} className="!w-fit">
          <div className="flex mt-5">
            <TabList
              onChange={handleChange}
              aria-label="nav tabs example"
              orientation="vertical"
              className=" !min-w-[2%] md:w-[30%] tab_facility border-l-transparent w-[80px]  ml-0 "
            >
              <Tab
                value="1"
                component="a"
                style={{ alignItems: "start", minWidth: "50px" }}
                label={
                  <div className="flex items-center gap-2 ">
                    <Icon
                      path={mdiOfficeBuildingOutline}
                      size={1}
                      className="text-black dark:text-white w-fit"
                    />
                    <h2 className="hidden text-black text-font-mediumblack font- text-start dark:text-white md:block">
                      بيانات المنشاة{" "}
                    </h2>
                  </div>
                }
              />
              <Tab
                value="2"
                component="a"
                style={{ alignItems: "start" }}
                label={
                  <div className="flex items-center gap-2">
                    <Icon
                      path={mdiMapMarkerOutline}
                      size={1}
                      className="text-black dark:text-white"
                    />

                    <h2 className="hidden text-black text-font-mediumblack font- text-start dark:text-white md:block">
                      بيانات العنوان الوطني{" "}
                    </h2>
                  </div>
                }
              />
              <Tab
                value="3"
                style={{
                  alignItems: "start",
                  // width: "50px",
                  // maxWidth: "100px",
                }}
                component="a"
                label={
                  <div className="flex items-center gap-2">
                    <Icon
                      path={mdiFormatListBulleted}
                      size={1}
                      className="text-black dark:text-white"
                    />

                    <h2 className="hidden text-black text-font-mediumblack font- text-start dark:text-white md:block">
                      بيانات اضافية
                    </h2>
                  </div>
                }
              />
              <Tab
                value="4"
                component="a"
                style={{ alignItems: "start" }}
                label={
                  <div className="flex items-center gap-2">
                    <Icon
                      path={mdiFileDocumentOutline}
                      size={1}
                      className="text-black dark:text-white"
                    />

                    <h2 className="hidden text-black text-font-mediumblack font- text-start dark:text-white md:block">
                      مرفقات
                    </h2>
                  </div>
                }
              />
            </TabList>
            <div
              className={`${className} !overflow-y-scroll !shadow-none max-h-[40rem]  scroll_main w-full`}
            >
              <TabPanel value="1" className="pt-0">
                <DetailsFacilityData
                  data={data}
                  childSection={childSection}
                  colorHead={colorHead}
                  parentSection={parentSection}
                />
              </TabPanel>
              <TabPanel value="2" className="pt-0">
                <NationalAdressData
                  data={data}
                  childSection={childSection}
                  colorHead={colorHead}
                  parentSection={parentSection}
                />
              </TabPanel>
              <TabPanel value="3" className="pt-0">
                <AdditionalInformationData
                  data={data}
                  childSection={childSection}
                  colorHead={colorHead}
                  parentSection={parentSection}
                />
              </TabPanel>
              <TabPanel value="4" className="w-full pt-0">
                <AttachmentsData
                  data={data}
                  childSection={childSection}
                  colorHead={colorHead}
                  parentSection={parentSection}
                />
              </TabPanel>
            </div>
          </div>
        </TabContext>
      </div>
    </div>
  );
}
