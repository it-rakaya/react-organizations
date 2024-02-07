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
import { t } from "i18next";
import { useState } from "react";
import { useIsRTL } from "../../../hooks/useIsRTL";
import AdditionalInformationData from "./AditionalInformationData";
import AttachmentsData from "./AttachmentsData";
import DetailsFacilityData from "./DetailsFacilityData";
import NationalAdressData from "./NationalAdressData";

export default function DetailsFacility({ data, className, style }) {
  const theme = useTheme();
  const mainColor = theme?.palette?.primary?.main;
  const [value, setValue] = useState("1");
  const isRTL = useIsRTL()

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const parentSection =
    "grid grid-cols-1 p-4 md:px-5 md:grid-cols-2 md:gap-x-5";
  const childSection =
    "flex flex-col col-span-2 py-2 mt-5 border-b gap-2 md:col-span-1";

  const colorHead = mainColor;
  const tabsItems = [
    {
      value: "1",
      icon: mdiOfficeBuildingOutline,
      label: t("Facility Info"),
    },
    {
      value: "2",
      icon: mdiMapMarkerOutline,
      label: t("National address info"),
    },
    {
      value: "3",
      icon: mdiFormatListBulleted,
      label: t("Additional Info"),
    },
    {
      value: "4",
      icon: mdiFileDocumentOutline,
      label: t("attachment"),
    },
  ];

  return (
    <div>
      <div className="mt-8 px- detailsFacility">
        <TabContext
          value={value}
          className="!w-fit"
          sx={{
            "& .MuiTabs-indicator": {
              right: 0,
            },
          }}
        >
          <div
            className="flex mt-5 overflow-hidden"
            style={{ height: "calc(90vh - 5rem)" }}
          >
            <TabList
              onChange={handleChange}
              aria-label="nav tabs example"
              orientation="vertical"
              className=" !min-w-[2%] md:w-[37%] tab_facility border-l-transparent ltr:border-r-transparent w-[80px]  ml-0 "
            >
              {tabsItems?.map((item, index) => (
                <Tab
                  value={item?.value}
                  key={index}
                  className=" :aria-selected"
                  component="a"
                  style={{ alignItems: "start" }}
                  label={
                    <div className="flex items-center gap-2 ">
                      <Icon
                        path={item?.icon}
                        size={1}
                        className="text-black dark:text-white w-fit"
                      />
                      <h2 className="hidden text-black text-font-mediumblack font- text-start dark:text-white md:block">
                        {item?.label}
                      </h2>
                    </div>
                  }
                  sx={{
                    // Add your custom styles for the selected Tab here
                    "&.Mui-selected": {
                      backgroundColor: mainColor,
                    },
                    "&.MuiTabs-indicator": {
                      right: 0,
                    },
                  }}
                />
              ))}
            </TabList>
            <div
              className={`${className} !overflow-y-scroll !shadow-none   scroll_main w-full`}
              style={style}
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
